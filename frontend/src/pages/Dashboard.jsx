import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { LogOut, Trophy, Plus, Shield, ChevronDown, User, CreditCard, Pencil, Trash2, X, Check } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(() => JSON.parse(localStorage.getItem('userInfo')) || null);
  const [scores, setScores] = useState(() => JSON.parse(localStorage.getItem('cachedScores')) || []);
  const [newScore, setNewScore] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isLoading, setIsLoading] = useState(!localStorage.getItem('cachedScores'));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user) {
      navigate('/login');
    } else {
      setUserInfo(user);
      fetchScores();
      fetchProfile();
    }
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('/api/auth/profile', { withCredentials: true });
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      console.error('Error fetching profile', err);
    }
  };

  const fetchScores = async () => {
    try {
      const { data } = await axios.get('/api/scores', { withCredentials: true });
      setScores(data);
      localStorage.setItem('cachedScores', JSON.stringify(data));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddScore = async (e) => {
    e.preventDefault();
    try {
       await axios.post('/api/scores', { points: Number(newScore) }, { withCredentials: true });
      setNewScore('');
      fetchScores();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding score');
    }
  };

  const handleDeleteScore = async (id) => {
    if (!window.confirm('Are you sure you want to delete this score?')) return;
    try {
      await axios.delete(`/api/scores/${id}`);
      fetchScores();
    } catch (err) {
      alert('Error deleting score');
    }
  };

  const handleUpdateScore = async (id) => {
    try {
      await axios.put(`/api/scores/${id}`, { points: Number(editValue) });
      setEditingId(null);
      fetchScores();
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating score');
    }
  };

  const logout = async () => {
    try { await axios.post('/api/auth/logout'); } catch (err) {}
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  if (!userInfo) return null;

  return (
    <div className="min-h-screen bg-[#fbfcfb] fade-in font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center shadow-sm relative z-50">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer z-10" onClick={() => navigate('/dashboard')}>
          <div className="bg-[#2a9d7b] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">G</div>
          <span className="font-extrabold text-lg tracking-tight font-serif text-slate-900">GolfGive</span>
        </div>
        
        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center justify-center gap-8 text-sm font-bold text-slate-500 absolute left-1/2 -translate-x-1/2 w-max">
          <button onClick={() => navigate('/dashboard')} className="text-slate-900 transition-colors">Dashboard</button>
          <button onClick={() => navigate('/draws')} className="hover:text-slate-900 transition-colors">Draws & Results</button>
          <button onClick={() => navigate('/profile', { state: { activeTab: 'charity' } })} className="hover:text-slate-900 transition-colors">My Impact</button>
        </div>

        <div className="flex items-center gap-4">
          
          {/* User Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 hover:bg-slate-50 px-3 py-1.5 rounded-full transition-colors"
            >
              <div className="w-8 h-8 bg-[#2a9d7b]/10 text-[#2a9d7b] font-bold rounded-full flex items-center justify-center text-sm shadow-inner uppercase">
                {userInfo.name ? userInfo.name.charAt(0) : userInfo.email.charAt(0)}
              </div>
              <ChevronDown size={14} className="text-slate-500" />
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-sm font-bold truncate text-slate-900">{userInfo.name || 'Golfer'}</p>
                    <p className="text-xs text-slate-500 truncate">{userInfo.email}</p>
                  </div>
                  <div className="p-2">
                    <button onClick={() => {navigate('/profile'); setIsDropdownOpen(false);}} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors">
                      <User size={16} /> My Profile
                    </button>
                    <button onClick={() => {navigate('/profile', { state: { activeTab: 'subscription' } }); setIsDropdownOpen(false);}} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors">
                      <CreditCard size={16} /> Billing & Plan
                    </button>
                  </div>
                  <div className="p-2 border-t border-slate-100">
                    <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4 md:p-8 grid md:grid-cols-3 gap-8 mt-4">
        
        {/* Play & Score Card */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 tracking-tight font-serif text-slate-900">Your Scorecard</h2>
            
            <form onSubmit={handleAddScore} className="flex flex-col sm:flex-row gap-4 mb-10 bg-slate-50 p-5 rounded-2xl items-end border border-slate-100">
              <div className="flex-1 w-full">
                <label className="block text-sm font-bold mb-2 text-slate-700">Enter New Score (Stableford)</label>
                <input type="number" min="1" max="45" value={newScore} onChange={(e)=>setNewScore(e.target.value)} required 
                  className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#2a9d7b]/40 focus:border-[#2a9d7b] outline-none transition-all shadow-inner font-medium text-lg text-slate-900" placeholder="e.g. 36" />
              </div>
              <button type="submit" className="w-full sm:w-auto bg-[#2a9d7b] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#238769] transition-all flex justify-center items-center shadow-md whitespace-nowrap"><Plus size={20} className="mr-1"/> Submit Score</button>
            </form>

            <div className="space-y-3">
              {scores.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-[#2a9d7b]/10 text-[#2a9d7b] rounded-full flex items-center justify-center mb-6">
                    <Trophy size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 font-serif">Welcome to your Dashboard!</h3>
                  <p className="text-slate-500 mb-6 max-w-md font-medium">You're one step closer to your first draw. Enter your first score to activate your monthly entry.</p>
                  <button onClick={(e) => { e.preventDefault(); document.querySelector('input[type="number"]')?.focus(); }} className="bg-[#2a9d7b] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#238769] transition-all flex items-center gap-2 shadow-sm">
                    <Plus size={18} /> Add Your First Score
                  </button>
                </div>
              ) : null}
              {scores.map((score, idx) => (
                <div key={score._id} className="flex justify-between items-center p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-[#2a9d7b]/30 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className="bg-slate-100 text-slate-800 font-black w-12 h-12 rounded-full flex items-center justify-center shadow-inner">#{scores.length - Math.abs(idx)}</div>
                    <div>
                      <div className="font-bold text-slate-700">{new Date(score.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric'})}</div>
                      <div className="flex items-center gap-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {editingId === score._id ? (
                          <>
                            <button onClick={() => handleUpdateScore(score._id)} className="text-[#2a9d7b] hover:text-[#238769] transition-colors"><Check size={14} /></button>
                            <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={14} /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => { setEditingId(score._id); setEditValue(score.points); }} className="text-slate-400 hover:text-[#2a9d7b] transition-colors"><Pencil size={14} /></button>
                            <button onClick={() => handleDeleteScore(score._id)} className="text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {editingId === score._id ? (
                    <input 
                      type="number" 
                      value={editValue} 
                      onChange={(e) => setEditValue(e.target.value)} 
                      className="w-20 text-3xl font-black text-[#2a9d7b] bg-slate-50 border-b-2 border-[#2a9d7b] outline-none text-right"
                      autoFocus
                    />
                  ) : (
                    <div className="text-3xl font-black text-[#2a9d7b] tracking-tighter">{score.points} <span className="text-sm text-slate-400 font-bold uppercase tracking-widest pl-1">pts</span></div>
                  )}
                </div>
              ))}
              {scores.length === 5 && <p className="text-xs font-bold text-slate-500 mt-6 text-right flex items-center justify-end gap-1"><Shield size={12}/> Only your 5 most recent rounds qualify for the monthly draw.</p>}
            </div>
          </div>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-6">
          <div className={`${userInfo.subscriptionStatus === 'Active' ? 'bg-[#2a9d7b]' : 'bg-slate-300'} text-white p-8 rounded-3xl shadow-xl border ${userInfo.subscriptionStatus === 'Active' ? 'border-[#238769]' : 'border-slate-400'} relative overflow-hidden transition-colors`}>
            <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4"><Trophy size={140}/></div>
            <h3 className="text-sm font-black mb-1 opacity-90 uppercase tracking-widest text-white/80">Subscription</h3>
            <p className="font-black text-4xl mb-4 tracking-tight drop-shadow-sm font-serif">{userInfo.subscriptionStatus || 'Inactive'}</p>
            <p className="text-sm opacity-90 leading-relaxed font-medium">
              {userInfo.subscriptionStatus === 'Active' 
                ? `Your ${userInfo.plan} plan is active. You are automatically entered into this month's draw!`
                : 'Subscribe to a plan to start tracking scores and enter the monthly draws.'}
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <h3 className="text-xl font-bold mb-6 tracking-tight font-serif text-slate-900">Your Impact</h3>
            <div className="mb-6">
              <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Supporting</p>
              <p className="font-bold text-lg leading-tight text-slate-800">
                {userInfo.selectedCharity?.name || 'No charity selected'}
              </p> 
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Pledge Amount</p>
              <div className="text-4xl font-black text-[#dc9e38] tracking-tighter">{userInfo.charityPercentage || 10}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
