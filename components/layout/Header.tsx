
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const Header: React.FC = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/custom-order', label: 'Custom Order' },
    { path: '/contact', label: 'Contact' },
  ];

  const activeLinkStyle = {
    color: '#FEC89A',
    fontWeight: '600',
  };

  return (
    <header className="bg-brand-bg/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3 text-2xl font-serif font-bold text-brand-text">
              <img src="/handmadebyparul.jpg" alt="HandMadebyParul Logo" className="h-10 w-auto" />
              <span>
                HandMade<span className="text-brand-primary">by</span>Parul
              </span>
            </Link>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                  className="text-brand-text hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>
          <div className="flex items-center">
             <Link to="/cart" className="relative mr-4 text-gray-600 hover:text-brand-primary transition-colors">
              <i className="fas fa-shopping-cart text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-highlight text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-brand-primary focus:outline-none">
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden md:hidden transition-all duration-500 ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="text-brand-text hover:text-brand-primary block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};
