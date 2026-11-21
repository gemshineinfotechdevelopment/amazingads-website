# 🚀 Amazing Ads Production VPS Deployment Guide

This guide provides complete step-by-step instructions to deploy **Amazing Ads** on your Linux VPS (Ubuntu / Debian) using:
- **Subdomain:** `amazingads-website.gemshine.tech`
- **Backend Port:** `5029` (Node.js / Express managed by **PM2**)
- **Database:** Local **MongoDB** on the VPS (`mongodb://127.0.0.1:27017/amazingads`)
- **Web Server & Reverse Proxy:** **Nginx** + **Let's Encrypt SSL (HTTPS)**

---

## 1. Initial VPS Server Setup

Connect to your VPS via SSH:
```bash
ssh root@your_vps_ip
```

Update package lists and install essential build tools:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git build-essential nginx certbot python3-certbot-nginx
```

---

## 2. Install Node.js (v20 LTS) & PM2

```bash
# Add NodeSource repository for Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify versions
node -v   # Should be v20.x or higher
npm -v

# Install PM2 process manager globally
sudo npm install -g pm2
```

---

## 3. Install & Start MongoDB on the VPS

```bash
# Import MongoDB public GPG key & install MongoDB Community Edition
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

sudo apt update
sudo apt install -y mongodb-org

# Start and enable MongoDB service
sudo systemctl daemon-reload
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running on port 27017
sudo systemctl status mongod
```

---

## 4. Clone Repository & Install Dependencies

```bash
# Create web directory
sudo mkdir -p /var/www
cd /var/www

# Clone repository
sudo git clone https://github.com/gemshineinfotechdevelopment/amazingads-website.git
cd /var/www/amazingads-website

# Adjust file ownership to current user (e.g. www-data or ubuntu/root)
sudo chown -R $USER:$USER /var/www/amazingads-website

# Install npm dependencies
npm install
```

---

## 5. Configure Environment Variables

The repository already comes preconfigured with port `5029` and VPS local MongoDB. Verify your `server/.env`:

```bash
cat << 'EOF' > /var/www/amazingads-website/server/.env
PORT=5029
NODE_ENV=production
CLIENT_URL=https://amazingads-website.gemshine.tech

JWT_SECRET=L2XUkMEFMT9kOjazncUojsLOqc6Bcd69nY5yoYwUvvyzqVf0r1OTl1npAyvd3LnHsOpJlfdkDW-p-loGeTizvQ

# Local MongoDB on VPS
MONGODB_URI=mongodb://127.0.0.1:27017/amazingads

# Cloudinary (Media & Image Uploads)
CLOUDINARY_CLOUD_NAME=kkbtbhkk
CLOUDINARY_API_KEY=154186186419795
CLOUDINARY_API_SECRET=2oQ3LWeYf8WrO5ZDxCIkGseqF74
EOF
```

---

## 6. Initialize & Seed MongoDB Database

Run the database setup script to create the `amazingads` database and seed all 5 products, factory settings, and customer message collections:

```bash
npm run db:init
```

You should see:
```text
✓ Connected to MongoDB database: "amazingads" at 127.0.0.1
✓ Seeded Products into "calendarproducts" collection.
✓ Factory settings initialized/updated.
✓ Unique database indexes created.
🎉 VPS MongoDB Database "amazingads" is 100% READY!
```

---

## 7. Build Frontend & Start Backend with PM2

```bash
# 1. Build the production React frontend (creates /var/www/amazingads-website/dist)
npm run build

# 2. Start backend server on port 5029 with PM2
npm run pm2:start

# 3. Save PM2 state and configure startup on server reboot
pm2 save
sudo pm2 startup
# (Copy-paste the command output by 'pm2 startup' if prompted)

# 4. Check status
pm2 status
```

You can test that port 5029 is running locally:
```bash
curl http://127.0.0.1:5029/api/health
# Response: {"status":"healthy","database":"connected",...}
```

---

## 8. Configure Nginx for `amazingads-website.gemshine.tech`

Copy the pre-configured Nginx config to `sites-available`:

```bash
sudo cp /var/www/amazingads-website/nginx/amazingads-website.gemshine.tech.conf /etc/nginx/sites-available/amazingads-website.gemshine.tech.conf

# Enable the site
sudo ln -sf /etc/nginx/sites-available/amazingads-website.gemshine.tech.conf /etc/nginx/sites-enabled/

# Test Nginx syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 9. Enable Free SSL (HTTPS) with Certbot

Ensure your DNS A Record for `amazingads-website.gemshine.tech` points to your VPS IP address, then run:

```bash
sudo certbot --nginx -d amazingads-website.gemshine.tech
```

- Enter your email address.
- Agree to terms.
- Certbot will automatically configure HTTPS, renew certificates, and redirect HTTP to HTTPS.

---

## 10. Useful Management Commands

| Task | Command |
|---|---|
| **One-Click Redeployment** | `./deploy.sh` or `npm run deploy` |
| **Update App After Git Push** | `./deploy.sh` |
| **View Backend Logs** | `npm run pm2:logs` or `pm2 logs amazingads-backend` |
| **Restart Backend** | `npm run pm2:restart` |
| **Stop Backend** | `npm run pm2:stop` |
| **Check Backend Status** | `pm2 status` |
| **Restart MongoDB** | `sudo systemctl restart mongod` |
| **Restart Nginx** | `sudo systemctl reload nginx` |
| **Update App After Git Push** | `git pull && npm run build && npm run pm2:restart` |

🎉 **Your website is live at:** [https://amazingads-website.gemshine.tech](https://amazingads-website.gemshine.tech)
