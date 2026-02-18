import React, { useState, useContext } from "react";
import { UploadCloud, Video, ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DrsContext } from '../Context/DrsContext';
import axios from "axios";
import { toast } from "react-hot-toast";

const Upload = ({ onVideoSelect }) => {

    const navigate = useNavigate();
    const { backendUrl, token } = useContext(DrsContext);

    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("video/")) {
            setFile(selectedFile);
        } else {
            toast.error("Please upload a valid video file (MP4, MOV, AVI)");
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append('video', file);

        try {
            const endpoint = `${backendUrl}/api/video/upload`; 
            console.log("🚀 Sending to:", endpoint);

            const response = await axios.post(
                endpoint,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // 'Authorization': `Bearer ${token}` 
                    }
                }
            );

            if (response.data.message === 'Upload successful') {
                console.log("✅ SERVER SUCCESS:", response.data);
                toast.success("Video uploaded successfully!");

                const videoUrl = response.data.localUrl || URL.createObjectURL(file);

                if (onVideoSelect) {
                    onVideoSelect(videoUrl);
                }

                navigate('/dashboard');
            }
        } catch (error) {
            console.error("❌ UPLOAD ERROR:", error);
            const errorMsg = error.response?.data?.message || "Connection failed. Check backend console.";
            toast.error(errorMsg);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col gap-y-10 bg-slate-950 flex items-center justify-center p-6">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-4 py-2 rounded-full mb-8">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-mono text-slate-300 tracking-widest">SYSTEM ONLINE // SECURE CONNECTION</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    DRS
                </span> DIRECTOR
            </h1>
            <div className="w-full max-w-lg bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-800">

                <h1 className="text-3xl font-bold text-white text-center mb-2">
                    DRS Video Upload
                </h1>
                <p className="text-slate-400 text-center mb-8">
                    Upload a cricket delivery video for decision review
                </p>

                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition hover:bg-slate-800/50">
                    <UploadCloud className="w-12 h-12 text-blue-500 mb-3" />
                    <span className="text-slate-300 text-sm">
                        Click to upload or drag & drop
                    </span>
                    <span className="text-slate-500 text-xs mt-1">
                        MP4, MOV, AVI supported
                    </span>

                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                {file && (
                    <div className="flex items-center gap-3 mt-5 p-3 bg-slate-800 rounded-lg animate-fade-in-down">
                        <Video className="text-green-400" />
                        <span className="text-slate-200 text-sm truncate">
                            {file.name}
                        </span>
                    </div>
                )}

                <button
                    onClick={handleAnalyze}
                    disabled={!file || isUploading}
                    className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition
                        ${!file 
                            ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                            : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 active:scale-95"
                        }`}
                >
                    {isUploading ? (
                        <>
                            <Loader2 className="animate-spin" />
                            Transmitting...
                        </>
                    ) : (
                        <>
                            Analyze Video
                            <ChevronRight />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Upload;
