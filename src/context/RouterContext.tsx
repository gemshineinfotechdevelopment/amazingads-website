import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type PageRoute = 
  | 'home'
  | 'collections'
  | 'calculator'
  | 'proofing'
  | 'craft'
  | 'corporate'
  | 'dielines';

interface RouterContextType {
  currentPage: PageRoute;
  navigate: (page: PageRoute, params?: Record<string, string>) => void;
  pageParams: Record<string, string>;
}

const RouterContext = createContext<RouterContextType>({
  currentPage: 'home',
  navigate: () => {},
  pageParams: {}
});

function getInitialPage(): PageRoute {
  const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
  const validPages: PageRoute[] = [
    'home',
    'collections',
    'calculator',
    'proofing',
    'craft',
    'corporate',
    'dielines'
  ];
  if (validPages.includes(hash as PageRoute)) {
    return hash as PageRoute;
  }
  return 'home';
}

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialPage());
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: PageRoute, params: Record<string, string> = {}) => {
    setPageParams(params);
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPage, navigate, pageParams }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);
