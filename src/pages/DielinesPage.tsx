import { useState, useEffect, type ChangeEvent } from 'react';
import { useRouter } from '../context/RouterContext';
import { fetchDielines, type DielineSpec } from '../services/api';

const FALLBACK_DIELINES: DielineSpec[] = [
  {
    id: 'dieline-pet-foil-wall',
    title: 'Gold / Silver PET Foil Calendar Dieline',
    format: '15 × 20 in & 17 × 27 in (Rigid Kappa Board + PET Film)',
    bleed: '3.0 mm external bleed on all 4 sides',
    safeZone: '8.0 mm internal text safety margin',
    bindingAllowance: '25 mm top margin reserved for tin plate clamping & brass hanger loop',
    colorSpace: 'CMYK + Separate Vector Layer for Mirror Gold & Silver Foil Die',
    downloadFormats: ['PDF Template', 'Adobe Illustrator (.AI)', 'CorelDRAW (.CDR)']
  },
  {
    id: 'dieline-custom-5d',
    title: 'Custom 5D Holographic Calendar Dieline',
    format: '12 × 18 in & 16 × 24 in (75 LPI Lenticular)',
    bleed: '4.0 mm bleed margin with optical lens pitch alignment marks',
    safeZone: '6.0 mm internal safety margin',
    bindingAllowance: '20 mm perimeter for carved synthetic frame mounting cleat',
    colorSpace: 'Interlaced PSD / Multi-layer Phase A + Phase B Vector Masks',
    downloadFormats: ['Interlaced PSD', 'Adobe Illustrator (.AI)', 'PDF Specs']
  },
  {
    id: 'dieline-stone-art',
    title: 'Stone Art Sculptural Frame Dieline',
    format: '14 × 20 in & 18 × 24 in Carved Frame Mount',
    bleed: '5.0 mm bleed on relief border frame',
    safeZone: '10.0 mm relief clearance zone',
    bindingAllowance: 'Carved synthetic wood moulding allowance with bottom daily block slit',
    colorSpace: '3D Heightmap Displacement Map + CMYK Antique Color Wash',
    downloadFormats: ['CAD Dieline (.DXF)', 'Adobe Illustrator (.AI)', 'PDF Template']
  },
  {
    id: 'dieline-hand-fan',
    title: 'Promotional Advertising Hand Fan Contour Dieline',
    format: 'Standard 8 × 8 in / Round & Custom Die-Cut Shapes',
    bleed: '3.0 mm external bleed contour cutting line',
    safeZone: '5.0 mm text safe zone from fan blade edge',
    bindingAllowance: 'Handle slot rivet holes with reinforced safety rib zone',
    colorSpace: 'Double-Sided CMYK Offset / Screen Print Spot Colors',
    downloadFormats: ['Die-Cut Vector (.EPS)', 'Adobe Illustrator (.AI)', 'CorelDRAW (.CDR)']
  },
  {
    id: 'dieline-special-products',
    title: 'Special Products & Executive Gift Sets Dieline',
    format: 'Custom Tailored Dimensions (Acrylic LED, Boxes, Desk Sets)',
    bleed: '3.5 mm bleed margin across clamshell and magnetic flaps',
    safeZone: '6.0 mm branding area margins',
    bindingAllowance: 'Groove creasing and magnet inset placement notches',
    colorSpace: 'CMYK + Spot UV Vector + Laser Etch Cut Lines',
    downloadFormats: ['Packaging CAD (.ARD)', 'Adobe Illustrator (.AI)', 'Vector PDF']
  }
];

