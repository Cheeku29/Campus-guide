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
    <div className="py-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight flex items-center">
            Welcome back, {user?.name?.split(' ')[0]}
            <RoleBadge role={user?.role} />
          </h1>
          <p className="text-secondary">{user?.email}</p>
        </div>
        <div className="bg-surface border border-border px-5 py-3 rounded-xl flex flex-col items-center justify-center min-w-[120px]">
          <span className="block text-3xl font-bold text-white leading-none mb-1">{reviews.length}</span>
          <span className="text-xs text-muted uppercase tracking-wider font-semibold">Reviews</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-6 text-white tracking-tight">Your Recent Reviews</h2>
      
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
        <div className="text-center py-16 border border-border bg-surface rounded-2xl shadow-sm border-dashed">
          <p className="text-secondary">You haven't written any reviews yet. Go explore!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
