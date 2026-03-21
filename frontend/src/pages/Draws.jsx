import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trophy, Calendar, Target, ChevronRight, ArrowLeft, Check, Timer, History, Award, Play } from 'lucide-react';

export default function Draws() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(() => JSON.parse(localStorage.getItem('userInfo')) || null);
  const [scores, setScores] = useState(() => JSON.parse(localStorage.getItem('cachedScores')) || []);
  const [activeDraw, setActiveDraw] = useState(() => JSON.parse(localStorage.getItem('cachedActiveDraw')) || null);
  const [pastResults, setPastResults] = useState(() => JSON.parse(localStorage.getItem('cachedPastResults')) || []);
  const [myWins, setMyWins] = useState(() => JSON.parse(localStorage.getItem('cachedMyWins')) || []);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isLoading, setIsLoading] = useState(!localStorage.getItem('cachedActiveDraw'));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user) {
      navigate('/login');
    } else {
      setUserInfo(user);
      fetchScores();
      fetchDraws();
      fetchMyWins();
    }
  }, [navigate]);

  const fetchMyWins = async () => {
    try {
      const { data } = await axios.get('/api/winners/my-wins');
      setMyWins(data);
      localStorage.setItem('cachedMyWins', JSON.stringify(data));
    } catch (err) {
      console.error('Error fetching wins', err);
    }
  };

  const handleRunDraw = async () => {
    try {
      setIsSimulating(true);
      await axios.post('/api/draws/run', { 
        monthYear: 'March 2026',
        mode: 'Published' 
      });
      alert('Draw Completed! Results updated.');
      fetchDraws();
      fetchMyWins();
    } catch (err) {
      alert('Error running draw. Ensure 5 scores are entered.');
    } finally {
      setIsSimulating(false);
    }
  };

  const fetchDraws = async () => {
    try {
      const { data } = await axios.get('/api/draws');
      // Set the latest Simulated/Active draw as the top card
      let active = data.find(d => d.monthYear === 'March 2026');
      if (!active && data.length > 0) active = data[0];
      setActiveDraw(active);
      localStorage.setItem('cachedActiveDraw', JSON.stringify(active));
      // Set Published draws as past results (limit to most recent 5)
      const past = data.filter(d => d.status === 'Published').slice(0, 5);
      setPastResults(past);
      localStorage.setItem('cachedPastResults', JSON.stringify(past));
    } catch (err) {
      console.error('Error fetching draws', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchScores = async () => {
    try {
      const { data } = await axios.get('/api/scores');
      setScores(data);
    } catch (err) {
      console.error('Error fetching scores', err);
    }
  };

  if (!userInfo) return null;

  const currentWin = myWins.find(w => w.draw?._id === activeDraw?._id);

  return (
    <div className="min-h-screen bg-[#fbfcfb] font-sans pb-20">
      {/* Header */}
      <nav className="bg-white border-b border-slate-100 py-4 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="bg-[#2a9d7b] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">G</div>
          <span className="font-extrabold text-xl tracking-tight font-serif text-slate-900">GolfGive</span>
        </div>
        
        <div className="hidden md:flex items-center justify-center gap-8 text-sm font-bold text-slate-500 absolute left-1/2 -translate-x-1/2 w-max">
          <button onClick={() => navigate('/dashboard')} className="hover:text-slate-900 transition-colors">Dashboard</button>
          <button className="text-[#2a9d7b] transition-colors">Draws & Results</button>
          <button onClick={() => navigate('/profile', { state: { activeTab: 'charity' } })} className="hover:text-slate-900 transition-colors">My Impact</button>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
            <Award size={20} />
          </button>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-6 pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a9d7b]/10 text-[#2a9d7b] text-xs font-black uppercase tracking-widest mb-4">
              <Timer size={14} /> Next Draw: {activeDraw?.monthYear || 'Loading...'}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tight">Monthly Prize <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2a9d7b] to-[#dc9e38]">Draws</span></h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleRunDraw}
              disabled={isSimulating}
              className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isSimulating ? 'Processing...' : <><Play size={14}/> Run Simulation</>}
            </button>
            <div className="text-right hidden sm:block">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Live Jackpot</div>
              <div className="text-2xl font-black text-slate-900 leading-none">£{activeDraw?.prizePoolTotal?.toFixed(2) || '0.00'}</div>
            </div>
            <div className="w-12 h-12 bg-[#2a9d7b] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#2a9d7b]/20"><Trophy size={24} /></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Winner Toast/Banner */}
            {currentWin && (
              <div className="bg-gradient-to-r from-amber-400 to-[#dc9e38] p-6 rounded-[2rem] shadow-xl text-white flex items-center justify-between border border-amber-300/30 animate-bounce-subtle">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><Trophy size={24}/></div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight">Congratulations! You Won!</h3>
                    <p className="text-xs font-bold opacity-90">Your numbers matched {currentWin.matchTier} scores in this draw!</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black tracking-tighter">£{currentWin.payoutAmount?.toFixed(2)}</div>
                  <div className="text-[10px] uppercase font-black tracking-widest opacity-80">Payout Pending</div>
                </div>
              </div>
            )}

            {/* Active Draw Card */}
            {activeDraw ? (
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#2a9d7b]/5 rounded-full -mr-32 -mt-32 group-hover:bg-[#2a9d7b]/10 transition-all duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Current Active Draw</h2>
                      <p className="text-slate-500 font-medium text-sm">Your most recent 5 scores have been automatically entered.</p>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-[#2a9d7b] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#2a9d7b]/20">Active</div>
                  </div>

                  <div className="bg-slate-50 rounded-3xl p-8 mb-10 border border-slate-100">
                    <div className="flex justify-between items-end mb-6">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Entry Numbers ({activeDraw.monthYear})</h4>
                      <div className="text-2xl font-black text-[#2a9d7b] tracking-tighter italic">Jackpot: £{activeDraw.prizePoolTotal.toFixed(2)}</div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className={`flex-1 aspect-square rounded-2xl flex items-center justify-center text-2xl font-black shadow-sm transition-all cursor-default
                          ${scores[i] ? 'bg-white border-2 border-[#2a9d7b] text-slate-900 shadow-md' : 'bg-slate-100 border border-slate-200 text-slate-300'}`}>
                          {scores[i] ? scores[i].points : '—'}
                        </div>
                      ))}
                    </div>
                    {scores.length < 5 && (
                      <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mt-4 text-center">You need {5 - scores.length} more round(s) to qualify for this draw.</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#fff7ed] text-[#fb923c] rounded-xl flex items-center justify-center shrink-0"><Check size={18}/></div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Status</div>
                        <div className="font-bold text-slate-900 text-sm">{scores.length >= 5 ? 'Entry Verified' : 'Pending Rounds'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#e0f2fe] text-[#0ea5e9] rounded-xl flex items-center justify-center shrink-0"><Timer size={18}/></div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Ends In</div>
                        <div className="font-bold text-slate-900 text-sm">10 Days, 4 Hours</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#f0fdf4] text-[#22c55e] rounded-xl flex items-center justify-center shrink-0"><Award size={18}/></div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Min. Match</div>
                        <div className="font-bold text-slate-900 text-sm">3 Numbers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 font-bold bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                Loading current draw information...
              </div>
            )}

            {/* Past Results Section */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight font-serif text-slate-900 flex items-center gap-3"><History className="text-[#2a9d7b]" /> Past Results</h2>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{pastResults.length} Months Archive</span>
            </div>

            <div className="space-y-4">
              {pastResults.length === 0 ? (
                <div className="text-center py-12 text-slate-400 font-medium bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  No historical data available yet.
                </div>
              ) : (
                pastResults.map((result, idx) => (
                  <div key={idx} className="group p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-xl hover:border-[#2a9d7b]/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Winning Numbers • {result.monthYear}</span>
                        <div className="flex gap-2.5 mt-2">
                          {result.winningNumbers.map((num, i) => (
                            <div key={i} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-black text-slate-600 shadow-sm group-hover:border-[#2a9d7b] group-hover:text-[#2a9d7b] transition-colors">{num}</div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Total Prize</p>
                          <p className="text-2xl font-black text-slate-900 tracking-tighter">£{result.prizePoolTotal.toFixed(2)}</p>
                        </div>
                        <ChevronRight className="text-slate-300 group-hover:text-[#2a9d7b] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden group">
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#2a9d7b]/20 rounded-full blur-3xl group-hover:bg-[#2a9d7b]/30 transition-all"></div>
               <h3 className="text-xl font-serif font-bold mb-6 relative z-10">How Prizes Work</h3>
               <div className="space-y-6 relative z-10">
                 <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-[#2a9d7b] shrink-0 border border-white/10">1</div>
                   <p className="text-xs text-slate-400 font-medium leading-relaxed">Every member contributes to the monthly prize pool through their subscription fee.</p>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-[#2a9d7b] shrink-0 border border-white/10">2</div>
                   <p className="text-xs text-slate-400 font-medium leading-relaxed">On the last day of each month, a random 5-number sequence (Stableford scores 30-45) is drawn.</p>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-[#2a9d7b] shrink-0 border border-white/10">3</div>
                   <p className="text-xs text-slate-400 font-medium leading-relaxed">If 3 or more of your numbers match the draw (in any order), you win a share of the jackpot!</p>
                 </div>
               </div>
               
               <div className="mt-10 pt-10 border-t border-white/5 relative z-10">
                 <div className="flex items-center gap-3">
                    <Award className="text-[#2a9d7b]" size={20} />
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 leading-none">Your Rank</div>
                      <div className="font-bold text-white text-sm">Amateur Golfer</div>
                    </div>
                 </div>
               </div>
            </div>

            <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2rem] text-center">
               <Target className="mx-auto text-slate-300 mb-4" size={32} />
               <h3 className="font-serif font-bold text-slate-600 mb-2">Want better odds?</h3>
               <p className="text-xs text-slate-400 font-medium mb-6">Upgrade to a Yearly membership to get access to exclusive bonus draws.</p>
               <button onClick={() => navigate('/profile', { state: { activeTab: 'subscription' } })} className="w-full py-3 bg-white border border-slate-200 text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-50 transition-all shadow-sm">View Membership &rarr;</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
