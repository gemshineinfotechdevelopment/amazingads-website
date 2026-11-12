import { useState } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SampleKitModal } from './components/SampleKitModal';
import { FloatingConcierge } from './components/FloatingConcierge';

// Dedicated Standalone Pages
import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ProofingPage } from './pages/ProofingPage';
import { CraftPage } from './pages/CraftPage';
import { CorporatePage } from './pages/CorporatePage';
import { DielinesPage } from './pages/DielinesPage';

const AppContent = () => {
  const { currentPage } = useRouter();
  const [isSampleKitOpen, setIsSampleKitOpen] = useState(false);

  const renderActivePage = () => {
    switch (currentPage) {
      case 'collections':
        return <CollectionsPage />;
      case 'calculator':
        return <CalculatorPage />;
      case 'proofing':
        return <ProofingPage />;
      case 'craft':
        return <CraftPage />;
      case 'corporate':
        return <CorporatePage />;
      case 'dielines':
        return <DielinesPage />;
      case 'home':
      default:
        return <HomePage onOpenSampleKit={() => setIsSampleKitOpen(true)} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Sticky Top Navigation */}
      <Navbar onOpenSampleKit={() => setIsSampleKitOpen(true)} />

      {/* Dynamic Viewport View for Current Page */}
      <main style={{ flex: 1, width: '100%' }}>
        {renderActivePage()}
      </main>

      {/* Atelier Footer */}
      <Footer onOpenSampleKit={() => setIsSampleKitOpen(true)} />

      {/* Master Swatch Kit Concierge Modal */}
      <SampleKitModal
        isOpen={isSampleKitOpen}
        onClose={() => setIsSampleKitOpen(false)}
      />

      {/* Floating Direct Press Hotline & Quick Actions */}
      <FloatingConcierge
        onOpenSampleKit={() => setIsSampleKitOpen(true)}
      />
    </div>
  );
};

export function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;
