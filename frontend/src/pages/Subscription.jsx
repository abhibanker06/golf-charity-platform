import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Check, CreditCard, Lock, ChevronRight, ArrowLeft, ShieldCheck, Heart, User } from 'lucide-react';

export default function Subscription() {
  const [step, setStep] = useState(1); // 1: Plan, 2: Payment
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(() => JSON.parse(localStorage.getItem('userInfo')) || null);
  const navigate = useNavigate();

  // Mock form state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

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
      const { data } = await axios.get('/api/auth/profile', { withCredentials: true });
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      console.error('Error fetching profile', err);
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setStep(2);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    // Final Validation
    const cleanCard = cardNumber.replace(/\s/g, '');
    if (cleanCard.length !== 16) return alert('Invalid card number. Must be 16 digits.');
    if (expiry.length !== 5) return alert('Invalid expiry date. Use MM/YY.');
    if (cvc.length < 3) return alert('Invalid CVC.');

    setLoading(true);

    try {
      // Simulate encryption/bank delay
      await new Promise(r => setTimeout(r, 2000));

      const paymentData = {
        subscriptionStatus: 'Active',
        plan: selectedPlan === 'monthly' ? 'Monthly' : 'Yearly',
        paymentMethod: {
          last4: cleanCard.slice(-4),
          brand: 'Visa', // Mocking brand detection
          expiry: expiry
        }
      };

      const { data } = await axios.put('/api/auth/profile', paymentData, { withCredentials: true });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Payment failed');
      setLoading(false);
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 16) value = value.slice(0, 16);
    // Format as XXXX XXXX XXXX XXXX
    const formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setExpiry(value);
  };

  const handleCvcChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 4) value = value.slice(0, 4);
    setCvc(value);
  };

  if (!userInfo) return null;

  return (
    <div className="min-h-screen bg-[#fbfcfb] font-sans text-slate-900 pb-20">
      {/* Decorative Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2a9d7b]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#dc9e38]/5 rounded-full blur-[100px]"></div>
      </div>

      <nav className="bg-white border-b border-slate-100 py-4 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-[#2a9d7b] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">G</div>
          <span className="font-extrabold text-lg tracking-tight font-serif text-slate-900">GolfGive</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <ShieldCheck size={14} className="text-[#2a9d7b]" /> Secure Checkout
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4 font-serif">Choose Your Membership</h1>
              <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">Join the community, track your progress, and support great causes with every round.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Monthly Plan */}
              <div className="bg-white border border-slate-100 rounded-[2rem] p-10 shadow-sm hover:shadow-xl hover:border-[#2a9d7b]/20 transition-all group flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-[#2a9d7b]/5 transition-colors"></div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">Monthly Member</h3>
                <div className="text-5xl font-black text-slate-900 mb-6 tracking-tighter relative z-10">£9.99<span className="text-sm text-slate-400 font-bold uppercase tracking-widest pl-1">/mo</span></div>
                
                <ul className="space-y-4 mb-10 flex-1 text-slate-600 font-bold text-sm relative z-10">
                  <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] flex items-center justify-center"><Check size={12}/></div> 1 Entry to Monthly Draw</li>
                  <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] flex items-center justify-center"><Check size={12}/></div> Pro Scorecard & Tracking</li>
                  <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] flex items-center justify-center"><Check size={12}/></div> Verified Charity Impact</li>
                </ul>

                <button 
                  onClick={() => handlePlanSelect('monthly')}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-lg"
                >
                  Choose Monthly <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Yearly Plan */}
              <div className="bg-white border-2 border-[#2a9d7b] rounded-[2rem] p-10 shadow-2xl transition-all flex flex-col relative overflow-hidden scale-105">
                <div className="absolute top-0 right-0 bg-[#2a9d7b] text-white text-[10px] font-black uppercase tracking-widest py-2 px-6 rounded-bl-2xl">
                  Best Value
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">Yearly Member</h3>
                <div className="text-5xl font-black text-[#2a9d7b] mb-6 tracking-tighter">£99.99<span className="text-sm text-slate-400 font-bold uppercase tracking-widest pl-1">/yr</span></div>
                
                <ul className="space-y-4 mb-10 flex-1 text-slate-600 font-bold text-sm">
                  <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] flex items-center justify-center"><Check size={12}/></div> 1 Entry to Monthly Draw</li>
                  <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] flex items-center justify-center"><Check size={12}/></div> Pro Scorecard & Tracking</li>
                  <li className="flex items-center gap-3"><div className="w-5 h-5 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] flex items-center justify-center"><Check size={12}/></div> Verified Charity Impact</li>
                  <li className="flex items-center gap-3 text-[#2a9d7b]"><div className="w-5 h-5 rounded-full bg-[#2a9d7b]/20 text-[#2a9d7b] flex items-center justify-center"><Check size={12}/></div> Get 2 months FREE</li>
                </ul>

                <button 
                  onClick={() => handlePlanSelect('yearly')}
                  className="w-full py-4 bg-[#2a9d7b] text-white font-bold rounded-2xl hover:bg-[#238769] transition-all flex items-center justify-center gap-2 group shadow-xl"
                >
                  Choose Yearly <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-300">
            <button 
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={16} /> Back to plans
            </button>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#2a9d7b]/5 rounded-full -mr-16 -mt-16"></div>
               
               <div className="mb-8">
                <div className="text-xs font-black text-[#2a9d7b] uppercase tracking-[0.2em] mb-2">Payment Details</div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-serif">Complete Purchase</h2>
               </div>

               <div className="bg-slate-50 p-4 rounded-2xl mb-8 flex justify-between items-center border border-slate-100">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Plan</p>
                    <p className="font-bold text-slate-900 capitalize">{selectedPlan} Membership</p>
                  </div>
                  <div className="text-xl font-black text-slate-900 tracking-tight">
                    £{selectedPlan === 'monthly' ? '9.99' : '99.99'}
                  </div>
               </div>

               <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Cardholder Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        required
                        type="text" 
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe" 
                        className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#2a9d7b]/10 focus:border-[#2a9d7b] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        required
                        type="text" 
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="0000 0000 0000 0000" 
                        className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#2a9d7b]/10 focus:border-[#2a9d7b] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 tracking-widest"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Expiry</label>
                      <input 
                        required
                        type="text" 
                        value={expiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY" 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#2a9d7b]/10 focus:border-[#2a9d7b] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">CVC</label>
                      <input 
                        required
                        type="text" 
                        value={cvc}
                        onChange={handleCvcChange}
                        placeholder="•••" 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#2a9d7b]/10 focus:border-[#2a9d7b] outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  <button 
                    disabled={loading}
                    className={`w-full py-5 bg-[#2a9d7b] text-white font-black rounded-2xl shadow-xl hover:bg-[#238769] transition-all flex items-center justify-center gap-3 transform ${loading ? 'scale-95 opacity-80' : 'hover:-translate-y-1 active:scale-95'}`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Securing Funds...
                      </>
                    ) : (
                      <>
                        <Lock size={18} /> Pay £{selectedPlan === 'monthly' ? '9.99' : '99.99'}
                      </>
                    )}
                  </button>
               </form>

               <div className="mt-8 flex items-center justify-center gap-6 opacity-40 grayscale pointer-events-none">
                 <div className="text-[10px] font-black">VISA</div>
                 <div className="text-[10px] font-black">MASTERCARD</div>
                 <div className="text-[10px] font-black">AMEX</div>
               </div>
            </div>
            
            <p className="text-center text-[10px] font-bold text-slate-400 mt-6 flex items-center justify-center gap-2 uppercase tracking-[0.1em]">
              <Lock size={10} /> 256-bit SSL Encrypted Transaction
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
