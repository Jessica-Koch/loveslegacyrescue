import './Body.scss';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import { Footer } from '../Footer/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const Body = () => {
  useEffect(() => {
    const saved = localStorage.getItem('llr-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  return (
    <div className='body'>
      <ScrollToTop />
      <Header />
      <main className='layout__main'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
