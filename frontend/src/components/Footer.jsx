import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-[#141c2e] bg-[#080b14] py-16 px-6 relative z-10 w-full mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-2 text-[#eef0f6] font-semibold text-lg hover:opacity-80 transition-opacity mb-4 md:mb-0 group">
            <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 inline-block relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:bg-amber-400 after:opacity-30 group-hover:after:animate-[pulse-ring_2s_cubic-bezier(0.215,0.61,0.355,1)_infinite]"></span>
            <span>CampusSpot</span>
          </div>
          <div className="flex gap-6 text-[#3d4f70] text-sm">
            <Link to="/" className="hover:text-[#8b95b0] transition">Home</Link>
            <Link to="/businesses" className="hover:text-[#8b95b0] transition">Browse</Link>
            <Link to="/login" className="hover:text-[#8b95b0] transition">Login</Link>
            <span className="hover:text-[#8b95b0] transition cursor-pointer">Terms</span>
            <span className="hover:text-[#8b95b0] transition cursor-pointer">Privacy</span>
          </div>
        </div>
        
        <div className="divider my-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#252f45] text-xs">
            © {new Date().getFullYear()} CampusSpot. All rights reserved.
          </p>
          <p className="text-[#252f45] text-xs italic mt-4 md:mt-0">
            Built for students, by students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
