import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trophy, Target, CreditCard, Check, ArrowRight, ChevronRight, Globe, Users } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      navigate('/dashboard');
    }
  }, [navigate]);
  return (
    <div className="font-sans text-slate-900 bg-[#fbfcfb] min-h-screen overflow-x-hidden selection:bg-[#2a9d7b] selection:text-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-100 py-4 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-[#2a9d7b] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">G</div>
          <span className="font-extrabold text-xl tracking-tight font-serif text-slate-900">GolfGive</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-bold text-sm text-slate-500">
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How It Works</a>
          <a href="#prizes" className="hover:text-slate-900 transition-colors">Prizes</a>
          <a href="#charities" className="hover:text-slate-900 transition-colors">Charities</a>
          <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-6 text-sm font-bold">
          <Link to="/login" className="text-slate-500 hover:text-slate-900 transition-colors">Sign In</Link>
          <Link to="/signup" className="bg-[#2a9d7b] text-white px-6 py-2.5 rounded-full hover:bg-[#238769] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-[#2a9d7b]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] text-xs font-bold mb-8">
            <Heart size={14} className="fill-current" /> Play golf. Win prizes. Change lives.
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6 font-serif">
            Your Score Could <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2a9d7b] to-[#dc9e38]">Win Big</span> & Do Good
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
            Subscribe, enter your golf scores, and get entered into monthly draws with real cash prizes — while a portion of every subscription goes to the charity you choose.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <Link to="/signup" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2a9d7b] text-white px-8 py-4 rounded-full font-bold hover:bg-[#238769] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Your Subscription <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full font-bold bg-white text-slate-800 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm">
              See How It Works
            </a>
          </div>

          <div className="flex items-center gap-10">
            <div>
              <div className="text-2xl font-black text-slate-900">£24K+</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Prizes Awarded</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">£8.2K</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Charity Raised</div>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">1,847</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Active Members</div>
            </div>
          </div>
        </div>

        {/* Hero Mockup */}
        <div className="relative z-10 w-full max-w-xl mx-auto lg:ml-auto mt-8 lg:mt-0">
          <div className="absolute -top-4 -right-4 z-20 bg-[#dc9e38] text-white px-4 py-2 rounded-xl font-bold shadow-lg flex items-center gap-2 transform rotate-3">
            <Trophy size={18}/> £500 Jackpot
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-serif font-bold text-xl">Your Dashboard</h3>
              <div className="px-3 py-1 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] text-xs font-black tracking-wide">Active</div>
            </div>
            
            <div className="mb-8">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Latest Scores</h4>
              <div className="flex items-center justify-between gap-2">
                {[
                  { s: 38, d: 'Mar 12' },
                  { s: 41, d: 'Mar 13' },
                  { s: 35, d: 'Mar 14' },
                  { s: 39, d: 'Mar 15' },
                  { s: 42, d: 'Mar 16' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-3 flex-1 text-center border border-slate-100">
                    <div className="font-extrabold text-xl mb-1 text-slate-900">{item.s}</div>
                    <div className="text-[9px] text-slate-400 font-bold tracking-wide">{item.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">March Draw Numbers</h4>
              <div className="flex items-center justify-between gap-2 mb-3">
                {[
                  { s: 38, match: true },
                  { s: 41, match: true },
                  { s: 35, match: true },
                  { s: 39, match: false },
                  { s: 42, match: false },
                ].map((item, i) => (
                  <div key={i} className={`rounded-full flex-1 aspect-square flex items-center justify-center font-extrabold text-lg text-white shadow-sm transition-all
                    ${item.match ? 'bg-[#2a9d7b] scale-105' : 'bg-slate-200 text-slate-500 opacity-70'}`}>
                    {item.s}
                  </div>
                ))}
              </div>
              <div className="text-xs font-bold text-[#2a9d7b] flex items-center gap-1.5"><span role="img" aria-label="party text-lg">🎉</span> 3-Number Match — You're a winner!</div>
            </div>

            <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-xl p-4 flex items-center justify-between transition-colors hover:bg-[#ffedd5]">
              <div className="flex items-center gap-3">
                <Heart className="text-[#fb923c] fill-[#fb923c]/20" size={20} />
                <div>
                  <div className="font-bold text-sm text-slate-800">Cancer Research UK</div>
                  <div className="text-[11px] text-slate-500 font-medium">£4.20 contributed this month</div>
                </div>
              </div>
              <div className="text-[#fb923c] font-black text-sm">15%</div>
            </div>
          </div>
        </div>
      </header>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="text-[#2a9d7b] text-xs font-bold uppercase tracking-widest mb-4">Simple Process</div>
          <h2 className="text-4xl lg:text-5xl font-serif font-extrabold mb-4 tracking-tight">Three Steps to Play, Win & Give</h2>
          <p className="text-slate-500 text-lg mb-16 font-medium">No complicated rules. Just golf, a little luck, and a lot of heart.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-slate-100 p-10 rounded-3xl text-left bg-white shadow-md hover:shadow-xl hover:border-slate-200 transition-all transform hover:-translate-y-1">
              <div className="flex items-center justify-start gap-4 mb-8">
                <div className="w-14 h-14 bg-[#2a9d7b] rounded-2xl flex items-center justify-center text-white shadow-inner"><CreditCard size={24}/></div>
                <div className="text-5xl font-serif text-slate-200 font-bold ml-auto opacity-70">01</div>
              </div>
              <h3 className="text-2xl font-bold font-serif mb-4 text-slate-800">Subscribe & Choose</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">Pick a monthly or yearly plan. Select the charity you want to support — at least 10% of your fee goes directly to them.</p>
            </div>
            <div className="border border-slate-100 p-10 rounded-3xl text-left bg-white shadow-md hover:shadow-xl hover:border-slate-200 transition-all transform hover:-translate-y-1">
              <div className="flex items-center justify-start gap-4 mb-8">
                <div className="w-14 h-14 bg-[#2a9d7b] rounded-2xl flex items-center justify-center text-white shadow-inner"><Target size={24}/></div>
                <div className="text-5xl font-serif text-slate-200 font-bold ml-auto opacity-70">02</div>
              </div>
              <h3 className="text-2xl font-bold font-serif mb-4 text-slate-800">Enter Your Scores</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">Submit your latest 5 Stableford golf scores. Your most recent scores become your draw numbers each month.</p>
            </div>
            <div className="border border-slate-100 p-10 rounded-3xl text-left bg-white shadow-md hover:shadow-xl hover:border-slate-200 transition-all transform hover:-translate-y-1">
              <div className="flex items-center justify-start gap-4 mb-8">
                <div className="w-14 h-14 bg-[#2a9d7b] rounded-2xl flex items-center justify-center text-white shadow-inner"><Trophy size={24}/></div>
                <div className="text-5xl font-serif text-slate-200 font-bold ml-auto opacity-70">03</div>
              </div>
              <h3 className="text-2xl font-bold font-serif mb-4 text-slate-800">Win & Give Back</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">If your scores match the monthly draw, you win from the prize pool. The more numbers match, the bigger the prize.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section id="prizes" className="py-24 bg-[#fbfcfb]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <div className="text-[#dc9e38] text-xs font-bold uppercase tracking-widest mb-4">Monthly Draws</div>
          <h2 className="text-4xl lg:text-5xl font-serif font-extrabold mb-4 tracking-tight">Real Prizes, Every Month</h2>
          <p className="text-slate-500 text-lg mb-16 font-medium max-w-2xl mx-auto">A portion of every subscription feeds the prize pool. The more members, the bigger the prizes.</p>

          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="bg-[#2a9d7b] text-white p-12 rounded-3xl relative text-left shadow-2xl transform md:scale-105 z-10 border border-[#238769] hover:shadow-3xl transition-shadow">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#dc9e38] text-white px-5 py-1.5 rounded-full text-xs font-black shadow-md tracking-wider uppercase">Jackpot</div>
              <Trophy size={36} className="mb-6 opacity-80" />
              <div className="text-6xl font-black font-serif mb-3">40%</div>
              <div className="font-bold border-b border-white/20 pb-4 mb-4 text-xl">5-Number Match</div>
              <p className="text-sm opacity-90 leading-relaxed font-medium">The jackpot — match all 5 scores. Rolls over monthly if unclaimed.</p>
            </div>
            
            <div className="bg-white p-12 rounded-3xl text-left shadow-md border border-slate-100 hover:shadow-xl transition-shadow">
              <Target size={36} className="mb-6 text-[#2a9d7b]" />
              <div className="text-6xl font-black font-serif mb-3 text-slate-900">35%</div>
              <div className="font-bold border-b border-slate-100 pb-4 mb-4 text-xl text-slate-800">4-Number Match</div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">A strong match earns a generous share of the monthly pool.</p>
            </div>

            <div className="bg-white p-12 rounded-3xl text-left shadow-md border border-slate-100 hover:shadow-xl transition-shadow">
              <Check size={36} className="mb-6 text-[#2a9d7b]" />
              <div className="text-6xl font-black font-serif mb-3 text-slate-900">25%</div>
              <div className="font-bold border-b border-slate-100 pb-4 mb-4 text-xl text-slate-800">3-Number Match</div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Three matching scores still wins. Split equally among all winners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Charities */}
      <section id="charities" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#2a9d7b] text-xs font-bold uppercase tracking-widest mb-4">Charity Impact</div>
            <h2 className="text-4xl lg:text-6xl font-serif font-extrabold mb-6 leading-tight">Every Subscription <br/>Makes a Difference</h2>
            <p className="text-slate-500 text-lg mb-10 font-medium leading-relaxed bg-[#fbfcfb] p-6 rounded-2xl border border-slate-100">Choose a charity at signup. At least 10% of your subscription goes directly to them — and you can increase that amount anytime. You can even make independent donations outside of your subscription.</p>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-[#fbfcfb] border border-slate-100 rounded-3xl p-6 text-center shadow-sm">
                <Heart className="mx-auto text-[#2a9d7b] mb-4 fill-[#2a9d7b]/20" size={28} />
                <div className="text-3xl font-black text-slate-900 mb-1">£8.2K+</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Raised</div>
              </div>
              <div className="bg-[#fbfcfb] border border-slate-100 rounded-3xl p-6 text-center shadow-sm">
                <Users className="mx-auto text-[#2a9d7b] mb-4 fill-[#2a9d7b]/20" size={28} />
                <div className="text-3xl font-black text-slate-900 mb-1">12</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partner Charities</div>
              </div>
              <div className="bg-[#fbfcfb] border border-slate-100 rounded-3xl p-6 text-center shadow-sm">
                <Globe className="mx-auto text-[#2a9d7b] mb-4 fill-[#2a9d7b]/20" size={28} />
                <div className="text-3xl font-black text-slate-900 mb-1">3</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Countries</div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 lg:pl-8">
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Featured Charities</div>
            <div className="space-y-4">
              {[
                {name: 'Cancer Research UK', cat: 'Health', amt: '£2,340'},
                {name: 'Mind', cat: 'Mental Health', amt: '£1,870'},
                {name: 'The Golf Foundation', cat: 'Youth Sport', amt: '£1,560'},
                {name: 'Macmillan Cancer', cat: 'Health', amt: '£1,290'}
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-white border border-slate-100 shadow-sm rounded-3xl cursor-pointer hover:border-[#2a9d7b]/30 hover:shadow-md transition-all transform hover:-translate-y-0.5">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-[#2a9d7b]/10 text-[#2a9d7b] rounded-2xl flex items-center justify-center"><Heart size={24} className="fill-current" /></div>
                    <div>
                      <div className="font-bold text-slate-800 text-lg">{c.name}</div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{c.cat}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-slate-900 text-xl">{c.amt}</div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">raised</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-[#fbfcfb]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <div className="text-[#2a9d7b] text-xs font-bold uppercase tracking-widest mb-4">Choose a Plan</div>
          <h2 className="text-4xl lg:text-5xl font-serif font-extrabold mb-6 tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-slate-500 text-lg mb-16 font-medium max-w-lg mx-auto">Every plan includes monthly draws, charity contributions, and full platform access. Cancel anytime.</p>
          
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto items-stretch">
            {/* Monthly */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-10 text-left shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-[#2a9d7b]/5 transition-colors"></div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">Monthly Member</h3>
                <div className="mb-10 text-slate-900 relative z-10">
                  <span className="text-6xl font-black tracking-tighter">£9.99</span>
                  <span className="text-sm text-slate-400 font-bold uppercase tracking-widest pl-1">/mo</span>
                </div>
                <ul className="space-y-4 mb-12 relative z-10">
                  <li className="flex items-center gap-3 text-slate-600 font-bold text-sm leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] flex items-center justify-center shrink-0"><Check size={12}/></div> 1 Entry to Monthly Draw
                  </li>
                  <li className="flex items-center gap-3 text-slate-600 font-bold text-sm leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] flex items-center justify-center shrink-0"><Check size={12}/></div> Pro Scorecard & Tracking
                  </li>
                  <li className="flex items-center gap-3 text-slate-600 font-bold text-sm leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] flex items-center justify-center shrink-0"><Check size={12}/></div> Verified Charity Impact
                  </li>
                </ul>
              </div>
              <Link to="/signup" className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:bg-slate-800 transform hover:-translate-y-0.5">
                Subscribe Monthly <ChevronRight size={18} />
              </Link>
            </div>
            
            {/* Yearly */}
            <div className="bg-white border-2 border-[#2a9d7b] rounded-[2rem] p-10 text-left shadow-2xl relative flex flex-col justify-between scale-105">
              <div className="absolute top-0 right-0 bg-[#2a9d7b] text-white text-[10px] font-black uppercase tracking-widest py-2 px-6 rounded-bl-2xl z-20">
                Best Value
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Yearly Member</h3>
                <div className="mb-10 text-slate-900">
                  <span className="text-6xl font-black tracking-tighter text-[#2a9d7b]">£99.99</span>
                  <span className="text-sm text-slate-400 font-bold uppercase tracking-widest pl-1">/yr</span>
                </div>
                <ul className="space-y-4 mb-12">
                  <li className="flex items-center gap-3 text-slate-600 font-bold text-sm leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] flex items-center justify-center shrink-0"><Check size={12}/></div> 1 Entry to Monthly Draw
                  </li>
                  <li className="flex items-center gap-3 text-slate-600 font-bold text-sm leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] flex items-center justify-center shrink-0"><Check size={12}/></div> Pro Scorecard & Tracking
                  </li>
                  <li className="flex items-center gap-3 text-slate-600 font-bold text-sm leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] flex items-center justify-center shrink-0"><Check size={12}/></div> Verified Charity Impact
                  </li>
                  <li className="flex items-center gap-3 text-[#2a9d7b] font-black text-sm leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-[#2a9d7b]/20 text-[#2a9d7b] flex items-center justify-center shrink-0"><Check size={12}/></div> Get 2 months FREE
                  </li>
                </ul>
              </div>
              <Link to="/signup" className="w-full flex items-center justify-center gap-2 bg-[#2a9d7b] text-white font-bold py-4 rounded-xl transition-all shadow-xl hover:bg-[#238769] transform hover:-translate-y-0.5">
                Subscribe Yearly <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
