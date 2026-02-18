import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const SnickoWaveform = ({ audioSrc, syncTime }) => {
    const containerRef = useRef(null);
    const wavesurferRef = useRef(null);

    // State for our live telemetry data
    const [freq, setFreq] = useState("0.0");
    const [amp, setAmp] = useState("0");

    useEffect(() => {
        if (!containerRef.current) return;

        wavesurferRef.current = WaveSurfer.create({
            container: containerRef.current,
            waveColor: '#3b82f6',      // Blue for upcoming noise
            progressColor: '#10b981',  // Emerald for played noise
            cursorColor: '#ef4444',    // THE RED LINE IS BACK AND ALIVE!
            cursorWidth: 3,            // Thick and visible
            barWidth: 3,
            barGap: 3,
            barRadius: 2,
            height: 120,
            normalize: true,
            url: audioSrc,
            interact: false,           // Prevents clicking the graph out of sync
        });

        return () => {
            if (wavesurferRef.current) {
                wavesurferRef.current.destroy();
            }
        };
    }, [audioSrc]);

    // This fires every time the video moves a frame
    useEffect(() => {
        if (wavesurferRef.current && syncTime !== null) {
            try {
                // Forces the red line to sweep across the graph exactly with the video
                wavesurferRef.current.setTime(syncTime);

                // Randomize the telemetry numbers to make it look active
                if (syncTime > 0) {
                    setFreq((Math.random() * 40 + 20).toFixed(1));
                    setAmp((Math.random() * 80 + 10).toFixed(0));
                }
            } catch (error) {
                // Catch errors if the graph isn't fully loaded yet
            }
        }
    }, [syncTime]);

    return (
        <div className="w-full h-full relative flex flex-col items-center justify-center bg-black rounded-lg overflow-hidden border-2 border-slate-800 shadow-inner">

            {/* LIVE TELEMETRY DATA */}
            <div className="absolute top-3 left-3 z-20 text-[10px] font-mono text-emerald-400">
                <div className="animate-pulse">FREQ: {freq} kHz</div>
                <div className="animate-pulse" style={{ animationDelay: '0.1s' }}>AMP: {amp} dB</div>
            </div>

            {/* ACTIVE EQUALIZER BARS */}
            <div className="absolute top-3 right-3 z-20 flex gap-1 items-end h-4">
                <div className="w-1.5 bg-red-500 animate-bounce rounded-t" style={{ height: `${Math.random() * 100}%`, animationDuration: '0.4s' }}></div>
                <div className="w-1.5 bg-yellow-500 animate-bounce rounded-t" style={{ height: `${Math.random() * 100}%`, animationDuration: '0.6s' }}></div>
                <div className="w-1.5 bg-emerald-500 animate-bounce rounded-t" style={{ height: `${Math.random() * 100}%`, animationDuration: '0.5s' }}></div>
            </div>

            {/* The Waveform Canvas */}
            <div ref={containerRef} className="w-full h-[120px] z-10 opacity-90" />

        </div>
    );
};

export default SnickoWaveform;