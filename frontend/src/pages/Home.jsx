import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import BusinessCard from '../components/BusinessCard';
import { ChevronDown, Utensils, Coffee, BookOpen, Home as HomeIcon, MapPin } from 'lucide-react';

const Home = () => {
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await api.get('/businesses');
        setTopRated(res.data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopRated();
  }, []);

  const categories = [
    { name: 'Food', count: '42 spots', icon: Utensils, borderClass: 'group-hover:border-l-orange-500/50 border-l-orange-500/30', glow: 'from-orange-500/15' },
    { name: 'Cafe', count: '18 spots', icon: Coffee, borderClass: 'group-hover:border-l-yellow-400/50 border-l-yellow-400/30', glow: 'from-yellow-400/15' },
    { name: 'Stationery', count: '8 spots', icon: BookOpen, borderClass: 'group-hover:border-l-blue-500/50 border-l-blue-500/30', glow: 'from-blue-500/15' },
    { name: 'PG', count: '24 spots', icon: HomeIcon, borderClass: 'group-hover:border-l-purple-500/50 border-l-purple-500/30', glow: 'from-purple-500/15' }
  ];

  return (
    <div className="w-full relative z-10">
      
      {/* 2. HERO PAGE - min-h-screen container */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden px-6 -mt-14 pt-14">
        
        {/* Content */}
        <div className="z-10 relative flex flex-col items-center w-full max-w-4xl pt-10">
          
          {/* Announcement Chip */}
          <div className="animate-fade-up flex items-center gap-2 mb-8 bg-[#0e1320] border border-[#1e2840] rounded-full px-4 py-1.5" style={{ animationDelay: '0ms' }}>
            <span className="bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[9px] px-1.5 py-0.5 rounded-full tracking-wider font-bold">NEW</span>
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse ml-1"></div>
            <span className="text-xs text-[#8b95b0] tracking-wide">Now live · Find spots near your campus</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none flex flex-col items-center" style={{ animationDelay: '100ms' }}>
            <span className="text-[#eef0f6]">Discover the definitive</span>
            <span className="text-gradient">campus guide.</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up text-lg text-[#8b95b0] max-w-md mx-auto mt-6 leading-relaxed tracking-wide" style={{ animationDelay: '200ms' }}>
            Find, review, and share your favorite canteens, cafes, stationery shops, and PGs.
          </p>

          {/* Buttons Row */}
          <div className="animate-fade-up flex flex-col sm:flex-row gap-4 mt-10 items-center justify-center" style={{ animationDelay: '300ms' }}>
            <Link to="/businesses" className="bg-gradient-to-r from-amber-500 to-orange-500 text-[#080b14] font-bold px-8 py-3.5 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.35),0_4px_20px_rgba(0,0,0,0.5)] hover:from-amber-400 hover:to-orange-400 hover:scale-105 transition-all duration-300 flex items-center gap-2 group w-full sm:w-auto justify-center">
              Explore Now
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link to="/signup" className="border border-[#1e2840] text-[#8b95b0] px-6 py-3.5 rounded-xl hover:bg-[#0e1320] hover:border-[#2a3a5c] hover:text-[#eef0f6] transition-all duration-200 text-sm w-full sm:w-auto justify-center flex font-medium">
              List Your Spot
            </Link>
          </div>

          {/* Social Proof */}
          <div className="animate-fade-up flex flex-col sm:flex-row items-center gap-3 mt-10 justify-center" style={{ animationDelay: '400ms' }}>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#1e2840] border-2 border-[#080b14] text-[#eef0f6] text-xs font-medium flex items-center justify-center z-30">A</div>
              <div className="w-8 h-8 rounded-full bg-[#141c2e] border-2 border-[#080b14] text-[#eef0f6] text-xs font-medium flex items-center justify-center z-20">J</div>
              <div className="w-8 h-8 rounded-full bg-[#0e1320] border-2 border-[#080b14] text-[#eef0f6] text-xs font-medium flex items-center justify-center z-10">S</div>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[#1e2840] mx-1"></div>
            <p className="text-sm text-[#3d4f70]">
              Trusted by students at <span className="font-semibold text-amber-400">12+ campuses</span>
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-fade-up flex flex-col items-center gap-1 mt-16" style={{ animationDelay: '500ms' }}>
             <span className="text-[10px] tracking-[0.3em] uppercase text-[#3d4f70]">scroll</span>
             <ChevronDown className="animate-bounce text-[#8b95b0] text-xl mt-1" />
          </div>

        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="divider mb-12"></div>
        
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#3d4f70] mb-3">Explore</p>
        <h2 className="text-3xl font-bold text-[#eef0f6] tracking-tight">Browse by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div 
                key={cat.name}
                onClick={() => navigate(`/businesses?category=${cat.name}`)}
                className={`relative overflow-hidden cursor-pointer group bg-[#0e1320] border border-[#1e2840] hover:bg-[#131926] hover:border-[#2a3a5c] rounded-2xl p-6 transition-all duration-300 border-l-2 ${cat.borderClass}`}
              >
                {/* Background ghost icon */}
                <Icon className="absolute bottom-[-8px] right-[-8px] w-24 h-24 opacity-[0.05] group-hover:opacity-[0.09] group-hover:scale-110 transition-all duration-500" strokeWidth={1} aria-hidden="true" />
                
                {/* Top row */}
                <div className="flex justify-between items-start">
                  <span className="text-[10px] tracking-widest uppercase bg-[#1e2840] border border-[#2a3a5c] text-[#8b95b0] px-2.5 py-1 rounded-full">
                    {cat.name}
                  </span>
                  <span className="text-[#3d4f70] group-hover:text-[#eef0f6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform origin-center">↗</span>
                </div>

                <h3 className="text-xl font-semibold text-[#eef0f6] mt-4">{cat.name}</h3>
                <p className="text-sm text-[#8b95b0] mt-1">{cat.count}</p>
                
                {/* Bottom accent line */}
                <div className={`mt-4 h-px w-0 group-hover:w-full bg-gradient-to-r ${cat.glow} to-transparent transition-all duration-500`}></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 pt-0">
        <div className="divider mb-12"></div>
        
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#3d4f70] mb-3">Featured</p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <h2 className="text-3xl font-bold text-[#eef0f6] tracking-tight flex items-center gap-2">
            Top Rated Near You <span className="text-amber-400 text-xl">★</span>
          </h2>
          <Link to="/businesses" className="text-sm text-[#8b95b0] hover:text-[#eef0f6] transition flex items-center">
            View all <span className="ml-1">→</span>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(n => (
               <div key={n} className="bg-[#0e1320] border border-[#1e2840] rounded-2xl overflow-hidden min-h-[160px]">
                  <div className="h-1.5 w-full skeleton"></div>
                  <div className="p-5">
                     <div className="w-16 h-6 skeleton rounded-full mb-4"></div>
                     <div className="w-3/4 h-5 skeleton rounded mb-2"></div>
                     <div className="w-full h-8 skeleton rounded"></div>
                  </div>
               </div>
            ))}
          </div>
        ) : topRated.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topRated.map(business => (
               <BusinessCard key={business._id} id={business._id} {...business} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-[#141c2e] rounded-2xl bg-[#0e1320]">
             <MapPin className="w-12 h-12 text-[#3d4f70] mx-auto mb-3" />
             <p className="text-[#8b95b0]">No spots available right now.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
