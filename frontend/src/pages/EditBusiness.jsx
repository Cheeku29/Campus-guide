import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import BusinessForm from '../components/BusinessForm';
import LoadingSkeleton from '../components/LoadingSkeleton';
import MapWrapper from '../components/maps/MapWrapper';

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

  if (loadingData) return <div className="max-w-2xl mx-auto py-20 px-6"><LoadingSkeleton count={3} /></div>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 relative">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/5 blur-3xl pointer-events-none rounded-full"></div>
      
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-3xl font-bold text-[#eef0f6] tracking-tight mb-3">Edit Spot Details</h1>
        <p className="text-[#8b95b0]">Update the details for <span className="text-[#eef0f6] font-medium">'{initialData.name}'</span>.</p>
      </div>
      
      <MapWrapper>
        <BusinessForm initialData={initialData} onSubmit={handleSubmit} isLoading={saving} />
      </MapWrapper>
    </div>
  );
};

export default EditBusiness;
