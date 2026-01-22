import React, { useState } from 'react';
import { signInWithGoogle } from './firebase'; // Ensure this path is correct
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, Mail, Smartphone, GraduationCap, 
  ArrowRight, AlertCircle, CheckCircle2, User 
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [step, setStep] = useState(1); // Step 1: Google Auth, Step 2: Form
  const [formData, setFormData] = useState({
    name: '', email: '', googleId: '', mobile: '', classLevel: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  // Step 1: Handle Google Auth
  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Pre-fill data from Google
      setFormData({ 
        ...formData, 
        name: user.displayName, 
        email: user.email, 
        googleId: user.uid 
      });
      
      // Move to Step 2 (Form Filling)
      setStep(2);
    } catch (err) {
      console.error(err);
      setError("Google Signup Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle Final Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/signup`, formData);

      localStorage.setItem('token', res.data.token);
      alert(res.data.message);
      navigate('/login'); // Uncomment this when router is set up
    } catch (err) {
      // Show error if user already exists (from backend)
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 z-10">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-slate-800 rounded-xl mb-4 shadow-lg">
            <Sparkles className="text-blue-500" size={28} />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Create Account</h2>
          <p className="text-slate-400 mt-2 text-sm">Join Sparkles to start learning smarter.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/50 flex items-start gap-3 text-red-400 text-sm">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Google Auth */}
        {step === 1 && (
          <div className="space-y-6">
            <button 
              onClick={handleGoogleSignup} 
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-100 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900/50 px-2 text-slate-500 font-medium backdrop-blur-xl">Secure Authentication</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Additional Details Form */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
            
            {/* User Welcome Preview */}
            <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {formData.name.charAt(0)}
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-white text-sm font-semibold truncate">Hi, {formData.name}</p>
                    <p className="text-blue-300 text-xs truncate">{formData.email}</p>
                </div>
                <CheckCircle2 size={18} className="text-blue-400" />
            </div>

            {/* Input: Mobile */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Mobile Number</label>
              <div className="relative group">
                <Smartphone className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type="tel" 
                  placeholder="e.g. 9876543210" 
                  required 
                  className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                />
              </div>
            </div>

            {/* Input: Class Level */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Class Level</label>
              <div className="relative group">
                <GraduationCap className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-purple-500 transition-colors" size={20} />
                <select 
                   required
                   className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                   onChange={(e) => setFormData({...formData, classLevel: e.target.value})}
                   defaultValue=""
                >
                    <option value="" disabled className="text-slate-500">Select your class</option>
                    {[...Array(12)].map((_, i) => (
                        <option key={i} value={i + 1} className="bg-slate-900">Class {i + 1}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                   <ArrowRight size={16} className="text-slate-600 rotate-90" />
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 transition-all transform active:scale-95 mt-4 flex items-center justify-center gap-2"
            >
               {loading ? "Creating Profile..." : "Complete Registration"}
               {!loading && <ArrowRight size={20} />}
            </button>
          </form>
        )}
      </div>

      {/* Login Link Footer */}
      <div className="mt-8 text-center z-10">
        <p className="text-slate-400 text-sm">
          Already have an account?{' '}
          <a 
            href="/login" 
            className="text-blue-400 font-bold hover:text-blue-300 transition-colors border-b border-transparent hover:border-blue-300 pb-0.5"
          >
            Log In here
          </a>
        </p>
      </div>
      
      {/* Simple Animation Style */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

    </div>
  );
};

export default Signup;