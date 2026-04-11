import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import BusinessForm from '../components/BusinessForm';
import LoadingSkeleton from '../components/LoadingSkeleton';

const EditBusiness = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await api.get(`/businesses/${id}`);
        setInitialData(res.data);
      } catch (err) {
        console.error(err);
        navigate('/owner/dashboard');
      } finally {
        setLoadingData(false);
      }
    };
    fetchBusiness();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      await api.put(`/businesses/${id}`, formData);
      navigate('/owner/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to update listing');
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) return <div className="max-w-xl mx-auto py-20"><LoadingSkeleton /></div>;

  return (
    <div className="max-w-xl mx-auto py-12 md:py-20 animate-in fade-in duration-300">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Edit Listing</h1>
        <p className="text-secondary">Update the details for <span className="text-white font-medium">'{initialData.name}'</span>.</p>
      </div>
      
      <BusinessForm initialData={initialData} onSubmit={handleSubmit} isLoading={saving} />
    </div>
  );
};

export default EditBusiness;
