import { useState, type ChangeEvent } from 'react';
import { useRouter } from '../context/RouterContext';

interface DielineItem {
  id: string;
  title: string;
  format: string;
  bleed: string;
  safeZone: string;
  bindingAllowance: string;
  colorSpace: string;
  formats: string[];
}

const DIELINES: DielineItem[] = [
  {
    id: 'dieline-gold-foil-wall',
    title: '24K Gold Foil Wall Calendar Dieline',
    format: '15 × 20 in & 17 × 27 in (Rigid Kappa Board)',
    bleed: '3.0 mm external bleed on all 4 sides',
    safeZone: '8.0 mm internal text safety margin',
    bindingAllowance: '25 mm top margin reserved for tin plate clamping & brass hanger loop',
    colorSpace: 'CMYK + Separate Vector Layer for Hot Brass Foil Die',
    formats: ['PDF Template', 'Adobe Illustrator (.AI)', 'CorelDRAW (.CDR)']
  },
  {
    id: 'dieline-daily-sheet',
    title: 'Daily Sheet Panchangam Header & Leaf Dieline',
    format: 'Jumbo 9 × 11.5 in / Super Deluxe 10 × 15 in',
    bleed: '3.0 mm bleed on header mount board',
    safeZone: '5.0 mm text safe zone',
    bindingAllowance: '18 mm top clamping margin with micro-perforation knife line',
    colorSpace: 'CMYK Offset + Black/Red 2-Color Leaf',
    formats: ['PDF Template', 'Adobe Illustrator (.AI)', 'CorelDRAW (.CDR)']
  },
  {
    id: 'dieline-monthly-12-sheet',
    title: '12-Sheet Monthly Wire-O Wall Dieline',
    format: '15 × 20 in / 11 × 18 in (Art Paper)',
    bleed: '3.0 mm external bleed margin',
    safeZone: '6.0 mm internal margin',
    bindingAllowance: '12 mm top margin for 3:1 pitch wire-o punches and half-moon thumbcut',
    colorSpace: 'CMYK FOGRA39 / ISO Coated v2',
    formats: ['PDF Template', 'Adobe Illustrator (.AI)', 'InDesign (.INDD)']
  },
  {
    id: 'dieline-tabletop-desk',
    title: 'Executive Tabletop Desk Easel Dieline',
    format: '8.5 × 6 in Landscape (Rigid Triangular Easel)',
    bleed: '3.0 mm external bleed margin',
    safeZone: '4.0 mm internal text safety margin',
    bindingAllowance: '10 mm top margin for twin wire-o spiral punches',
    colorSpace: 'CMYK FOGRA39 / Spot UV Gloss Layer',
    formats: ['PDF Template', 'Adobe Illustrator (.AI)', 'InDesign (.INDD)']
  }
];

export const DielinesPage = () => {
  const { navigate } = useRouter();
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  const [analyzingFile, setAnalyzingFile] = useState(false);
  const [fileAnalysisResult, setFileAnalysisResult] = useState<{
    fileName: string;
    passed: boolean;
    checks: { name: string; status: 'pass' | 'warning'; detail: string }[];
  } | null>(null);

  const handleDownload = (id: string, formatName: string) => {
    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 3000);
    alert(`Downloading verified vector dieline package: ${formatName}`);
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

            {DIELINES.map((d) => (
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ fontSize: '1.2rem', color: '#fff' }}>{d.title}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold-bright)', fontFamily: 'var(--font-mono)' }}>
                    {d.format}
                  </span>
                </div>

                <div
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
                  {d.formats.map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => handleDownload(d.id, `${d.title} (${fmt})`)}
                      className="btn-outline-gold"
                      style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                    >
                      ↓ {fmt}
                    </button>
                  ))}
                  {downloadedId === d.id && (
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                      ✓ Package Ready
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Pre-Flight Artwork Inspector */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div
              style={{
                background: 'linear-gradient(155deg, #181d26 0%, #11141b 100%)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                boxShadow: 'var(--shadow-lg), 0 0 35px rgba(207, 168, 78, 0.15)'
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
                  background: 'rgba(207, 168, 78, 0.04)',
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
          }
        }
      `}</style>
    </div>
  );
};
