import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > 500 && window.scrollY < lastScrollY) {
      setIsVisible(true);
      setIsLeaving(false);
    } else {
      setIsLeaving(true);
      setTimeout(() => setIsVisible(false), 500); // Duration of the slideOut animation
    }
    setLastScrollY(window.scrollY);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      {isVisible && (
        <button
          onClick={handleScrollToTop}
          className={`fixed z-50 bottom-4 right-4 h-12 w-12 btn btn-accent bg-opacity-75 backdrop-blur border-0 text-black p-2 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110 ${isLeaving ? 'scroll-to-top-out' : 'scroll-to-top-in'}`}
          aria-label="Scroll to top"
        >
          <i className="fas fa-caret-up fa-2xl"></i>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;