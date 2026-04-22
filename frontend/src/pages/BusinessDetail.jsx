import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import RatingStars from '../components/RatingStars';
import ReviewCard from '../components/ReviewCard';
import { MapPin, Star } from 'lucide-react';
import { GoogleMap } from '@react-google-maps/api';
import MapWrapper from '../components/maps/MapWrapper';
import SpotMarker from '../components/maps/SpotMarker';
import { mapStyles } from '../config/mapStyles';

const GeocodedMap = ({ address, business }) => {
  const [center, setCenter] = useState(null);

  useEffect(() => {
    if (window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setCenter({ 
            lat: results[0].geometry.location.lat(), 
            lng: results[0].geometry.location.lng() 
          });
        }
      });
    }
  }, [address]);

  if (!center) return <div className="h-full w-full flex items-center justify-center text-[#8b95b0] text-sm bg-[#0e1320]">Finding location...</div>;

  const businessWithLocation = {
    ...business,
    location: { coordinates: [center.lng, center.lat] }
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={center}
      zoom={16}
      options={{ styles: mapStyles, disableDefaultUI: true }}
    >
      <SpotMarker business={businessWithLocation} isSelected={true} />
    </GoogleMap>
  );
};

const BusinessDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [reviewForm, setReviewForm] = useState({ rating: 0, text: '' });
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
    if (!reviewForm.rating) {
      setError('Please select a rating');
      return;
    }
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
      setReviewForm({ rating: 0, text: '' });
      
      const newCount = business.reviewCount + 1;
      const newAvg = ((business.averageRating * business.reviewCount) + reviewForm.rating) / newCount;
      setBusiness({ ...business, reviewCount: newCount, averageRating: newAvg.toFixed(1) });
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryStyles = (cat) => {
    switch(cat?.toLowerCase()) {
      case 'food': return { border: 'border-orange-500/20', text: 'text-orange-400', bg: 'bg-orange-500/8' };
      case 'cafe': return { border: 'border-yellow-400/20', text: 'text-yellow-400', bg: 'bg-yellow-400/8' };
      case 'stationery': return { border: 'border-blue-500/20', text: 'text-blue-400', bg: 'bg-blue-500/8' };
      case 'pg': return { border: 'border-purple-500/20', text: 'text-purple-400', bg: 'bg-purple-500/8' };
      default: return { border: 'border-[#1e2840]', text: 'text-[#8b95b0]', bg: 'bg-[#141c2e]' };
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-6 py-16">
       <div className="bg-[#0e1320] border border-[#1e2840] rounded-2xl p-8 min-h-[300px]">
          <div className="h-4 w-24 skeleton mb-4 rounded"></div>
          <div className="h-10 w-3/4 skeleton mb-6 rounded"></div>
          <div className="h-32 w-full skeleton rounded"></div>
       </div>
    </div>
  );
  
  if (!business) return (
    <div className="py-32 flex flex-col items-center justify-center text-center">
      <div className="text-6xl opacity-20 mb-4 select-none">🔭</div>
      <h3 className="text-xl font-semibold text-[#8b95b0]">Spot not found</h3>
      <p className="text-sm text-[#3d4f70] mt-2">This listing might have been removed.</p>
    </div>
  );

  const style = getCategoryStyles(business.category);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 relative z-10">
      <Link to="/businesses" className="text-sm text-[#8b95b0] hover:text-[#eef0f6] transition mb-10 inline-flex items-center gap-2">
        ← Back to Browse
      </Link>

      {/* Business Header */}
      <div className="bg-[#0e1320] border border-[#1e2840] rounded-2xl p-8">
        <div className="flex gap-2 items-center">
          <span className={`text-[10px] tracking-wider uppercase rounded-full px-2.5 py-1 border ${style.border} ${style.text} ${style.bg}`}>
            {business.category}
          </span>
          {user && user.role === 'owner' && user._id === business.owner && (
            <span className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/25 text-[#8b5cf6] text-[10px] tracking-wider uppercase rounded-full px-3 py-1">
              Your Listing
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold text-[#eef0f6] tracking-tight mt-3">{business.name}</h1>
        <p className="text-sm text-[#8b95b0] mt-2 flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          {business.address}
        </p>
        <p className="text-[#8b95b0] text-base mt-4 border-t border-[#1e2840] pt-4 leading-relaxed">
          {business.description}
        </p>
      </div>

      {/* Map Section */}
      {business?.address && (
        <div className="bg-[#0e1320] border border-[#1e2840] rounded-2xl overflow-hidden h-[300px] mt-6 relative z-0">
          <MapWrapper>
             <GeocodedMap address={business.address} business={business} />
          </MapWrapper>
        </div>
      )}

      {/* Rating Summary Bar */}
      <div className="mt-8 flex items-center gap-6 flex-wrap">
        <div className="text-5xl font-bold text-[#eef0f6]">{business.averageRating}</div>
        <RatingStars value={Math.round(business.averageRating)} readOnly size="w-6 h-6" />
        <div className="text-sm text-[#8b95b0]">{business.reviewCount} reviews</div>
      </div>

      <div className="border-t border-[#1e2840] mt-10"></div>

      {/* Reviews Section */}
      <div className="mt-10">
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-semibold text-[#eef0f6]">Reviews</h2>
          <span className="bg-[#141c2e] border border-[#1e2840] text-[#8b95b0] text-xs px-2.5 py-1 rounded-full ml-2">
            {reviews.length}
          </span>
        </div>

        {reviews.length > 0 ? (
          <div className="space-y-0">
            {reviews.map(review => (
              <ReviewCard key={review._id} {...review} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-[#3d4f70] text-sm">No reviews yet. Be the first!</p>
          </div>
        )}

        {/* Add Review Form */}
        {user ? (
          user.role === 'owner' && user._id === business.owner ? (
             <div className="bg-[#0e1320] border border-[#1e2840] rounded-2xl p-7 mt-10 text-center">
               <Star className="text-[#3d4f70] w-10 h-10 mx-auto mb-3" />
               <p className="text-[#8b95b0] text-sm">Owners cannot submit public reviews to their own listings.</p>
             </div>
          ) : (
            <div className="bg-[#0e1320] border border-[#1e2840] rounded-2xl p-7 mt-10">
              <h3 className="text-lg font-semibold text-[#eef0f6]">Leave a Review</h3>
              <p className="text-xs text-[#8b95b0] mt-1 mb-4">Your review helps other students</p>
              
              <form onSubmit={handleReviewSubmit}>
                {error && <div className="text-[#ef4444] text-xs mb-3 animate-shake">{error}</div>}
                
                <RatingStars 
                  value={reviewForm.rating} 
                  onChange={(val) => setReviewForm({ ...reviewForm, rating: val })} 
                  size="w-8 h-8"
                />

                <textarea
                  placeholder="Share your experience..."
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                  className="mt-4 w-full bg-[#080b14] border border-[#1e2840] rounded-xl px-4 py-3 text-sm text-[#eef0f6] placeholder-[#3d4f70] min-h-[110px] resize-none focus:border-amber-500/50 shadow-[0_0_0_3px_transparent] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)] outline-none transition-all duration-200"
                ></textarea>

                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="mt-4 w-full sm:w-auto overflow-hidden relative group font-medium px-6 py-2.5 rounded-lg text-[#080b14] shadow-lg shadow-amber-500/10 transition-all duration-200"
                >
                   <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 transition-transform duration-300 group-hover:scale-105"></span>
                   <span className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                   <span className="relative z-10 flex items-center justify-center">
                     {submitting ? 'Submitting...' : 'Submit Review'}
                   </span>
                </button>
              </form>
            </div>
          )
        ) : (
          <div className="bg-[#0e1320] border border-[#1e2840] rounded-2xl p-8 text-center mt-10 flex flex-col items-center">
            <span className="text-3xl text-[#3d4f70] mb-3 select-none">🔒</span>
            <p className="text-[#8b95b0] text-sm mb-4">Login to leave a review</p>
            <Link to="/login" className="border border-[#1e2840] text-[#8b95b0] px-5 py-2 rounded-lg hover:text-[#eef0f6] hover:bg-[#141c2e] transition">
              Login to review
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default BusinessDetail;
