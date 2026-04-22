import React, { useEffect, useState, useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import ConfirmDialog from '../components/ConfirmDialog';
import RoleBadge from '../components/RoleBadge';
import { Plus, Edit2, Trash2, MapPin, BarChart3, Star, MessageSquare } from 'lucide-react';

const OwnerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await api.get('/owner/businesses');
        setBusinesses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  const openDeleteModal = (id) => {
    setDeletingId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/businesses/${deletingId}`);
      setBusinesses(businesses.filter(b => b._id !== deletingId));
      setDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const stats = useMemo(() => {
    const totalListings = businesses.length;
    const totalReviews = businesses.reduce((acc, curr) => acc + curr.reviewCount, 0);
    const avgRating = totalListings > 0 
      ? (businesses.reduce((acc, curr) => acc + curr.averageRating, 0) / totalListings).toFixed(1) 
      : '0.0';
    return { totalListings, totalReviews, avgRating };
  }, [businesses]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#eef0f6] mb-2 tracking-tight flex items-center">
            Welcome back, {user?.name?.split(' ')[0]}
            <RoleBadge role={user?.role} className="ml-3" />
          </h1>
          <p className="text-[#8b95b0]">Manage your portfolio of campus spots.</p>
        </div>
        <Link to="/owner/add" className="overflow-hidden relative group font-medium px-5 py-2.5 rounded-xl text-[#080b14] shadow-lg shadow-amber-500/10 transition-all duration-200 flex items-center">
             <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 transition-transform duration-300 group-hover:scale-105"></span>
             <span className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
             <span className="relative z-10 flex items-center justify-center">
              <Plus className="w-4 h-4 mr-2" strokeWidth={3} />
              <span>Add New Spot</span>
             </span>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
           {[1, 2, 3].map(n => (
              <div key={n} className="bg-[#0e1320] border border-[#1e2840] rounded-2xl h-32 skeleton p-6"></div>
           ))}
        </div>
      ) : (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
             <div className="bg-[#0e1320] border border-[#1e2840] rounded-2xl p-6 flex flex-col justify-center shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold text-[#8b95b0] tracking-widest uppercase">Total Listings</span>
                  <BarChart3 className="w-5 h-5 text-[#3d4f70]" />
                </div>
                <span className="text-4xl font-bold text-[#eef0f6]">{stats.totalListings}</span>
             </div>
             <div className="bg-[#0e1320] border border-[#1e2840] rounded-2xl p-6 flex flex-col justify-center shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold text-[#8b95b0] tracking-widest uppercase">Total Reviews</span>
                  <MessageSquare className="w-5 h-5 text-[#3d4f70]" />
                </div>
                <span className="text-4xl font-bold text-[#eef0f6]">{stats.totalReviews}</span>
             </div>
             <div className="bg-[#0e1320] border border-[#1e2840] rounded-2xl p-6 flex flex-col justify-center shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold text-[#8b95b0] tracking-widest uppercase">Average Rating</span>
                  <Star className="w-5 h-5 text-amber-400 opacity-80" />
                </div>
                <span className="text-4xl font-bold text-[#eef0f6]">{stats.avgRating} <span className="text-sm text-[#3d4f70] font-medium tracking-normal">/ 5.0</span></span>
             </div>
          </div>

          {/* Table */}
          {businesses.length > 0 ? (
            <div className="bg-[#0e1320] border border-[#1e2840] rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-[#1e2840] bg-[#080b14]/50">
                      <th className="px-6 py-4 text-[10px] uppercase font-bold text-[#8b95b0] tracking-widest">Spot Info</th>
                      <th className="px-6 py-4 text-[10px] uppercase font-bold text-[#8b95b0] tracking-widest">Category</th>
                      <th className="px-6 py-4 text-[10px] uppercase font-bold text-[#8b95b0] tracking-widest">Rating</th>
                      <th className="px-6 py-4 text-[10px] uppercase font-bold text-[#8b95b0] tracking-widest">Reviews</th>
                      <th className="px-6 py-4 text-[10px] uppercase font-bold text-[#8b95b0] tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businesses.map(b => {
                      const badgeStyles = {
                        food: 'border-orange-500/20 text-orange-400 bg-orange-500/8',
                        cafe: 'border-yellow-400/20 text-yellow-400 bg-yellow-400/8',
                        stationery: 'border-blue-500/20 text-blue-400 bg-blue-500/8',
                        pg: 'border-purple-500/20 text-purple-400 bg-purple-500/8'
                      };
                      const s = badgeStyles[b.category?.toLowerCase()] || 'border-[#1e2840] text-[#8b95b0] bg-[#141c2e]';

                      return (
                      <tr key={b._id} className="hover:bg-[#141c2e]/50 transition duration-200 border-b border-[#1e2840] last:border-0 group">
                        <td className="px-6 py-4 border-l-2 border-transparent group-hover:border-amber-400/50 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#1e2840]">
                              <img src={b.image || 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=150&auto=format&fit=crop'} alt={b.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-semibold text-[#eef0f6] tracking-tight">{b.name}</div>
                              <div className="text-xs text-[#8b95b0] flex items-center mt-1">
                                <MapPin className="w-3 h-3 mr-1" /> {b.address.length > 35 ? b.address.substring(0, 35) + '...' : b.address}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 text-[10px] tracking-wider uppercase font-medium rounded-full border ${s}`}>{b.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm font-semibold text-[#eef0f6]">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1.5" />
                            {b.averageRating.toFixed(1)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#8b95b0] text-sm">
                          {b.reviewCount}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <button onClick={() => navigate(`/owner/edit/${b._id}`)} className="text-[#8b95b0] border border-[#1e2840] rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-[#141c2e] hover:text-[#eef0f6] transition flex items-center shadow-sm">
                              <Edit2 className="w-3 h-3 mr-1.5" /> Edit
                            </button>
                            <button onClick={() => openDeleteModal(b._id)} className="text-red-400 border border-red-500/20 rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-red-500/10 hover:border-red-500/40 transition flex items-center shadow-sm">
                              <Trash2 className="w-3 h-3 mr-1.5" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-24 bg-[#0e1320] rounded-3xl border border-[#1e2840] border-dashed shadow-2xl relative overflow-hidden">
              
              <div className="text-6xl text-[#1e2840] mx-auto mb-6 select-none opacity-50">📂</div>
              <h3 className="text-2xl font-bold text-[#eef0f6] mb-2 tracking-tight">No spots found</h3>
              <p className="text-[#8b95b0] mb-8 max-w-sm mx-auto text-sm">Create your first listing to start gathering reviews and tracking analytics.</p>
              <Link to="/owner/add" className="overflow-hidden relative group font-medium px-6 py-3 rounded-xl text-[#080b14] shadow-lg shadow-amber-500/10 transition-all duration-200 inline-flex items-center">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 transition-transform duration-300 group-hover:scale-105"></span>
                <span className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative z-10 flex items-center justify-center">
                  <Plus className="w-4 h-4 mr-2" strokeWidth={3} />
                  Add New Spot
                </span>
              </Link>
            </div>
          )}
        </>
      )}

      <ConfirmDialog 
        isOpen={deleteModalOpen} 
        message="Are you sure you want to delete this listing? This action cannot be undone and will permanently remove all associated reviews."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default OwnerDashboard;