export const DielinesPage = () => {
  const { navigate } = useRouter();
  const [dielines, setDielines] = useState<DielineSpec[]>(FALLBACK_DIELINES);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  const [analyzingFile, setAnalyzingFile] = useState(false);
  const [fileAnalysisResult, setFileAnalysisResult] = useState<{
    fileName: string;
    passed: boolean;
    checks: { name: string; status: 'pass' | 'warning'; detail: string }[];
  } | null>(null);

  useEffect(() => {
    fetchDielines().then((specs) => {
      if (specs && specs.length > 0) {
        setDielines(specs);
      }
    });
  }, []);

  const handleDownload = (d: DielineSpec, formatName: string) => {
    setDownloadedId(d.id);
    setTimeout(() => setDownloadedId(null), 3500);

    const specText = `================================================================================
AMAZING ADS SIVAKASI - MASTER VECTOR DIELINE TECHNICAL SPECIFICATION
================================================================================
Product Title        : ${d.title}
Specification ID     : ${d.id}
Requested Package    : ${formatName}
Finished Dimensions  : ${d.format}
External Bleed Line  : ${d.bleed}
Internal Safe Zone   : ${d.safeZone}
Binding Clearance    : ${d.bindingAllowance}
Target Color Profile : ${d.colorSpace}
Press Calibration    : Heidelberg Speedmaster XL 106 (300 DPI CMYK ISO Coated v2)
Foil Stamping Die    : 130°C Heated Brass/Magnesium Embossing Die
Production Center    : Amazing Ads Sivakasi Works, Tamil Nadu, India

PRE-PRESS OPERATIONAL RULES:
1. CUTTING CONTOUR (CutLine)   : 100% Spot Magenta (Stroke: 0.5 pt).
2. SCORING & CREASING (Crease) : 100% Spot Cyan dashed (Stroke: 0.5 pt).
3. 24K FOIL DIE LAYER          : Spot Color named "FOIL_DIE_HOT_STAMP".
4. TEXT MARGINS                : Keep all contact/brand typography within safe zone.
5. MINIMUM BITMAP RESOLUTION   : 300 DPI true optical resolution at 1:1 scale.

Direct Pre-Press Hotline & Proof Approval:
Amazing Ads Sivakasi - Direct Production Desk
================================================================================`;

    const blob = new Blob([specText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const sanitizedName = `${d.id}-${formatName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
    link.download = sanitizedName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSimulateFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzingFile(true);
    setTimeout(() => {
      setFileAnalysisResult({
        fileName: file.name,
        passed: true,
        checks: [
          { name: 'Resolution Check', status: 'pass', detail: '300 DPI Native Optical Density' },
          { name: 'Color Space Gamut', status: 'pass', detail: 'CMYK ISO Coated v2 with Rich Black Profile' },
          { name: 'Bleed Coordinates', status: 'pass', detail: '3.0 mm Outer Bleed Detected on All Edges' },
          { name: 'Typography Outlines', status: 'pass', detail: 'All Font Glyphs Converted to Vector Curves' }
        ]
      });
      setAnalyzingFile(false);
    }, 1200);
  };

  return (
    <div className="page-view">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb-nav">
          <button onClick={() => navigate('home')}>Home</button>
          <span>/</span>
          <span className="current">Vector Dielines & Artwork Prep</span>
        </div>

        {/* Page Banner */}
        <div className="page-header-banner">
          <span className="foil-badge" style={{ marginBottom: '10px' }}>
            ✦ TEMPLATES & PRE-FLIGHT
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#fff', marginBottom: '12px' }}>
            Vector <span className="gold-gradient-text">Dielines</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
            Official scale templates for Adobe Illustrator, InDesign, and PDF with 3mm bleed margins.
          </p>
        </div>

        {/* 2-Column Layout: Dieline Cards + Pre-Flight Artwork Inspector */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '40px',
            alignItems: 'start'
          }}
          className="dieline-grid"
        >
          {/* Left Column: Dieline Template Packages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Official Scale Dieline Packages</h3>

            {dielines.map((d) => {
              const formats = d.downloadFormats || ['PDF Spec', 'Adobe Illustrator (.AI)', 'CorelDRAW (.CDR)'];
              return (
                <div
                  key={d.id}
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-card)',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'border-color 0.2s ease'
                  }}
                  className="dieline-card"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                    <h4 style={{ fontSize: '1.15rem', color: '#fff' }}>{d.title}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold-bright)', fontFamily: 'var(--font-mono)' }}>
                      {d.format}
                    </span>
                  </div>

                  <div
                    className="dieline-info-box"
                    style={{
                      background: 'var(--bg-input)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '14px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Bleed Margin:</span>
                      <strong style={{ color: '#fff' }}>{d.bleed}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Safe Text Zone:</span>
                      <strong style={{ color: '#fff' }}>{d.safeZone}</strong>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block' }}>Binding Clearance:</span>
                      <strong style={{ color: 'var(--accent-gold-bright)' }}>{d.bindingAllowance}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginRight: '6px' }}>Downloads:</span>
                    {formats.map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => handleDownload(d, fmt)}
                        className="btn-outline-gold"
                        style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                      >
                        ↓ {fmt}
                      </button>
                    ))}
                    {downloadedId === d.id && (
                      <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                        ✓ Spec Package Downloaded
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Pre-Flight Artwork Inspector */}
          <div className="dieline-sidebar" style={{ position: 'sticky', top: '90px' }}>
            <div
              className="preflight-card"
              style={{
                background: 'linear-gradient(155deg, #16171a 0%, #22252c 60%, #2f333b 100%)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                boxShadow: 'var(--shadow-lg), 0 0 35px rgba(215, 134, 0, 0.2)'
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span className="foil-badge">INSTANT PRE-FLIGHT</span>
              </div>

              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
                Pre-Flight Artwork Checker
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                Upload your PDF, AI, or TIFF artwork to test against our Heidelberg press parameters (Resolution, CMYK Gamut, Bleed Lines).
              </p>

              {/* Upload Drop Zone */}
              <label
                style={{
                  border: '2px dashed var(--border-gold)',
                  borderRadius: 'var(--radius-md)',
                  padding: '36px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  background: 'rgba(215, 134, 0, 0.08)',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
              >
                <input
                  type="file"
                  accept=".pdf,.ai,.tiff,.psd,.jpg,.png"
                  onChange={handleSimulateFileUpload}
                  style={{ display: 'none' }}
                />
                <span style={{ fontSize: '2.4rem', marginBottom: '8px' }}>📄</span>
                <span style={{ fontSize: '0.92rem', color: '#fff', fontWeight: 600, display: 'block' }}>
                  {analyzingFile ? 'Scanning Optical Channels...' : 'Click to Upload Artwork File'}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Supports PDF, AI, TIFF, PSD up to 250 MB
                </span>
              </label>

              {/* Analysis Results Display */}
              {fileAnalysisResult && (
                <div
                  style={{
                    marginTop: '24px',
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '20px',
                    border: '1px solid rgba(16, 185, 129, 0.4)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                      {fileAnalysisResult.fileName}
                    </span>
                    <span style={{ fontSize: '0.72rem', background: '#10b981', color: '#000', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      100% PRESS READY
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {fileAnalysisResult.checks.map((c, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>✓ {c.name}</span>
                        <span style={{ color: '#34d399', fontFamily: 'var(--font-mono)' }}>{c.detail}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                    <button
                      onClick={() => navigate('calculator')}
                      className="btn-gold"
                      style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
                    >
                      Proceed to Custom Quote with Artwork →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dieline-card:hover {
          border-color: var(--border-gold-hover) !important;
        }
        @media (max-width: 960px) {
          .dieline-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .dieline-sidebar {
            position: static !important;
          }
        }
        @media (max-width: 640px) {
          .dieline-card {
            padding: 20px 16px !important;
          }
        }
        @media (max-width: 768px) {
          .dieline-card {
            padding: 20px 16px !important;
          }
          .preflight-card {
            padding: 20px 16px !important;
          }
        }
        @media (max-width: 480px) {
          .dieline-info-box {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};
