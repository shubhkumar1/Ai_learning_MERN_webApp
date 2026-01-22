import React, { useState } from 'react';
import { signInWithGoogle } from './firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Sparkles, AlertCircle, ArrowRight, LogIn } from 'lucide-react';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    
    try {
      // 1. Google Popup
      const result = await signInWithGoogle();
      const user = result.user;

      // 2. Check Backend if user exists
      const res = await axios.post('http://localhost:5000/api/login', {
        email: user.email 
      });

      // Success
      localStorage.setItem('token', res.data.token);
      // Optional: Store user name/id if needed
      // localStorage.setItem('userName', res.data.user.name);
      
      // alert(`Welcome back, ${res.data.user.name}!`); // Removed alert for smoother UX
      navigate('/app'); 

    } catch (err) {
      console.error("Login Error:", err);
      // Backend returns 404 if user not found, or generic error
      if (err.response && err.response.status === 404) {
          setError("Account not found. Please Sign Up first.");
      } else {
          setError(err.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 z-10 animate-fadeIn">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-slate-800 rounded-xl mb-4 shadow-lg ring-1 ring-white/10">
            <Sparkles className="text-blue-500" size={32} />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Log in to continue your learning journey.</p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm animate-shake">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Button */}
        <div className="space-y-6">
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
             {loading ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
             ) : (
                <>
                  {/* Google Icon SVG */}
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Continue with Google</span>
                  <ArrowRight size={18} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-slate-400" />
                </>
             )}
          </button>

          <div className="relative">
             <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
             </div>
             <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900/50 px-2 text-slate-500 font-medium backdrop-blur-xl">Secure Login</span>
             </div>
          </div>
        </div>

      </div>

      {/* Footer Link */}
      <div className="mt-8 text-center z-10 animate-fadeIn delay-100">
        <p className="text-slate-400 text-sm">
          Don't have an account?{' '}
          <a 
            href="/signup" 
            className="text-blue-400 font-bold hover:text-blue-300 transition-colors border-b border-transparent hover:border-blue-300 pb-0.5"
          >
            Sign Up here
          </a>
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
            20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
            animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>

    </div>
  );
};

export default Login;