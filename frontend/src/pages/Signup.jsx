import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import InputField from '../components/InputField';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(formData.name, formData.email, formData.password, formData.role);
      navigate(formData.role === 'owner' ? '/owner/dashboard' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign up');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative z-10">
      <div className="w-full max-w-md mx-auto my-20 bg-[#0e1320] border border-[#1e2840] p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/5 blur-3xl pointer-events-none rounded-full"></div>

        <div className="text-center mb-10 relative z-10">
           <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
             <span className="text-white font-extrabold text-2xl leading-none">C</span>
           </div>
           <h2 className="text-3xl font-bold text-[#eef0f6] tracking-tight">Create Account</h2>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 font-medium p-3 rounded-xl mb-6 text-sm text-center animate-shake relative z-10">{error}</div>}
        
        <form onSubmit={handleSubmit} className="relative z-10">
          <InputField 
            label="Full Name" 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <InputField 
            label="Email Address" 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <InputField 
            label="Password" 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            minLength="6"
          />
          
          <div className="mb-6 w-full">
            <label className="block text-sm font-medium text-[#8b95b0] mb-2">I am a:</label>
            <div className="flex space-x-2 p-1 bg-[#080b14] border border-[#1e2840] rounded-xl">
              <label className="flex-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="role" 
                  value="student" 
                  checked={formData.role === 'student'} 
                  onChange={handleChange} 
                  className="peer sr-only" 
                />
                <div className="text-center py-2.5 rounded-lg text-sm font-medium text-[#8b95b0] peer-checked:bg-[#141c2e] peer-checked:text-[#eef0f6] transition-all duration-200">
                  Student
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input 
                  type="radio" 
                  name="role" 
                  value="owner" 
                  checked={formData.role === 'owner'} 
                  onChange={handleChange} 
                  className="peer sr-only" 
                />
                <div className="text-center py-2.5 rounded-lg text-sm font-medium text-[#8b95b0] peer-checked:bg-[#141c2e] peer-checked:text-[#eef0f6] transition-all duration-200">
                  Business Owner
                </div>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 overflow-hidden relative group font-medium px-6 py-3.5 rounded-xl text-[#080b14] shadow-lg shadow-amber-500/10 transition-all duration-200"
          >
             <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 transition-transform duration-300 group-hover:scale-105"></span>
             <span className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
             <span className="relative z-10 flex items-center justify-center">
               {loading ? 'Creating account...' : 'Sign Up'}
             </span>
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-[#1e2840] text-center relative z-10">
          <p className="text-sm text-[#8b95b0]">
            Already have an account? <Link to="/login" className="text-amber-400 font-medium hover:underline transition-all">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
