import React, { useRef, useState } from 'react';

import { Play, Pause, ChevronLeft, ChevronRight, Gauge } from 'lucide-react';



const DRSPlayer = ({ videoSrc, onTimeUpdate }) => {

  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [speed, setSpeed] = useState(1);



  const FPS = 30;

  const FRAME_TIME = 1 / FPS;



  const togglePlay = () => {

    if (videoRef.current) {

      if (videoRef.current.paused) {

        videoRef.current.play();

        setIsPlaying(true);

      } else {

        videoRef.current.pause();

        setIsPlaying(false);

      }

    }

  };



  const stepFrame = (direction) => {

    if (videoRef.current) {

      if (!videoRef.current.paused) {

        videoRef.current.pause();

        setIsPlaying(false);

      }

      videoRef.current.currentTime += (direction * FRAME_TIME);



      if (onTimeUpdate) onTimeUpdate(videoRef.current.currentTime);

    }

  };



  const cycleSpeed = () => {

    if (!videoRef.current) return;

    const newSpeed = speed === 1 ? 0.5 : speed === 0.5 ? 0.25 : 1;

    videoRef.current.playbackRate = newSpeed;

    setSpeed(newSpeed);

  };



  return (

    <div className="flex flex-col items-center w-full h-full bg-slate-900 rounded-xl">



      {/* PORTRAIT Video Display (9:16 Aspect Ratio) */}

      <div className="relative w-full aspect-[9/16] bg-black overflow-hidden flex items-center justify-center rounded-t-xl border-b border-slate-800">

        <video

          ref={videoRef}

          src={videoSrc}

          className="w-full h-full object-cover opacity-90"

          onEnded={() => setIsPlaying(false)}

          onTimeUpdate={(e) => onTimeUpdate && onTimeUpdate(e.target.currentTime)}

        />



        {speed !== 1 && (

          <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]">

            SUPER SLOMO {speed}x

          </div>

        )}

      </div>



      {/* Control Panel */}

      <div className="flex items-center justify-between w-full bg-slate-950 p-4">

        <button onClick={() => stepFrame(-1)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded transition-colors border border-slate-700">

          <ChevronLeft size={18} />

          <span className="text-xs font-bold tracking-wider">-1 FRAME</span>

        </button>



        <button onClick={togglePlay} className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 p-3 rounded-full transition-transform active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.4)]">

          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}

        </button>



        <button onClick={() => stepFrame(1)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded transition-colors border border-slate-700">

          <span className="text-xs font-bold tracking-wider">+1 FRAME</span>

          <ChevronRight size={18} />

        </button>

      </div>



      <div className="w-full flex justify-end px-4 pb-3 bg-slate-950 rounded-b-xl">

        <button onClick={cycleSpeed} className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors">

          <Gauge size={14} />

          <span className="text-xs font-mono">SPEED: {speed}x</span>

        </button>

      </div>



    </div>

  );

};



export default DRSPlayer;

