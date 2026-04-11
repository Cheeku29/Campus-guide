import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import BusinessForm from '../components/BusinessForm';

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
    <div className="max-w-xl mx-auto py-12 md:py-20 animate-in fade-in duration-300">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Publish a Spot</h1>
        <p className="text-secondary">Fill out the details below to add your business to CampusSpot.</p>
      </div>
      
      <BusinessForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
};

export default AddBusiness;
