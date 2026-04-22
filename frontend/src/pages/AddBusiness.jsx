import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import BusinessForm from '../components/BusinessForm';
import MapWrapper from '../components/maps/MapWrapper';

const AddBusiness = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await api.post('/businesses', formData);
      navigate('/owner/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to add listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 relative">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/5 blur-3xl pointer-events-none rounded-full"></div>
      
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-3xl font-bold text-[#eef0f6] tracking-tight mb-3">Publish a Spot</h1>
        <p className="text-[#8b95b0]">Fill out the details below to add your spot to CampusSpot.</p>
      </div>
      
      <MapWrapper>
        <BusinessForm onSubmit={handleSubmit} isLoading={loading} />
      </MapWrapper>
    </div>
  );
};

export default AddBusiness;
