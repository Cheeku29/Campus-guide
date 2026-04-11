import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import BusinessCard from '../components/BusinessCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Search } from 'lucide-react';

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

  const setCategory = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="py-8 flex flex-col md:flex-row gap-10 items-start">
      
      {/* Desktop Sidebar Filters */}
      <aside className="w-64 shrink-0 sticky top-24 hidden md:block">
        <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4 px-2">Categories</h2>
        <ul className="space-y-1.5 flex flex-col">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors border ${
                currentCategory === cat 
                  ? 'bg-white text-black border-transparent font-medium shadow-sm' 
                  : 'bg-transparent text-secondary border-border hover:border-[#2a2a2a] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col min-w-0">
        
        <div className="mb-8 w-full sticky top-16 z-20 pt-4 pb-2 bg-background/90 backdrop-blur-md">
           <form onSubmit={handleSearch} className="relative w-full">
             <input 
               type="text" 
               placeholder="Search by name, location..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-surface border border-border pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#333333] text-white placeholder-muted transition-colors shadow-sm"
             />
             <Search className="absolute left-4 top-3.5 text-muted w-5 h-5" />
           </form>
           
           {/* Mobile Category Pills */}
           <div className="flex md:hidden space-x-2 overflow-x-auto pb-2 mt-4 snap-x hide-scrollbar">
             {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setCategory(cat)}
                 className={`snap-center shrink-0 px-4 py-2 rounded-full text-sm transition-colors border ${
                   currentCategory === cat 
                     ? 'bg-white text-black border-transparent font-medium' 
                     : 'bg-transparent text-secondary border-border hover:border-[#2a2a2a]'
                 }`}
               >
                 {cat}
               </button>
             ))}
           </div>
        </div>

        <div>
           <div className="flex justify-between items-end mb-6">
             <h1 className="text-2xl font-bold tracking-tight text-white">
                 {currentCategory === 'All' ? 'All Spots' : `${currentCategory} Spots`}
             </h1>
             <span className="text-muted text-sm">{businesses.length} results</span>
           </div>

           {/* Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
             {loading ? (
               <LoadingSkeleton count={6} />
             ) : businesses.length > 0 ? (
               businesses.map(business => (
                 <BusinessCard key={business._id} id={business._id} {...business} />
               ))
             ) : (
               <div className="col-span-full py-20 flex flex-col items-center justify-center text-center border whitespace-pre-wrap border-dashed border-border rounded-2xl">
                 <Search className="w-10 h-10 text-muted mb-4" />
                 <h3 className="text-lg font-medium text-white mb-2">No spots found</h3>
                 <p className="text-sm text-secondary">Try adjusting your filters or searching for something else.</p>
               </div>
             )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default BusinessList;
