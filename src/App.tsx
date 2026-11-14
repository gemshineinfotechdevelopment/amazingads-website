import { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SampleKitModal } from './components/SampleKitModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { fetchFactorySettings, getCalendarProducts, fetchFactoryDiscounts } from './services/api';

// Dedicated Standalone Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ProofingPage } from './pages/ProofingPage';
import { CraftPage } from './pages/CraftPage';
import { CorporatePage } from './pages/CorporatePage';
import { ContactPage } from './pages/ContactPage';
import { DielinesPage } from './pages/DielinesPage';
import { AdminPage } from './pages/AdminPage';

const AppContent = () => {
  const { currentPage } = useRouter();
  const [isSampleKitOpen, setIsSampleKitOpen] = useState(false);

  useEffect(() => {
    // Initial sync from MongoDB Atlas & backend API
    fetchFactorySettings();
    getCalendarProducts();
    fetchFactoryDiscounts();
  }, []);

  // If viewing the Admin side, render the standalone, dedicated Admin Portal
  if (currentPage === 'admin') {
    return <AdminPage />;
  }

  const renderActivePage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage onOpenSampleKit={() => setIsSampleKitOpen(true)} />;
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
      case 'contact':
        return <ContactPage onOpenSampleKit={() => setIsSampleKitOpen(true)} />;
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

      {/* Floating Direct WhatsApp Action */}
      <FloatingWhatsApp />
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
