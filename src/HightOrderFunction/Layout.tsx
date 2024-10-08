// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import NavBar from '../components/navbar';
import AnimatedElement from '../function/AnimatedElement';
import Footer from '../components/footer';
import ScrollToTop from '../components/scrollToTop';

 interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div style={{ marginTop: '-120px' }}>
        {children}
      </div>

      <AnimatedElement>
        <footer>
          <Footer/>
        </footer>
      </AnimatedElement>
      <ScrollToTop />
    </>
  );
}

export default Layout;
