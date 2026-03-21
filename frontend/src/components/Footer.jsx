import { Heart, Instagram, Twitter, Facebook, ArrowUpRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0a0c0b] text-white pt-20 pb-10 px-6 lg:px-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2a9d7b]/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#2a9d7b] text-white w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg ring-1 ring-white/20">G</div>
              <span className="font-extrabold text-2xl tracking-tight font-serif">GolfGive</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
              The ethical golf platform combining sport, impact, and real rewards. Join thousands of golfers winning big while doing good.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#2a9d7b] hover:border-[#2a9d7b] transition-all group">
                <Instagram size={18} className="text-slate-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#2a9d7b] hover:border-[#2a9d7b] transition-all group">
                <Twitter size={18} className="text-slate-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#2a9d7b] hover:border-[#2a9d7b] transition-all group">
                <Facebook size={18} className="text-slate-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] text-[#2a9d7b] mb-8">Platform</h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-400">
              <li><Link to="/dashboard" className="hover:text-white transition-colors flex items-center gap-2 group">Dashboard <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
              <li><Link to="/draws" className="hover:text-white transition-colors flex items-center gap-2 group">Monthly Draws <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors flex items-center gap-2 group">My Impact <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
              <li><Link to="/subscribe" className="hover:text-white transition-colors flex items-center gap-2 group">Membership <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/></Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] text-[#2a9d7b] mb-8">Resources</h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Charity Partners</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter/CTA */}
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-serif font-bold text-xl mb-3">Newsletter</h4>
              <p className="text-xs text-slate-400 mb-6 font-medium leading-relaxed">Get the latest draw results and impact reports delivered to your inbox.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:border-[#2a9d7b] outline-none transition-all flex-1"
                />
                <button className="bg-[#2a9d7b] hover:bg-[#238769] text-white p-2 rounded-xl transition-all shadow-lg">
                  <Globe size={16} />
                </button>
              </div>
            </div>
            {/* Hover Decor */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#2a9d7b]/10 rounded-full blur-2xl group-hover:bg-[#2a9d7b]/20 transition-all"></div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#2a9d7b] animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Online</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
               <Heart size={14} className="text-[#2a9d7b] fill-[#2a9d7b]/20" />
               <span className="text-[11px] font-bold italic">£14,250 donated this year</span>
            </div>
          </div>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">
            © {currentYear} GolfGive Platform. Designed for the Game.
          </p>
        </div>
      </div>
    </footer>
  );
}
