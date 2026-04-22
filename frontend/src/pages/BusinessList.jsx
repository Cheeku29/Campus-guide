import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import BusinessCard from '../components/BusinessCard';
import { Search, X } from 'lucide-react';

const BusinessList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const currentCategory = searchParams.get('category') || 'All';
  const categories = ['All', 'Food', 'Cafe', 'Stationery', 'PG'];

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (currentCategory && currentCategory !== 'All') query.append('category', currentCategory);
        if (searchParams.get('search')) query.append('search', searchParams.get('search'));
        
        const res = await api.get(`/businesses?${query.toString()}`);
        setBusinesses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, [searchParams, currentCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchParams.set('search', searchTerm.trim());
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const clearSearch = () => {
    setSearchTerm('');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  const setCategory = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-10 items-start relative z-10 w-full">
      
      {/* Sidebar Filters (Desktop) */}
      <aside className="w-56 shrink-0 sticky top-20 hidden md:block">
        <h2 className="text-[10px] tracking-widest uppercase text-[#3d4f70] mb-4">Filter</h2>
        <ul className="space-y-1.5 flex flex-col">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center justify-between border ${
                currentCategory === cat 
                  ? 'bg-[#eef0f6] text-[#080b14] font-medium border-transparent' 
                  : 'bg-transparent text-[#8b95b0] hover:text-[#eef0f6] hover:bg-[#0e1320] border-transparent hover:border-[#1e2840]'
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </ul>
      </aside>

      {/* Main Area */}
      <div className="flex-1 w-full min-w-0">
        
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-[#eef0f6] tracking-tight">Browse Spots</h1>
        <p className="text-[#8b95b0] mt-2">Discover the best places near your campus</p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative mt-8 mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3d4f70] w-5 h-5 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search by name, location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0e1320] border border-[#1e2840] rounded-xl pl-12 pr-12 py-3.5 text-[#eef0f6] placeholder-[#3d4f70] text-sm focus:border-amber-500/50 shadow-[0_0_0_3px_transparent] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)] transition-all duration-200 outline-none"
          />
          {searchTerm && (
            <button type="button" onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95b0] hover:text-[#eef0f6] transition">
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Mobile Category Pills */}
        <div className="flex md:hidden space-x-2 overflow-x-auto pb-4 mb-4 snap-x hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`snap-center shrink-0 px-4 py-2 rounded-lg text-sm transition-all duration-200 border ${
                currentCategory === cat 
                  ? 'bg-[#eef0f6] text-[#080b14] font-medium border-transparent' 
                  : 'bg-[#0e1320] text-[#8b95b0] border-[#1e2840]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Area */}
        <div>
           {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
               {[1, 2, 3, 4, 5, 6].map(n => (
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
           ) : businesses.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
               {businesses.map(business => (
                 <BusinessCard key={business._id} id={business._id} {...business} />
               ))}
             </div>
           ) : (
             <div className="py-32 flex flex-col items-center justify-center text-center">
               <div className="text-6xl opacity-20 mb-4 select-none">📍</div>
               <h3 className="text-xl font-semibold text-[#8b95b0]">No spots found</h3>
               <p className="text-sm text-[#3d4f70] mt-2">Try adjusting your filters or search terms.</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default BusinessList;
