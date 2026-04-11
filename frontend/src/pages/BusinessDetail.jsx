import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import RatingStars from '../components/RatingStars';
import ReviewCard from '../components/ReviewCard';
import Button from '../components/Button';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { MapPin, Star } from 'lucide-react';

const BusinessDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [reviewForm, setReviewForm] = useState({ rating: 5, text: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const [busRes, revRes] = await Promise.all([
          api.get(`/businesses/${id}`),
          api.get(`/reviews/${id}`)
        ]);
        setBusiness(busRes.data);
        setReviews(revRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.text.trim()) {
      setError('Review text is required');
      return;
    }
    setSubmitting(true);
    setError('');
    
    try {
      const res = await api.post('/reviews', {
        businessId: id,
        rating: reviewForm.rating,
        text: reviewForm.text
      });
      setReviews([res.data, ...reviews]);
      setReviewForm({ rating: 5, text: '' });
      
      const newCount = business.reviewCount + 1;
      const newAvg = ((business.averageRating * business.reviewCount) + reviewForm.rating) / newCount;
      setBusiness({ ...business, reviewCount: newCount, averageRating: newAvg.toFixed(1) });
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="py-8"><LoadingSkeleton count={1} /></div>;
  if (!business) return <div className="py-20 text-center text-secondary flex flex-col items-center"><span className="text-4xl block mb-2">🔭</span><h3 className="text-xl font-semibold text-white">Business disconnected.</h3></div>;

  return (
    <div className="py-8 flex flex-col lg:flex-row gap-10">
      {/* Left Column - Business Info */}
      <div className="w-full lg:w-5/12 shrink-0">
        <div className="bg-surface rounded-2xl border border-border overflow-hidden sticky top-24 shadow-sm">
          <div className="h-64 sm:h-80 w-full relative">
             <img 
               src={business.image || 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop'} 
               alt={business.name} 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
             
             <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 bg-border-subtle/80 backdrop-blur-md text-white border border-border text-xs rounded-full font-medium inline-block mb-3 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  {business.category}
                </span>
                <div className="flex justify-between items-end">
                  <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">{business.name}</h1>
                  {user && user.role === 'owner' && user._id === business.owner && (
                    <Button variant="secondary" size="sm" onClick={() => navigate(`/owner/edit/${business._id}`)} className="shadow-xl">
                      Edit
                    </Button>
                  )}
                </div>
             </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center text-muted text-sm mb-6 pb-6 border-b border-border">
              <MapPin className="w-4 h-4 mr-2 shrink-0" />
              <span>{business.address}</span>
            </div>
            
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-baseline space-x-1">
                 <span className="text-4xl font-bold text-white">{business.averageRating}</span>
                 <span className="text-muted font-medium">/ 5</span>
              </div>
              <div>
                <RatingStars value={Math.round(business.averageRating)} readOnly />
                <span className="block mt-1 text-sm text-secondary font-medium">Based on {business.reviewCount} reviews</span>
              </div>
            </div>
            
            <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">About this spot</h2>
            <p className="text-secondary leading-relaxed text-sm">{business.description}</p>
          </div>
        </div>
      </div>

      {/* Right Column - Reviews */}
      <div className="w-full lg:w-7/12 mt-8 lg:mt-0">
        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">Community Reviews</h2>
        
        {/* Add Review Form */}
        <div className="mb-10 pb-10 border-b border-border-subtle">
          {user ? (
            user.role === 'owner' && user._id === business.owner ? (
              <div className="text-center py-8 bg-surface border border-border-subtle flex flex-col justify-center items-center rounded-2xl">
                <div className="w-12 h-12 bg-border flex items-center justify-center rounded-full mb-4">
                  <Star className="text-secondary w-6 h-6" />
                </div>
                <h3 className="text-white font-medium mb-1">Owner Privileges Active</h3>
                <p className="text-sm text-muted max-w-sm">You manage this spot. Owners cannot submit public reviews to their own listings.</p>
              </div>
            ) : (
              <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm">
                 <h3 className="text-lg font-semibold text-white mb-5">Share your experience</h3>
                 <form onSubmit={handleReviewSubmit}>
                   {error && <div className="bg-red-500/10 border border-red-500/20 text-error p-3 rounded-xl mb-4 text-sm flex items-start animate-shake">
                      <span className="mr-2">⚠️</span> {error}
                   </div>}
                   <div className="mb-5">
                     <RatingStars 
                       value={reviewForm.rating} 
                       onChange={(val) => setReviewForm({ ...reviewForm, rating: val })} 
                       size="w-8 h-8"
                     />
                   </div>
                   <div className="mb-5">
                     <textarea
                       placeholder="What did you like or dislike?"
                       value={reviewForm.text}
                       onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                       className="w-full min-h-[120px] bg-background border border-border rounded-xl p-4 text-white focus:outline-none focus:border-[#333333] resize-none transition-colors placeholder-muted text-sm"
                     ></textarea>
                   </div>
                   <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                     {submitting ? 'Posting...' : 'Submit Review'}
                   </Button>
                 </form>
              </div>
            )
          ) : (
            <div className="text-center py-10 bg-surface border border-border flex flex-col justify-center items-center rounded-2xl shadow-sm">
              <Star className="text-border w-12 h-12 mb-4" />
              <h3 className="text-white font-medium mb-2">Join the conversation</h3>
              <p className="text-secondary text-sm mb-6 max-w-xs">Log in to rate and review this spot.</p>
              <Link to="/login"><Button variant="outline">Log in to review</Button></Link>
            </div>
          )}
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <ReviewCard key={review._id} {...review} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
