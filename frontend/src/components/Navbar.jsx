import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-white font-semibold text-lg hover:opacity-80 transition-opacity">
            <span className="w-2 h-2 bg-white rounded-full inline-block animate-pulse"></span>
            <span>CampusSpot</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-secondary hover:text-white transition-colors text-sm font-medium">Home</Link>
            <Link to="/businesses" className="text-secondary hover:text-white transition-colors text-sm font-medium">Browse</Link>
            {user ? (
              <>
                {user.role === 'owner' ? (
                  <Link to="/owner/dashboard" className="text-secondary hover:text-white transition-colors text-sm font-medium">My Listings</Link>
                ) : (
                  <Link to="/dashboard" className="text-secondary hover:text-white transition-colors text-sm font-medium">Profile</Link>
                )}
                <button onClick={handleLogout} className="text-secondary hover:text-red-400 transition-colors text-sm font-medium">Logout</button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="border border-border text-primary px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-white text-black px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#e0e0e0] transition-colors shadow-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-secondary hover:text-white p-2">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute w-full bg-black/95 backdrop-blur-xl border-b border-border transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 space-y-4">
          <Link to="/" className="block text-secondary hover:text-white text-sm font-medium" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/businesses" className="block text-secondary hover:text-white text-sm font-medium" onClick={() => setIsOpen(false)}>Browse</Link>
          {user ? (
            <>
              {user.role === 'owner' ? (
                <Link to="/owner/dashboard" className="block text-secondary hover:text-white text-sm font-medium" onClick={() => setIsOpen(false)}>My Listings</Link>
              ) : (
                <Link to="/dashboard" className="block text-secondary hover:text-white text-sm font-medium" onClick={() => setIsOpen(false)}>Profile</Link>
              )}
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }} 
                className="block text-secondary hover:text-red-400 w-full text-left text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-3 pt-4 border-t border-border mt-4">
              <Link to="/login" onClick={() => setIsOpen(false)} className="border border-border text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface-hover text-center transition-colors">
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e0e0e0] text-center transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
