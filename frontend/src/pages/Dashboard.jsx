import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import ReviewCard from '../components/ReviewCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import RoleBadge from '../components/RoleBadge';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const res = await api.get('/reviews/user/me');
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserReviews();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 p-8 bg-[#0e1320] border border-[#1e2840] rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-[#eef0f6] mb-2 tracking-tight flex items-center">
            Welcome back, {user?.name?.split(' ')[0]}
            <RoleBadge role={user?.role} className="ml-3" />
          </h1>
          <p className="text-[#8b95b0]">{user?.email}</p>
        </div>
        <div className="relative z-10 bg-[#080b14] border border-[#1e2840] px-6 py-4 rounded-2xl flex flex-col items-center justify-center min-w-[120px] shadow-inner">
          <span className="block text-4xl font-bold text-[#eef0f6] leading-none mb-1">{reviews.length}</span>
          <span className="text-[10px] text-[#3d4f70] uppercase tracking-widest font-bold">Reviews</span>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6 text-[#eef0f6] tracking-tight flex items-center space-x-2"><span>Your Recent Reviews</span></h2>
      
      {loading ? (
        <LoadingSkeleton count={3} />
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map(review => (
            <ReviewCard 
              key={review._id} 
              reviewerName={review.reviewerName}
              rating={review.rating}
              text={review.text}
              date={review.createdAt}
              businessName={review.businessId?.name}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-[#1e2840] bg-[#0e1320] rounded-3xl shadow-2xl border-dashed relative overflow-hidden">
          <div className="text-5xl text-[#1e2840] mx-auto mb-4 select-none opacity-50">✍️</div>
          <p className="text-[#8b95b0] text-sm relative z-10">You haven't written any reviews yet. Go explore!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
