import React, { useState, useEffect } from 'react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`w-full z-50  px-10 ${scrolled ? ' bg-opacity-50 py-3 border-b border-secondary' : 'bg-transparent py-6'
        } fixed top-0 transition-all duration-300 ease-in-out`}
      style={{
        backdropFilter: scrolled ? 'blur(7px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(7px)' : 'none',
      }}
    >
      <div className="container mx-auto px-4">
        {/* Your Navbar content goes here */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="#" className={`text-4xl font-semibold font-bebas text-secondary tracking-wide  `}>
              Cactuz.
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <a href="#" className="font-utama text-lg text-secondary font-medium">
              Contact
            </a>
            <a href="#" className="font-utama text-lg text-secondary font-medium">
              About
            </a>
            <a href="#" className="font-utama text-lg text-secondary font-medium p-2 rounded-full flex justify-center items-center">
              <svg fill='#609966' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 4H2v2h2.3l3.28 9a3 3 0 0 0 2.82 2H19v-2h-8.6a1 1 0 0 1-.94-.66L9 13h9.28a2 2 0 0 0 1.92-1.45L22 5.27A1 1 0 0 0 21.27 4 .84.84 0 0 0 21 4zm-2.75 7h-10L6.43 6h13.24z"></path><circle cx="10.5" cy="19.5" r="1.5"></circle><circle cx="16.5" cy="19.5" r="1.5"></circle></svg>
            </a>
            <a href="#" className="bg-secondary px-3 py-2 rounded-lg text-cerah font-utama">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

