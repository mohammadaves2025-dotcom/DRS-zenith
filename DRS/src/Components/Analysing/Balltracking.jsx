import React, { useState, useEffect } from "react";
import { Target, Activity, Crosshair } from "lucide-react";

const Balltracking = ({ videoUrl }) => {
const [revealStep, setRevealStep] = useState(0);

// Simulated broadcast delay for dramatic effect
useEffect(() => {
    const step1 = setTimeout(() => setRevealStep(1), 4500);
    const step2 = setTimeout(() => setRevealStep(2), 6000);
    const step3 = setTimeout(() => setRevealStep(3), 7500);

    return () => {
        clearTimeout(step1);
        clearTimeout(step2);
        clearTimeout(step3);
    };
}, []);

const trackingData = [
    {
        label: "PITCHING",
        result: "OUTSIDE OFF",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500",
        icon: <Target size={20} className="text-emerald-500" />
    },
    {
        label: "IMPACT",
        result: "IN LINE",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500",
        icon: <Crosshair size={20} className="text-emerald-500" />
    },
    {
        label: "WICKETS",
        result: "HITTING",
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "border-red-500",
        icon: <Activity size={20} className="text-red-500" />
    },
];

return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans">

        {/* Broadcast Header */}
        <div className="w-full max-w-6xl mb-8 border-b border-slate-800 pb-4 flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-black text-white tracking-widest flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    HAWK-EYE <span className="text-emerald-500">TRACKING</span>
                </h1>
                <p className="text-slate-400 font-mono text-sm mt-1 tracking-wider">
                    LBW PREDICTIVE TRAJECTORY PROTOCOL
                </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded font-mono text-emerald-400 text-sm shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                SYS_SYNC: ACTIVE
            </div>
        </div>

        {/* Main Layout - Using Grid 12 for better proportions with Portrait video */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* LEFT SIDE: Portrait Video Player (Takes up 5 columns) */}
            <div className="lg:col-span-5 bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 shadow-2xl relative flex flex-col justify-center w-full max-w-sm mx-auto">
                <div className="absolute top-6 left-6 z-20 bg-black/80 px-3 py-1 rounded text-xs font-bold text-white tracking-widest border border-slate-700 backdrop-blur-sm">
                    SIMULATED TRAJECTORY
                </div>

                {/* STRICT 9:16 PORTRAIT CONTAINER */}
                <div className="w-full aspect-[9/16] bg-black rounded-xl overflow-hidden relative border border-slate-700 flex items-center justify-center shadow-inner">
                    {videoUrl ? (
                        <video
                            src={videoUrl}
                            autoPlay
                            loop
                            muted
                            /* object-cover perfectly fills the tall portrait box without stretching */
                            className="w-full h-full object-cover opacity-85"
                        />
                    ) : (
                        <p className="text-slate-600 font-mono text-sm tracking-widest z-10 text-center px-4">
                            AWAITING VERTICAL VIDEO FEED...
                        </p>
                    )}

                    {/* Radar Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
                </div>
            </div>

            {/* RIGHT SIDE: Tracking Analysis Checklist (Takes up 7 columns) */}
            <div className="lg:col-span-7 bg-slate-900 border-2 border-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden h-full min-h-[500px]">

                <div className="flex flex-col gap-6 relative z-10 mt-4">
                    {trackingData.map((item, index) => {
                        const visible = revealStep >= index + 1;

                        return (
                            <div
                                key={item.label}
                                className={`border-2 rounded-xl p-6 transition-all duration-700 transform ${visible
                                    ? `${item.border} ${item.bg} opacity-100 translate-x-0`
                                    : "border-slate-800 bg-slate-950 opacity-40 -translate-x-8"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {item.icon}
                                        <span className="text-slate-300 font-black tracking-widest text-xl">
                                            {item.label}
                                        </span>
                                    </div>

                                    {visible ? (
                                        <span className={`font-black text-2xl tracking-widest uppercase ${item.color}`}>
                                            {item.result}
                                        </span>
                                    ) : (
                                        <span className="text-slate-600 font-mono tracking-widest animate-pulse">
                                            PROCESSING...
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* DRAMATIC FINAL DECISION BANNER */}
                <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-center">
                    {revealStep < 3 ? (
                        <span className="text-slate-500 font-mono text-sm animate-pulse tracking-widest py-6">
                            TV UMPIRE REVIEWING TRAJECTORY...
                        </span>
                    ) : (
                        <div className="w-full bg-red-600 border-4 border-red-500 text-white font-black text-6xl tracking-[0.2em] py-6 text-center rounded-xl shadow-[0_0_40px_rgba(220,38,38,0.6)] animate-bounce">
                            OUT
                        </div>
                    )}
                </div>

            </div>
        </div>
    </div>
);
};

export default Balltracking;
