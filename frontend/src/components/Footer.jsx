import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-border py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-2 text-primary font-bold text-xl hover:opacity-80 transition-opacity mb-4 md:mb-0">
            <span className="w-2 h-2 bg-white rounded-full inline-block animate-pulse"></span>
            <span>CampusSpot</span>
          </div>
          <div className="flex space-x-6 text-sm text-secondary">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/businesses" className="hover:text-primary transition-colors">Browse</Link>
            <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
            <span className="text-border-subtle cursor-default hidden md:inline">|</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Privacy</span>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-border-subtle pt-6">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} CampusSpot Inc. All rights reserved.
          </p>
          <p className="text-muted text-xs hidden sm:block delay-150 transition-opacity">
            Made with <span className="text-primary">✦</span> by local students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
