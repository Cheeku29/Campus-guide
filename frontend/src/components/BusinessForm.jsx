import React, { useState, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import InputField from './InputField';

const BusinessForm = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'Food',
    description: initialData?.description || '',
    address: initialData?.address || '',
    image: initialData?.image || ''
  });

  const autocompleteRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.formatted_address) {
        setFormData((prev) => ({ ...prev, address: place.formatted_address }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0e1320] border border-[#1e2840] rounded-2xl p-8 shadow-2xl relative z-10 w-full">
      <InputField 
        label="Business Name" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        required 
      />
      
      <div className="mb-5 w-full">
        <label className="block text-sm font-medium text-[#8b95b0] mb-2">Category</label>
        <div className="relative">
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#080b14] border border-[#1e2840] rounded-xl focus:outline-none focus:border-amber-500/50 shadow-[0_0_0_3px_transparent] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)] text-[#eef0f6] transition-all appearance-none text-sm"
          >
            <option value="Food">Food</option>
            <option value="Cafe">Cafe</option>
            <option value="Stationery">Stationery</option>
            <option value="PG">PG</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8b95b0]">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
          </div>
        </div>
      </div>
      
      <div className="mb-5 w-full">
        <label className="block text-sm font-medium text-[#8b95b0] mb-2">Description</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required
          rows="4"
          placeholder="Detailed description of your spot..."
          className="w-full px-4 py-3 bg-[#080b14] border border-[#1e2840] rounded-xl focus:outline-none focus:border-amber-500/50 shadow-[0_0_0_3px_transparent] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)] text-[#eef0f6] resize-none transition-all placeholder-[#3d4f70] text-sm leading-relaxed"
        ></textarea>
      </div>

      <div className="mb-5 w-full">
        <label className="block text-sm font-medium text-[#8b95b0] mb-2">Complete Address</label>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Search for a location..."
            className="w-full px-4 py-3 bg-[#080b14] border border-[#1e2840] rounded-xl outline-none transition-all placeholder-[#3d4f70] text-[#eef0f6] shadow-[0_0_0_3px_transparent] focus:border-amber-500/50 focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)]"
            required
          />
        </Autocomplete>
      </div>
      
      <div className="mb-5 flex flex-col">
        <InputField 
          label="Image URL (Unsplash or similar)" 
          name="image" 
          value={formData.image} 
          onChange={handleChange} 
        />
        {formData.image ? (
          <div className="mt-1 w-full h-40 rounded-xl overflow-hidden border border-[#1e2840] border-dashed relative">
             <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e)=>{e.target.style.display='none'}} />
             <div className="absolute inset-0 bg-gradient-to-t from-[#080b14]/80 to-transparent pointer-events-none"></div>
          </div>
        ) : (
          <div className="mt-1 w-full h-32 rounded-xl flex items-center justify-center border border-[#1e2840] border-dashed bg-[#080b14] text-[#3d4f70] text-sm">
             Image preview will appear here
          </div>
        )}
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full mt-6 overflow-hidden relative group font-medium px-6 py-3.5 rounded-xl text-[#080b14] shadow-lg shadow-amber-500/10 transition-all duration-200"
      >
         <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 transition-transform duration-300 group-hover:scale-105"></span>
         <span className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
         <span className="relative z-10 flex items-center justify-center">
           {isLoading ? 'Saving changes...' : 'Save Spot'}
         </span>
      </button>
    </form>
  );
};

export default BusinessForm;
