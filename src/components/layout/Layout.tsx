import { ReactNode, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Globe3D } from '../Globe3D';
import { CyberMapBackground } from '../CyberMapBackground';
import { AboutBackground } from '../AboutBackground';
import { ContactBackground } from '../ContactBackground';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout wrapper component
 * Provides consistent header and footer across all pages
 * Homepage removes top padding to allow header overlay on hero
 */
export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const isPortfolio = location.pathname === '/portfolio';
  const isAbout = location.pathname === '/about';
  const isContact = location.pathname === '/contact';

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background with animated grid pattern */}
      <div className="fixed inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] animate-grid-move" />
      </div>
      
      {/* 3D Globe Background - Only on Homepage */}
      {isHomepage && (
        <Suspense fallback={null}>
          <Globe3D />
        </Suspense>
      )}

      {/* 3D Cyber Map Background - Only on Portfolio */}
      {isPortfolio && <CyberMapBackground />}

      {/* 3D About Background - Only on About */}
      {isAbout && <AboutBackground />}

      {/* 3D Contact Background - Only on Contact */}
      {isContact && <ContactBackground />}
      
      <Header />
      <main 
        id="main-content" 
        className={`flex-1 ${isHomepage ? '' : 'pt-16'}`}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
