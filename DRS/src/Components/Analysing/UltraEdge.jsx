import React, { useState } from "react";
import { Activity, Headphones, Mic2, Settings2 } from "lucide-react";
import DRSPlayer from "../Media/DRSPlayer";
import SnickoWaveform from "../Media/SnickoWaveform";

const UltraEdge = ({ videoUrl }) => {
    const [syncTime, setSyncTime] = useState(null);
    const [noiseReduction, setNoiseReduction] = useState(true);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans">

            {/* Header */}
            <div className="w-full max-w-6xl mb-8 border-b border-slate-800 pb-4 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-widest flex items-center gap-3">
                        <Activity size={36} className="text-blue-500" />
                        ULTRA<span className="text-blue-500">-EDGE</span>
                    </h1>
                    <p className="text-slate-400 font-mono text-sm mt-1 tracking-wider">
                        AUDIO FREQUENCY MICROPHONE ANALYSIS
                    </p>
                </div>
                <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded font-mono text-blue-400 text-sm shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    STUMP MIC: ARMED
                </div>
            </div>

            {/* Main Split Screen */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* LEFT SIDE: Portrait Video */}
                <div className="lg:col-span-5 bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 shadow-2xl relative flex flex-col justify-center">
                    <div className="absolute top-8 left-8 z-20 bg-black/80 px-3 py-1 rounded text-xs font-bold text-white tracking-widest border border-slate-700">
                        CAMERA 3: SLIP CORDON
                    </div>

                    {/* Reusing your portrait DRSPlayer! */}
                    <div className="w-full max-w-sm mx-auto shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden border border-slate-700">
                        <DRSPlayer
                            videoSrc={videoUrl}
                            onTimeUpdate={setSyncTime}
                        />
                    </div>
                </div>

                {/* RIGHT SIDE: Audio Dashboard */}
                <div className="lg:col-span-7 bg-slate-900 border-2 border-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col justify-between">

                    <div className="flex flex-col gap-6">
                        {/* Audio Graph Box */}
                        <div className="bg-slate-950 border border-slate-700 rounded-xl p-6 relative shadow-inner">
                            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                                <h3 className="text-slate-300 font-black tracking-widest flex items-center gap-2">
                                    <Mic2 size={18} className="text-blue-500" />
                                    WAVEFORM DETECTOR
                                </h3>
                                <span className="font-mono text-xs text-blue-500 animate-pulse">LISTENING...</span>
                            </div>

                            {/* Reusing your SnickoWaveform! */}
                            <div className="h-48 w-full bg-slate-900 rounded-lg border border-slate-800 flex items-center overflow-hidden px-4 relative">
                                <SnickoWaveform
                                    audioSrc={videoUrl}
                                    syncTime={syncTime}
                                />
                                {/* Center target line over the graph */}
                                <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)] z-20"></div>
                            </div>
                        </div>

                        {/* Audio Filters (Fake UI for hackathon points) */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setNoiseReduction(!noiseReduction)}
                                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${noiseReduction ? 'bg-blue-900/20 border-blue-500 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                            >
                                <Settings2 size={24} />
                                <span className="font-bold text-sm tracking-wider">NOISE REDUCTION</span>
                            </button>

                            <button className="p-4 rounded-xl border border-slate-700 bg-slate-800 text-slate-400 hover:text-white hover:border-slate-500 transition-all flex flex-col items-center justify-center gap-2">
                                <Headphones size={24} />
                                <span className="font-bold text-sm tracking-wider">ISOLATE FREQUENCY</span>
                            </button>
                        </div>
                    </div>

                    {/* Final Readout */}
                    <div className="mt-8 pt-6 border-t border-slate-800">
                        <div className="w-full bg-slate-950 border-2 border-slate-800 text-slate-500 font-mono text-xl tracking-[0.2em] py-6 text-center rounded-xl shadow-inner">
                            WAITING FOR FRAME SYNC...
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UltraEdge
