#!/usr/bin/env bash
# ==============================================================================
# 🚀 Amazing Ads Production Deployment & Redeployment Script
# Domain:   amazingads-website.gemshine.tech
# Port:     5029
# Backend:  Node.js / Express (PM2)
# Frontend: React SPA (Vite -> dist)
# Server:   Nginx Reverse Proxy
# ==============================================================================

set -euo pipefail

# Text formatting
BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}${BOLD}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}${BOLD}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}${BOLD}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}${BOLD}[ERROR]${NC} $1"
}

# Resolve project root directory
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR"

DOMAIN="amazingads-website.gemshine.tech"
PORT="5029"
PM2_APP_NAME="amazingads-backend"
NGINX_CONF_NAME="amazingads-website.gemshine.tech.conf"
NGINX_SRC="$APP_DIR/nginx/$NGINX_CONF_NAME"
NGINX_DEST="/etc/nginx/sites-available/$NGINX_CONF_NAME"
NGINX_LINK="/etc/nginx/sites-enabled/$NGINX_CONF_NAME"

echo -e "${BOLD}==============================================================${NC}"
echo -e "${BOLD}🌟 Amazing Ads - Redeploying to ${GREEN}${DOMAIN}${NC} (Port: ${YELLOW}${PORT}${NC})"
echo -e "${BOLD}==============================================================${NC}"
echo "Project Directory: $APP_DIR"
echo "Timestamp:         $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# ------------------------------------------------------------------------------
# 1. Environment Verification
# ------------------------------------------------------------------------------
log_info "Step 1/7: Checking Environment Configuration..."

if [ ! -f "$APP_DIR/server/.env" ]; then
    log_error "server/.env file not found! Please create $APP_DIR/server/.env with PORT=$PORT before deploying."
    exit 1
fi

if [ ! -f "$APP_DIR/.env" ]; then
    log_warn "Root .env file for Vite frontend not found. Creating from .env.example if available..."
    if [ -f "$APP_DIR/.env.example" ]; then
        cp "$APP_DIR/.env.example" "$APP_DIR/.env"
        log_info "Copied .env.example to .env"
    fi
fi

# Ensure PORT is 5029 in server/.env
if grep -q "PORT=" "$APP_DIR/server/.env"; then
    CURRENT_PORT=$(grep "PORT=" "$APP_DIR/server/.env" | cut -d '=' -f2 | tr -d ' "')
    log_info "Configured Backend Port in server/.env: $CURRENT_PORT"
else
    log_warn "PORT not explicitly set in server/.env. Defaulting to $PORT."
fi
log_success "Environment files verified."

# ------------------------------------------------------------------------------
# 2. Optional Git Pull
# ------------------------------------------------------------------------------
if [ "${1:-}" != "--skip-git" ] && [ -d "$APP_DIR/.git" ]; then
    log_info "Step 2/7: Checking for Git updates..."
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")
    if git remote -v | grep -q 'origin'; then
        log_info "Pulling latest code from origin/$CURRENT_BRANCH..."
        git pull origin "$CURRENT_BRANCH" || log_warn "Git pull failed or local changes exist. Continuing with existing files."
    else
        log_info "No git remote configured. Skipping git pull."
    fi
else
    log_info "Step 2/7: Skipping Git pull (--skip-git or not a git repository)."
fi

# ------------------------------------------------------------------------------
# 3. Install Dependencies
# ------------------------------------------------------------------------------
log_info "Step 3/7: Installing / Verifying NPM dependencies..."
npm install --no-audit --prefer-offline || npm install
log_success "NPM dependencies installed."

# ------------------------------------------------------------------------------
# 4. Build Production Frontend (Vite)
# ------------------------------------------------------------------------------
log_info "Step 4/7: Building React frontend (Vite)..."
npm run build

if [ ! -f "$APP_DIR/dist/index.html" ]; then
    log_error "Frontend build failed: dist/index.html was not generated!"
    exit 1
fi
log_success "Frontend built successfully in: $APP_DIR/dist"

