import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans text-slate-900">
      {/* Left Side: Brand & Stats */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 bg-[#2a9d7b] relative overflow-hidden flex-col justify-between p-12 lg:p-20 text-white">
        {/* Background Decorative Rings */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] border-[1px] border-white rounded-full"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] border-[1px] border-white rounded-full"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-24 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-white/20 backdrop-blur-md text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl border border-white/30 shadow-lg">G</div>
            <span className="font-extrabold text-2xl tracking-tight font-serif">GolfGive</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl lg:text-6xl font-serif font-black leading-[1.1] mb-8 tracking-tight">
              Play golf.<br />
              Win prizes.<br />
              Change lives.
            </h1>
            <p className="text-white/80 text-lg font-medium leading-relaxed mb-12">
              Join thousands of golfers making an impact with every round they play.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-8 pt-12 border-t border-white/20">
          <div>
            <div className="text-2xl font-black">4,200+</div>
            <div className="text-[10px] uppercase tracking-widest font-bold opacity-70 mt-1">Active Members</div>
          </div>
          <div className="border-l border-white/20 pl-8">
            <div className="text-2xl font-black">£186k</div>
            <div className="text-[10px] uppercase tracking-widest font-bold opacity-70 mt-1">Donated</div>
          </div>
          <div className="border-l border-white/20 pl-8">
            <div className="text-2xl font-black">12</div>
            <div className="text-[10px] uppercase tracking-widest font-bold opacity-70 mt-1">Charities</div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 bg-slate-50/30">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h2 className="text-4xl font-serif font-black text-slate-900 mb-3 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 font-medium tracking-tight">Sign in to your GolfGive account to continue</p>
          </div>

          {error && (
            <div className="p-4 mb-8 text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-2xl animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700">Email address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2a9d7b] transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] focus:ring-4 focus:ring-[#2a9d7b]/10 focus:border-[#2a9d7b] outline-none transition-all font-medium text-slate-900 shadow-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <Link to="#" className="text-xs font-bold text-[#2a9d7b] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#2a9d7b] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-4 bg-white border border-slate-200 rounded-[1.25rem] focus:ring-4 focus:ring-[#2a9d7b]/10 focus:border-[#2a9d7b] outline-none transition-all font-medium text-slate-900 shadow-sm"
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="keep-signed-in" className="w-4 h-4 rounded border-slate-300 text-[#2a9d7b] focus:ring-[#2a9d7b]" />
              <label htmlFor="keep-signed-in" className="text-sm font-semibold text-slate-500 cursor-pointer">Keep me signed in</label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#2a9d7b] text-white font-black py-4 rounded-[1.25rem] hover:bg-[#238769] transition-all shadow-xl shadow-[#2a9d7b]/20 flex items-center justify-center gap-2 group mt-8"
            >
              Sign in <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-12 text-center text-sm font-bold text-slate-400 uppercase tracking-widest">
            Don't have an account? <Link to="/signup" className="text-[#2a9d7b] hover:text-[#238769] border-b-2 border-[#2a9d7b]/30 hover:border-[#2a9d7b] transition-all pb-0.5 ml-1">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
