import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

const BusinessForm = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'Food',
    description: initialData?.description || '',
    address: initialData?.address || '',
    image: initialData?.image || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-2xl border border-border">
        <InputField label="Business Name" name="name" value={formData.name} onChange={handleChange} required />
        
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-secondary mb-2">Category</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-[#333333] text-white transition-all appearance-none"
          >
            <option value="Food">Food</option>
            <option value="Cafe">Cafe</option>
            <option value="Stationery">Stationery</option>
            <option value="PG">PG</option>
          </select>
        </div>
        
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-secondary mb-2">Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required
            rows="4"
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-[#333333] text-white resize-none transition-all placeholder-muted"
          ></textarea>
        </div>

        <InputField label="Complete Address" name="address" value={formData.address} onChange={handleChange} required />
        <InputField label="Image URL (Unsplash or similar)" name="image" value={formData.image} onChange={handleChange} />
        
        <Button size="lg" type="submit" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? 'Saving changes...' : 'Save Business'}
        </Button>
      </form>
    </div>
  );
};

export default BusinessForm;
