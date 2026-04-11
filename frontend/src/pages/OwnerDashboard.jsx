import React, { useEffect, useState, useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import LoadingSkeleton from '../components/LoadingSkeleton';
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

  // Calculate stats
  const stats = useMemo(() => {
    const totalListings = businesses.length;
    const totalReviews = businesses.reduce((acc, curr) => acc + curr.reviewCount, 0);
    const avgRating = totalListings > 0 
      ? (businesses.reduce((acc, curr) => acc + curr.averageRating, 0) / totalListings).toFixed(1) 
      : '0.0';
    return { totalListings, totalReviews, avgRating };
  }, [businesses]);

  return (
    <div className="py-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight flex items-center">
            Welcome back, {user?.name?.split(' ')[0]}
            <RoleBadge role={user?.role} />
          </h1>
          <p className="text-secondary">Manage your portfolio of campus spots.</p>
        </div>
        <Link to="/owner/add">
          <Button size="lg" className="flex items-center space-x-2">
            <Plus className="w-5 h-5 mr-1" />
            <span>Add New Listing</span>
          </Button>
        </Link>
      </div>

      {loading ? (
        <LoadingSkeleton count={1} />
      ) : (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
             <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-muted text-sm font-medium">Total Listings</span>
                  <BarChart3 className="w-5 h-5 text-muted" />
                </div>
                <span className="text-4xl font-bold text-white">{stats.totalListings}</span>
             </div>
             <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-muted text-sm font-medium">Total Reviews received</span>
                  <MessageSquare className="w-5 h-5 text-muted" />
                </div>
                <span className="text-4xl font-bold text-white">{stats.totalReviews}</span>
             </div>
             <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-muted text-sm font-medium">Average Portfolio Rating</span>
                  <Star className="w-5 h-5 text-star" />
                </div>
                <span className="text-4xl font-bold text-white">{stats.avgRating} <span className="text-lg text-muted font-medium">/ 5</span></span>
             </div>
          </div>

          {/* Table */}
          {businesses.length > 0 ? (
            <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-background/50">
                      <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Business Info</th>
                      <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Reviews</th>
                      <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {businesses.map(b => (
                      <tr key={b._id} className="hover:bg-surface-hover transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-border">
                              <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-semibold text-white">{b.name}</div>
                              <div className="text-sm text-muted flex items-center mt-1"><MapPin className="w-3 h-3 mr-1 inline" /> {b.address.substring(0, 30)}{b.address.length > 30 && '...'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 text-xs font-medium bg-border-subtle text-secondary rounded-full border border-border">{b.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center font-medium text-white">
                            <Star className="w-3.5 h-3.5 text-star fill-star mr-1.5" />
                            {b.averageRating.toFixed(1)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-secondary font-medium">
                          {b.reviewCount}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <button onClick={() => navigate(`/owner/edit/${b._id}`)} className="text-white border border-border rounded-md px-3 py-1.5 text-xs font-medium hover:bg-surface-hover transition-colors flex items-center">
                              <Edit2 className="w-3 h-3 mr-1.5" /> Edit
                            </button>
                            <button onClick={() => openDeleteModal(b._id)} className="text-error border border-error/20 rounded-md px-3 py-1.5 text-xs font-medium hover:bg-error/10 hover:border-error/40 transition-colors flex items-center">
                              <Trash2 className="w-3 h-3 mr-1.5" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-surface rounded-2xl border border-border border-dashed shadow-sm">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-muted border border-border">
                <Plus className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">No listings found</h3>
              <p className="text-secondary mb-6 max-w-sm mx-auto">You haven't added any businesses yet. Create your first listing to start gathering reviews.</p>
              <Link to="/owner/add">
                <Button>Add New Listing</Button>
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
