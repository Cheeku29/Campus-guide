import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import InputField from '../components/InputField';
import Button from '../components/Button';

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
    <div className="max-w-sm mx-auto mt-24 bg-surface p-8 rounded-2xl border border-border">
      <div className="text-center mb-8">
         <div className="w-10 h-10 bg-white rounded-xl mx-auto flex items-center justify-center mb-4">
           <span className="text-black font-bold text-xl leading-none">C</span>
         </div>
         <h2 className="text-2xl font-semibold text-white tracking-tight">Create Account</h2>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/20 text-error p-3 rounded-xl mb-6 text-sm text-center animate-shake">{error}</div>}
      
      <form onSubmit={handleSubmit}>
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
          <label className="block text-sm font-medium text-secondary mb-2">I am a:</label>
          <div className="flex space-x-2 md:space-x-3 p-1 bg-background border border-border rounded-xl">
            <label className="flex-1 cursor-pointer">
              <input 
                type="radio" 
                name="role" 
                value="student" 
                checked={formData.role === 'student'} 
                onChange={handleChange} 
                className="peer sr-only" 
              />
              <div className="text-center py-2 rounded-lg text-sm font-medium text-secondary peer-checked:bg-white peer-checked:text-black transition-all">
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
              <div className="text-center py-2 rounded-lg text-sm font-medium text-secondary peer-checked:bg-white peer-checked:text-black transition-all">
                Owner
              </div>
            </label>
          </div>
        </div>

        <Button className="w-full mt-2" size="lg" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>
      
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-sm text-secondary">
          Already have an account? <Link to="/login" className="text-white hover:underline transition-all">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
