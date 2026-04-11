import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Button from '../components/Button';
import BusinessCard from '../components/BusinessCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Coffee, Utensils, BookOpen, Home as HomeIcon, ChevronDown, Star } from 'lucide-react';

const Home = () => {
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await api.get('/businesses');
        // Get top 3 businesses by rating to fit the 3-col grid design requirement
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
    { name: 'Food', count: '42 spots', icon: <Utensils className="w-8 h-8 mb-4 stroke-[1.5]" /> },
    { name: 'Cafe', count: '18 spots', icon: <Coffee className="w-8 h-8 mb-4 stroke-[1.5]" /> },
    { name: 'Stationery', count: '8 spots', icon: <BookOpen className="w-8 h-8 mb-4 stroke-[1.5]" /> },
    { name: 'PG', count: '24 spots', icon: <HomeIcon className="w-8 h-8 mb-4 stroke-[1.5]" /> }
  ];

  return (
    <div className="relative w-full">
      
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center -mt-8 pt-8">
        <div className="absolute inset-0 hero-glow -z-10"></div>
        <div className="noise-bg"></div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2 z-10">
          Discover the definitive 
          <span className="block text-[#a0a0a0] mt-1">campus guide.</span>
        </h1>
        <p className="text-xl text-secondary max-w-xl mx-auto mt-6 mb-10 z-10 font-normal leading-relaxed">
          Find, review, and share your favorite canteens, cafes, stationery shops, and PGs with your college community.
        </p>
        
        <Link to="/businesses" className="z-10">
          <Button size="lg" className="px-10 py-4 text-base shadow-2xl shadow-white/10 hover:shadow-white/20 hover:scale-105 transition-all">
            Explore Now
          </Button>
        </Link>
        
        <div className="mt-16 flex flex-col items-center z-10">
          <div className="flex -space-x-2.5 mb-3">
             <div className="w-8 h-8 rounded-full bg-border border-2 border-black flex items-center justify-center text-white text-xs font-semibold z-30">A</div>
             <div className="w-8 h-8 rounded-full bg-surface-hover border-2 border-black flex items-center justify-center text-white text-xs font-semibold z-20">J</div>
             <div className="w-8 h-8 rounded-full bg-border-subtle border-2 border-black flex items-center justify-center text-white text-xs font-semibold z-10">S</div>
          </div>
          <p className="text-sm text-secondary font-medium tracking-wide">Trusted by students at 12+ campuses</p>
        </div>
        
        <div className="absolute bottom-8 animate-bounce z-10">
           <ChevronDown className="w-6 h-6 text-muted" />
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 border-t border-border mt-12 relative z-10">
        <h2 className="text-3xl font-semibold mb-10 text-white tracking-tight">Browse by Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div 
              key={cat.name}
              onClick={() => navigate(`/businesses?category=${cat.name}`)}
              className="group bg-surface border border-border flex flex-col justify-between rounded-2xl p-6 hover:bg-surface-hover hover:border-[#2a2a2a] hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] cursor-pointer transition-all duration-300"
            >
              <div className="text-white group-hover:scale-110 transition-transform origin-bottom-left duration-300">{cat.icon}</div>
              <div>
                <span className="font-medium text-white text-lg block">{cat.name}</span>
                <span className="text-sm text-muted mt-1 block">{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated */}
      <section className="py-20 relative z-10">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-semibold text-white tracking-tight flex items-center">
            <Star className="w-6 h-6 text-star mr-3 fill-star" />
            Top Rated Near You
          </h2>
        </div>
        
        {/* Horizontal scroll on mobile, 3-col on desktop */}
        <div className="flex overflow-x-auto pb-8 lg:pb-0 lg:grid lg:grid-cols-3 gap-6 snap-x">
          {loading ? (
            <LoadingSkeleton count={3} />
          ) : (
            topRated.map(business => (
              <div key={business._id} className="min-w-[85vw] md:min-w-[350px] lg:min-w-0 snap-center">
                 <BusinessCard id={business._id} {...business} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
