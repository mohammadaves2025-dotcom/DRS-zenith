import React from "react";
import { Map, MapPin } from "lucide-react";

const PitchMap = () => {
    // Mock data for where the balls landed (X is horizontal, Y is vertical from batsman)
    const deliveries = [
        { id: 1, type: "Good Length", x: "48%", y: "60%", color: "bg-blue-500" },
        { id: 2, type: "Short", x: "55%", y: "40%", color: "bg-red-500" },
        { id: 3, type: "Yorker", x: "50%", y: "87%", color: "bg-yellow-500" },
        { id: 4, type: "Full", x: "42%", y: "75%", color: "bg-emerald-500" },
        { id: 5, type: "Good Length", x: "52%", y: "65%", color: "bg-blue-500" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans">

            <div className="w-full max-w-4xl mb-8 border-b border-slate-800 pb-4 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-widest flex items-center gap-3">
                        <Map size={36} className="text-purple-500" />
                        PITCH <span className="text-purple-500">MAP</span>
                    </h1>
                    <p className="text-slate-400 font-mono text-sm mt-1 tracking-wider">
                        DELIVERY DISPERSION ANALYSIS
                    </p>
                </div>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 2D PITCH VISUALIZATION */}
                <div className="lg:col-span-2 bg-emerald-900/20 border border-emerald-900 rounded-2xl p-8 flex justify-center items-center relative overflow-hidden">

                    {/* The Pitch Background */}
                    <div className="w-48 h-[500px] bg-[#d2b48c] border-2 border-[#8b4513] relative shadow-2xl">

                        {/* Batting Crease (Bottom) */}
                        <div className="absolute bottom-12 left-0 right-0 h-[2px] bg-white"></div>
                        <div className="absolute bottom-12 left-8 h-16 w-[2px] bg-white"></div>
                        <div className="absolute bottom-12 right-8 h-16 w-[2px] bg-white"></div>
                        {/* Batting Stumps */}
                        <div className="absolute bottom-[44px] left-1/2 -translate-x-1/2 flex gap-1">
                            <div className="w-1 h-3 bg-white"></div>
                            <div className="w-1 h-3 bg-white"></div>
                            <div className="w-1 h-3 bg-white"></div>
                        </div>

                        {/* Bowling Crease (Top) */}
                        <div className="absolute top-12 left-0 right-0 h-[2px] bg-white"></div>
                        <div className="absolute top-0 left-8 h-12 w-[2px] bg-white"></div>
                        <div className="absolute top-0 right-8 h-12 w-[2px] bg-white"></div>
                        {/* Bowling Stumps */}
                        <div className="absolute top-[44px] left-1/2 -translate-x-1/2 flex gap-1">
                            <div className="w-1 h-3 bg-white"></div>
                            <div className="w-1 h-3 bg-white"></div>
                            <div className="w-1 h-3 bg-white"></div>
                        </div>

                        {/* Plotting the deliveries */}
                        {deliveries.map((ball) => (
                            <div
                                key={ball.id}
                                className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.5)] ${ball.color} transform -translate-x-1/2 -translate-y-1/2`}
                                style={{ left: ball.x, top: ball.y }}
                            >
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-black bg-white/80 px-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                                    {ball.type}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>

                {/* LEGEND & STATS */}
                <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col">
                    <h3 className="text-white font-black tracking-widest border-b border-slate-800 pb-4 mb-4">DELIVERY LEGEND</h3>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-blue-500 border border-white"></div>
                                <span className="text-slate-300 font-bold">Good Length</span>
                            </div>
                            <span className="text-slate-500 font-mono">2 Balls</span>
                        </div>

                        <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-red-500 border border-white"></div>
                                <span className="text-slate-300 font-bold">Short</span>
                            </div>
                            <span className="text-slate-500 font-mono">1 Ball</span>
                        </div>

                        <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-emerald-500 border border-white"></div>
                                <span className="text-slate-300 font-bold">Full</span>
                            </div>
                            <span className="text-slate-500 font-mono">1 Ball</span>
                        </div>

                        <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full bg-yellow-500 border border-white"></div>
                                <span className="text-slate-300 font-bold">Yorker</span>
                            </div>
                            <span className="text-slate-500 font-mono">1 Ball</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PitchMap;
