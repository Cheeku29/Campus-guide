import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#080b14]/80 border-b border-[#1e2840]">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Left — Logo */}
        <Link to="/" className="flex items-center group">
          <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 inline-block relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:bg-amber-400 after:opacity-30 after:animate-[pulse-ring_2s_cubic-bezier(0.215,0.61,0.355,1)_infinite]"></span>
          <span className="font-semibold text-[#eef0f6] text-base tracking-tight">CampusSpot</span>
        </Link>

        {/* Center — Nav links (desktop) */}
        <div className="hidden md:flex gap-6 items-center">
          <Link 
            to="/" 
            className={`text-sm tracking-wide transition-colors duration-200 relative py-4 ${isActive('/') ? 'text-[#eef0f6] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-400' : 'text-[#8b95b0] hover:text-[#eef0f6]'}`}
          >
            Home
          </Link>
          <Link 
            to="/businesses" 
            className={`text-sm tracking-wide transition-colors duration-200 relative py-4 ${isActive('/businesses') ? 'text-[#eef0f6] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-400' : 'text-[#8b95b0] hover:text-[#eef0f6]'}`}
          >
            Browse
          </Link>
        </div>

        {/* Right — Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="w-24 h-8 rounded-lg skeleton"></div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className={`text-xs px-2.5 py-1 rounded-full border ${user.role === 'owner' ? 'bg-[#8b5cf6]/10 border-[#8b5cf6]/25 text-[#8b5cf6]' : 'bg-[#1e2840] border-[#2a3a5c] text-[#8b95b0]'}`}>
                {user.role === 'owner' ? 'Owner' : 'Student'}
              </span>
              <Link 
                to={user.role === 'owner' ? "/owner/dashboard" : "/dashboard"} 
                className="text-[#8b95b0] hover:text-[#eef0f6] transition text-sm font-medium"
              >
                Profile
              </Link>
              <button 
                onClick={handleLogout} 
                className="text-[#8b95b0] hover:text-[#eef0f6] text-sm transition px-3 py-1.5"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="text-[#8b95b0] hover:text-[#eef0f6] text-sm transition px-3 py-1.5"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-amber-500 to-amber-400 text-[#080b14] font-semibold hover:from-amber-400 hover:to-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] text-sm px-5 py-2 rounded-xl transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#8b95b0] hover:text-[#eef0f6] p-2 transition">
            {isOpen ? <X className="w-5 h-5 text-[#eef0f6]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-[#080b14]/95 backdrop-blur border-b border-[#1e2840] py-4 px-6 flex flex-col gap-4 animate-fade-in z-40">
          <Link to="/" className={`text-sm font-medium ${isActive('/') ? 'text-[#eef0f6]' : 'text-[#8b95b0] hover:text-[#eef0f6]'}`} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/businesses" className={`text-sm font-medium ${isActive('/businesses') ? 'text-[#eef0f6]' : 'text-[#8b95b0] hover:text-[#eef0f6]'}`} onClick={() => setIsOpen(false)}>Browse</Link>
          
          <div className="h-px bg-[#141c2e] my-1"></div>

          {user ? (
            <>
              <Link to={user.role === 'owner' ? "/owner/dashboard" : "/dashboard"} className="text-sm font-medium text-[#8b95b0] hover:text-[#eef0f6]" onClick={() => setIsOpen(false)}>Profile</Link>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-sm font-medium text-left text-[#8b95b0] hover:text-[#eef0f6]">Logout</button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-[#8b95b0] hover:text-[#eef0f6] text-sm transition py-2 border border-transparent">Login</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-gradient-to-r from-amber-500 to-amber-400 text-[#080b14] font-semibold shadow-[0_0_20px_rgba(245,158,11,0.3)] text-sm px-4 py-2.5 rounded-xl text-center">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
