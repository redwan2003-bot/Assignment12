'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  // TODO: Integrate actual auth context later
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null); // Mock user state

  useEffect(() => {
    // Mock user for now or read from local storage
    const storedUser = localStorage.getItem('care_user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'My Bookings', href: '/my-bookings' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link href="/" className="logo">
          Care<span className="dot">.xyz</span>
        </Link>
        
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
             <button onClick={() => { localStorage.removeItem('care_user'); window.location.reload(); }} className="btn btn-outline btn-sm">
               Logout
             </button>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: all 0.3s ease;
          background: transparent;
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          padding: 1rem 0;
          box-shadow: var(--shadow-sm);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--dark);
        }

        .dot {
          color: var(--primary);
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          font-weight: 500;
          color: var(--dark);
          transition: color 0.2s;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--primary);
        }
        
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }
      `}</style>
    </nav>
  );
}