# ------------------------------------------------------------------------------
# 5. Manage Backend with PM2 (Reload with updated envs)
# ------------------------------------------------------------------------------
log_info "Step 5/7: Deploying backend process on PM2 (Port: $PORT)..."
mkdir -p "$APP_DIR/logs"

# Verify PM2 is installed
if ! command -v pm2 >/dev/null 2>&1; then
    log_warn "PM2 is not installed globally. Installing pm2..."
    sudo npm install -g pm2
fi

if pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1; then
    log_info "Process '$PM2_APP_NAME' is running. Reloading with updated environment variables..."
    pm2 restart ecosystem.config.cjs --update-env
    log_success "PM2 process '$PM2_APP_NAME' restarted with updated .env!"
else
    log_info "Process '$PM2_APP_NAME' not running. Starting new PM2 instance..."
    pm2 start ecosystem.config.cjs
    log_success "PM2 process '$PM2_APP_NAME' started!"
fi

# Save PM2 state so it restarts on system reboot
pm2 save || true

# ------------------------------------------------------------------------------
# 6. Configure & Reload Nginx
# ------------------------------------------------------------------------------
log_info "Step 6/7: Configuring Nginx Reverse Proxy..."

if command -v nginx >/dev/null 2>&1; then
    if [ -f "$NGINX_SRC" ]; then
        if [ -d "/etc/nginx/sites-available" ]; then
            sudo cp "$NGINX_SRC" "$NGINX_DEST"
            sudo ln -sf "$NGINX_DEST" "$NGINX_LINK"
            log_info "Copied Nginx configuration to $NGINX_DEST and enabled site."
        fi

        log_info "Testing Nginx syntax..."
        if sudo nginx -t; then
            sudo systemctl reload nginx
            log_success "Nginx reloaded successfully!"
        else
            log_error "Nginx syntax test failed! Please check $NGINX_SRC"
        fi
    else
        log_warn "Nginx config template not found at $NGINX_SRC. Skipping Nginx file copy."
    fi
else
    log_warn "Nginx is not installed on this system. Skipping Nginx configuration."
fi

# ------------------------------------------------------------------------------
# 7. Health Check Verification
# ------------------------------------------------------------------------------
log_info "Step 7/7: Performing Backend Health Check on port $PORT..."
sleep 2

if command -v curl >/dev/null 2>&1; then
    HEALTH_URL="http://127.0.0.1:$PORT/api/health"
    set +e
    HEALTH_RES=$(curl -s --max-time 5 "$HEALTH_URL")
    set -e

    if [[ "$HEALTH_RES" =~ "healthy"|"online"|"status" ]]; then
        log_success "Backend Health Check PASSED on $HEALTH_URL!"
        echo "   Response: $HEALTH_RES"
    else
        log_warn "Health Check could not verify $HEALTH_URL immediately. Response: $HEALTH_RES"
        echo "   Check logs with: pm2 logs $PM2_APP_NAME --lines 30"
    fi
fi

# Check SSL status
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    log_success "Let's Encrypt SSL certificate is active for $DOMAIN"
else
    echo ""
    log_info "📌 If SSL (HTTPS) is not yet configured, run Certbot once:"
    echo "   sudo certbot --nginx -d $DOMAIN"
fi

echo ""
echo -e "${GREEN}${BOLD}==============================================================${NC}"
echo -e "${GREEN}${BOLD}🎉 Redeployment Complete!${NC}"
echo -e "   🌐 Subdomain:    ${BOLD}https://${DOMAIN}${NC}"
echo -e "   🔌 Backend Port: ${BOLD}${PORT}${NC}"
echo -e "   🚀 PM2 Service:  ${BOLD}${PM2_APP_NAME}${NC}"
echo -e "   📁 Static Root:  ${BOLD}${APP_DIR}/dist${NC}"
echo -e "${GREEN}${BOLD}==============================================================${NC}"
echo ""
echo "Helpful commands:"
echo "   pm2 status"
echo "   pm2 logs $PM2_APP_NAME"
echo "   sudo systemctl status nginx"
