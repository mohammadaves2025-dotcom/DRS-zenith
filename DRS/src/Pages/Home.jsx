import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Activity, Target } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Background Tech Grid (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center text-center max-w-3xl">
        
        {/* Pulsing Status Badge */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-4 py-2 rounded-full mb-8">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-mono text-slate-300 tracking-widest">SYSTEM ONLINE // SECURE CONNECTION</span>
        </div>

        {/* Massive Hero Title */}
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            DRS
          </span> DIRECTOR
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl tracking-widest font-mono mb-12">
          LOCAL MATCH PREDICTIVE TRAJECTORY & AUDIO ANALYSIS
        </p>

        {/* Feature Icons */}
        <div className="flex gap-8 mb-12 text-slate-500">
          <div className="flex flex-col items-center gap-2">
            <Target size={32} className="text-emerald-500/50" />
            <span className="text-xs font-bold tracking-widest">HAWK-EYE</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Activity size={32} className="text-blue-500/50" />
            <span className="text-xs font-bold tracking-widest">ULTRA-EDGE</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck size={32} className="text-purple-500/50" />
            <span className="text-xs font-bold tracking-widest">SECURE DATA</span>
          </div>
        </div>

        {/* Enter Button */}
        <button 
          onClick={() => navigate('/login')}
          className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xl tracking-widest rounded-xl transition-all shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] active:scale-95 flex items-center gap-3"
        >
          INITIALIZE PROTOCOL
          <Activity className="group-hover:animate-pulse" />
        </button>

      </div>
    </div>
  );
};

export default Home;