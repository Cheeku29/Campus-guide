import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto mt-32 bg-surface p-8 rounded-2xl border border-border">
      <div className="text-center mb-8">
         <div className="w-10 h-10 bg-white rounded-xl mx-auto flex items-center justify-center mb-4">
           <span className="text-black font-bold text-xl leading-none">C</span>
         </div>
         <h2 className="text-2xl font-semibold text-white tracking-tight">Welcome Back</h2>
      </div>
      
      {error && <div className="bg-red-500/10 border border-red-500/20 text-error p-3 rounded-xl mb-6 text-sm text-center animate-shake">{error}</div>}
      
      <form onSubmit={handleSubmit}>
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
        />
        <Button className="w-full mt-2" size="lg" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-sm text-secondary">
          Don't have an account? <Link to="/signup" className="text-white hover:underline transition-all">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
