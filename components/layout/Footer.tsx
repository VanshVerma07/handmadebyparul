
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-secondary/50 border-t border-brand-border mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-brand-text">
              HandMade<span className="text-brand-primary">by</span>Parul
            </h3>
            <p className="mt-2 text-sm text-gray-600">Handmade with Love.</p>
            <div className="mt-4 flex space-x-4">
              <a href="https://instagram.com/handmadebyparul" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-highlight">
                <i className="fab fa-instagram text-xl"></i>
              </a>
               <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500">
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-brand-text">Quick Links</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link to="/shop" className="text-gray-600 hover:text-brand-primary">Shop</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-brand-primary">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-brand-primary">Contact</Link></li>
              <li><Link to="/order-tracking" className="text-gray-600 hover:text-brand-primary">Track Order</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-brand-text">Policies</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-brand-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-primary">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-primary">Refund Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-brand-text">Newsletter</h4>
            <p className="mt-2 text-sm text-gray-600">Subscribe for updates and special offers.</p>
            <form className="mt-3 flex">
              <input type="email" placeholder="Your email" className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:ring-brand-primary focus:border-brand-primary text-sm"/>
              <button type="submit" className="bg-brand-primary text-white px-4 rounded-r-md hover:bg-opacity-90">
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-brand-border pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} HandMadebyParul. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
