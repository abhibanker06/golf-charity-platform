import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LogOut, ChevronDown, User, CreditCard, Heart, Shield, Mail, Calendar } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(() => JSON.parse(localStorage.getItem('userInfo')) || null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [charities, setCharities] = useState(() => JSON.parse(localStorage.getItem('cachedCharities')) || []);
  const [loadingCharities, setLoadingCharities] = useState(false);
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'personal');
  const [isLoading, setIsLoading] = useState(!localStorage.getItem('userInfo'));

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user) {
      navigate('/login');
    } else {
      setUserInfo(user);
      fetchProfile();
    }
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('/api/auth/profile');
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      console.error('Error fetching profile', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'charity' && charities.length === 0) {
      fetchCharities();
    }
  }, [activeTab]);

  const fetchCharities = async () => {
    setLoadingCharities(true);
    try {
      const { data } = await axios.get('/api/charities');
      setCharities(data);
      localStorage.setItem('cachedCharities', JSON.stringify(data));
    } catch (err) {
      console.error('Error fetching charities', err);
    } finally {
      setLoadingCharities(false);
    }
  };

  const handleSelectCharity = async (charityId) => {
    try {
      const { data } = await axios.put('/api/auth/profile', {
        selectedCharity: charityId
      });
      // The backend returns populated fields sometimes, but we mainly need to update user context
      const updatedUser = { ...userInfo, selectedCharity: charityId };
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      setUserInfo(updatedUser);
      // Optional: Refetch to get full charity object if needed, but for now ID is enough to swap view
    } catch (err) {
      alert('Error selecting charity');
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
      {/* Navbar identical to Dashboard */}
      <nav className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center shadow-sm relative z-50">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer z-10" onClick={() => navigate('/dashboard')}>
          <div className="bg-[#2a9d7b] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">G</div>
          <span className="font-extrabold text-lg tracking-tight font-serif text-slate-900">GolfGive</span>
        </div>
        
        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center justify-center gap-8 text-sm font-bold text-slate-500 absolute left-1/2 -translate-x-1/2 w-max">
          <button onClick={() => navigate('/dashboard')} className="hover:text-slate-900 transition-colors">Dashboard</button>
          <button onClick={() => navigate('/draws')} className="hover:text-slate-900 transition-colors">Draws & Results</button>
          <button onClick={() => setActiveTab('charity')} className="hover:text-slate-900 transition-colors">My Impact</button>
        </div>

        <div className="flex items-center gap-4">
          {userInfo.role === 'Admin' && (
            <button onClick={() => navigate('/admin')} className="text-xs bg-[#dc9e38]/10 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-lg font-bold hover:bg-[#dc9e38]/20 transition-colors flex items-center gap-1.5 shadow-sm">
              <Shield size={14}/> Admin
            </button>
          )}
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 hover:bg-slate-50 px-3 py-1.5 rounded-full transition-colors relative z-20"
            >
              <div className="w-8 h-8 bg-[#2a9d7b]/10 text-[#2a9d7b] font-bold rounded-full flex items-center justify-center text-sm shadow-inner uppercase">
                {userInfo.name ? userInfo.name.charAt(0) : userInfo.email.charAt(0)}
              </div>
              <ChevronDown size={14} className="text-slate-500" />
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
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

      {/* Profile Layout */}
      <div className="max-w-6xl mx-auto p-4 md:p-8 grid md:grid-cols-4 gap-8 mt-4">
        
        {/* Sidebar Navigation */}
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('personal')}
            className={`w-full flex items-center justify-start gap-3 px-5 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'personal' ? 'bg-[#2a9d7b] text-white shadow-md' : 'text-slate-600 hover:bg-white hover:text-slate-900 shadow-sm border border-transparent'}`}
          >
            <User size={18} /> Personal Details
          </button>
          <button 
            onClick={() => setActiveTab('subscription')}
            className={`w-full flex items-center justify-start gap-3 px-5 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'subscription' ? 'bg-[#2a9d7b] text-white shadow-md' : 'text-slate-600 hover:bg-white hover:text-slate-900 shadow-sm border border-transparent'}`}
          >
            <CreditCard size={18} /> Plan & Billing
          </button>
          <button 
            onClick={() => setActiveTab('charity')}
            className={`w-full flex items-center justify-start gap-3 px-5 py-3.5 rounded-2xl font-bold transition-all ${activeTab === 'charity' ? 'bg-[#2a9d7b] text-white shadow-md' : 'text-slate-600 hover:bg-white hover:text-slate-900 shadow-sm border border-transparent'}`}
          >
            <Heart size={18} /> Charity Impact
          </button>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3">
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            
            {activeTab === 'personal' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-3xl font-bold mb-8 tracking-tight font-serif text-slate-900 border-b border-slate-100 pb-4">Personal Details</h2>
                
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-start gap-4 hover:shadow-sm hover:border-[#2a9d7b]/30 transition-all">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-[#2a9d7b]"><User size={20} /></div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Full Name</label>
                      <div className="font-black text-lg text-slate-900 tracking-tight">{userInfo.name || 'Not Provided'}</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-start gap-4 hover:shadow-sm hover:border-[#2a9d7b]/30 transition-all">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-[#2a9d7b]"><Mail size={20} /></div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</label>
                      <div className="font-black text-lg text-slate-900 tracking-tight truncate max-w-[200px] sm:max-w-xs md:max-w-sm" title={userInfo.email}>{userInfo.email}</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-start gap-4 hover:shadow-sm hover:border-[#2a9d7b]/30 transition-all sm:col-span-2 md:col-span-1">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-[#2a9d7b]"><Calendar size={20} /></div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Member Since</label>
                      <div className="font-black text-lg text-slate-900 tracking-tight">
                        {userInfo.createdAt ? new Date(userInfo.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : 'March 2026'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subscription' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-3xl font-bold mb-8 tracking-tight font-serif text-slate-900 border-b border-slate-100 pb-4">Plan & Billing</h2>
                
                {(!userInfo.plan || userInfo.plan === 'None') ? (
                  <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CreditCard size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">No Active Plan</h3>
                    <p className="text-slate-500 mb-8 max-w-xs mx-auto font-medium">Choose a membership plan to unlock all features and start tracking your success.</p>
                    <button 
                      onClick={() => navigate('/subscribe')}
                      className="px-8 py-3 bg-[#2a9d7b] text-white font-bold rounded-2xl hover:bg-[#238769] transition-all shadow-md active:scale-95"
                    >
                      View Plans
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-32 h-32 bg-[#2a9d7b]/5 rounded-full blur-xl z-0 pointer-events-none"></div>
                      <div className="z-10">
                        <div className="inline-block px-3 py-1 bg-[#2a9d7b]/10 text-[#2a9d7b] text-xs font-black uppercase tracking-wider rounded-full mb-3 shadow-inner">
                          {userInfo.subscriptionStatus || 'Active'}
                        </div>
                        <h3 className="text-2xl font-bold font-serif text-slate-900 mb-1">{userInfo.plan} Membership</h3>
                        <p className="text-sm font-medium text-slate-500">
                          {userInfo.plan === 'Monthly' ? '£9.99 / month' : '£99.99 / year'} • Renews on {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
                        </p>
                      </div>
                      <button className="z-10 w-full md:w-auto px-6 py-3 bg-[#2a9d7b] text-white font-bold rounded-2xl hover:bg-[#238769] transition-all shadow-md transform hover:-translate-y-0.5 whitespace-nowrap">
                        {userInfo.plan === 'Monthly' ? 'Upgrade to Yearly' : 'Manage Plan'}
                      </button>
                    </div>

                    <div className="pt-2">
                      <h3 className="font-bold mb-3 text-slate-800 tracking-tight">Payment Method</h3>
                      <div className="flex items-center gap-4 p-4 border border-slate-100 bg-white rounded-2xl hover:shadow-sm transition-shadow">
                        <div className="w-12 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center font-black text-slate-400 text-xs shadow-inner uppercase">
                          {userInfo.paymentMethod?.brand || 'VISA'}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900">
                            {userInfo.paymentMethod?.brand || 'Visa'} ending in •••• {userInfo.paymentMethod?.last4 || '4242'}
                          </div>
                          <div className="text-xs font-medium text-slate-500 mt-0.5">Expires {userInfo.paymentMethod?.expiry || '12/28'}</div>
                        </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-slate-100 text-right">
                        {/* Cancel Subscription Removed as per user request */}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'charity' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-3xl font-bold mb-8 tracking-tight font-serif text-slate-900 border-b border-slate-100 pb-4">My Charity Impact</h2>
                
                {!userInfo.selectedCharity ? (
                  <div>
                    <div className="bg-[#2a9d7b]/5 border border-[#2a9d7b]/20 p-6 rounded-2xl mb-8">
                       <p className="text-[#2a9d7b] font-bold text-sm">Action Required: Your subscription is active, but you haven't picked a charity to support yet. Choose a company below to start your impact.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {charities.length === 0 ? (
                        <div className="md:col-span-2 text-center py-10 text-slate-400 font-medium">No charities found. Please add some via Admin panel.</div>
                      ) : (
                        charities.map(c => (
                          <div key={c._id} className="p-5 border border-slate-100 bg-white rounded-2xl flex items-center justify-between hover:border-[#2a9d7b]/50 hover:shadow-md transition-all cursor-pointer group" onClick={() => handleSelectCharity(c._id)}>
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-[#2a9d7b]/10 group-hover:text-[#2a9d7b] transition-colors"><Heart size={20} /></div>
                              <div>
                                <div className="font-bold text-slate-900">{c.name}</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Category Member</div>
                              </div>
                            </div>
                            <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all">Select</button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-[#fff7ed] border border-[#ffedd5] p-6 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 transform translate-x-4 -translate-y-4"><Heart size={100}/></div>
                        <Heart className="text-[#fb923c] mb-4 fill-[#fb923c]/20" size={32} />
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Lifetime Contribution</div>
                        <div className="text-4xl font-black text-[#fb923c] tracking-tighter drop-shadow-sm">£1.00</div>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col justify-center">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Current Pledge</div>
                        <div className="text-3xl font-black text-slate-900 mb-2">{userInfo.charityPercentage || 10}% <span className="text-sm text-slate-500 font-medium whitespace-nowrap">of your subscription</span></div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <h3 className="font-bold mb-4 text-slate-800 tracking-tight">Currently Supporting</h3>
                      <div className="flex items-center justify-between p-5 border border-slate-100 bg-white rounded-2xl hover:border-[#2a9d7b]/30 hover:shadow-sm transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#2a9d7b]/10 text-[#2a9d7b] rounded-xl flex items-center justify-center shadow-inner"><Heart size={20} className="fill-current" /></div>
                          <div>
                            <div className="font-bold text-slate-900">
                              {userInfo.selectedCharity?.name || charities.find(c => c._id === (userInfo.selectedCharity?._id || userInfo.selectedCharity))?.name || 'Loading selected charity...'}
                            </div>
                            <div className="text-xs font-semibold text-slate-500 mt-0.5">Primary Support</div>
                          </div>
                        </div>
                        <button 
                          onClick={async () => {
                            try {
                              const { data } = await axios.put('/api/auth/profile', { selectedCharity: null });
                              localStorage.setItem('userInfo', JSON.stringify(data));
                              setUserInfo(data);
                            } catch (err) {
                              alert('Error resetting charity');
                            }
                          }}
                          className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
                        >
                          Switch
                        </button>
                      </div>
                    </div>

                    <div className="mt-12">
                      <h3 className="font-bold mb-4 text-slate-800 tracking-tight">Contribution History</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="text-xs font-bold text-slate-400">MAR 2026</div>
                            <div className="font-bold text-sm text-slate-800">Monthly Membership Pledge</div>
                          </div>
                          <div className="font-black text-[#2a9d7b]">£1.00</div>
                        </div>
                        <p className="text-[10px] font-bold text-center text-slate-400 uppercase tracking-widest mt-4">Only showing your most recent contributions</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
