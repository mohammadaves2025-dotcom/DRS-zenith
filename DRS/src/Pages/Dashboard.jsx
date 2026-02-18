import React, { useState } from "react";
import { Activity, Target, AlertTriangle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DRSPlayer from "../Components/Media/DRSPlayer";
import SnickoWaveform from "../Components/Media/SnickoWaveform";

const Dashboard = ({ videoUrl }) => {
  const navigate = useNavigate();
  const [syncTime, setSyncTime] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 p-6 font-sans flex flex-col">

      {/* HEADER */}
      <header className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-black text-white tracking-widest">
            <span className="text-emerald-500">DRS</span> DIRECTOR
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            LOCAL MATCH REVIEW SYSTEM
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm font-bold text-slate-300">
            REVIEW PENDING
          </span>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-6 flex-1">

        {/* LEFT: MEDIA */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">

          {/* PORTRAIT VIDEO */}
          <div className="flex justify-center">
            <div
              className="
                w-full max-w-sm
                aspect-[9/16]
                bg-black
                rounded-xl
                overflow-hidden
                border border-slate-800
                shadow-[0_0_40px_rgba(0,0,0,0.6)]
              "
            >
              {videoUrl ? (
                <DRSPlayer
                  videoSrc={videoUrl}
                  onTimeUpdate={setSyncTime}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
                  <Target size={40} className="mb-3 opacity-40" />
                  <p className="text-xs tracking-widest font-mono">
                    AWAITING VIDEO FEED
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SNICKO */}
          <div className="h-48 bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-400 tracking-wider flex items-center gap-2">
                <Activity size={14} className="text-blue-400" />
                ULTRA-EDGE TRACKER
              </span>
              <span className="text-xs font-mono text-emerald-500 animate-pulse">
                LIVE AUDIO SYNC
              </span>
            </div>

            <div className="h-full bg-slate-950/50 rounded border border-slate-800/50 flex items-center justify-center overflow-hidden">
              <SnickoWaveform audioSrc={videoUrl} syncTime={syncTime} />
            </div>
          </div>
        </div>

        {/* RIGHT: CONTROLS */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">

          {/* ANALYSIS TOOLS */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h2 className="text-xs font-bold text-slate-400 tracking-[0.2em] mb-6 border-b border-slate-800 pb-3">
              ANALYSIS TOOLS
            </h2>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigate("/balltracking")}
                className="
                        group
                        bg-slate-800/60 hover:bg-slate-700/70
                        border border-slate-700
                        p-4 rounded-xl
                        flex items-center justify-between
                        transition-all
                      "
              >
                <span className="text-slate-200 font-medium">
                  Ball Tracking (LBW)
                </span>
                <Target
                  size={18}
                  className="text-emerald-400 group-hover:scale-110 transition-transform"
                />
              </button>

              <button
              onClick={() => navigate("/ultraedge")}
                className="
                  group
                  bg-slate-800/60 hover:bg-slate-700/70
                  border border-slate-700
                  p-4 rounded-xl
                  flex items-center justify-between
                  transition-all
                "
              >
                <span className="text-slate-200 font-medium">
                  UltraEdge (Snicko)
                </span>
                <Activity
                  size={18}
                  className="text-blue-400 group-hover:scale-110 transition-transform"
                />
              </button>

              <button
              onClick={() => navigate("/pitchmap")}
                className="
                  group
                  bg-slate-800/60 hover:bg-slate-700/70
                  border border-slate-700
                  p-4 rounded-xl
                  flex items-center justify-between
                  transition-all
                "
              >
                <span className="text-slate-200 font-medium">
                  PitchMap 
                </span>
                <Activity
                  size={18}
                  className="text-blue-400 group-hover:scale-110 transition-transform"
                />
              </button>
            </div>
          </div>


          {/* FINAL DECISION */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h2 className="text-xs font-bold text-slate-400 tracking-[0.2em] mb-6 border-b border-slate-800 pb-3">
              FINAL DECISION
            </h2>

            <div className="grid grid-cols-2 gap-4">

              {/* OUT */}
              <button
                className="
                  group
                  bg-gradient-to-br from-red-950/70 to-slate-950
                  border border-red-800/60
                  rounded-2xl p-6
                  flex flex-col items-center justify-center gap-2
                  text-red-500
                  hover:from-red-900 hover:text-white
                  transition-all
                "
              >
                <AlertTriangle
                  size={30}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-black tracking-widest text-lg">
                  OUT
                </span>
              </button>

              {/* NOT OUT */}
              <button
                className="
                  group
                  bg-gradient-to-br from-emerald-950/70 to-slate-950
                  border border-emerald-800/60
                  rounded-2xl p-6
                  flex flex-col items-center justify-center gap-2
                  text-emerald-400
                  hover:from-emerald-900 hover:text-white
                  transition-all
                "
              >
                <CheckCircle
                  size={30}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-black tracking-widest text-lg text-center leading-tight">
                  NOT<br />OUT
                </span>
              </button>

            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;


