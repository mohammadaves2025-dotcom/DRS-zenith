import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ChevronRight, Fingerprint, Mail, ShieldAlert } from 'lucide-react';
import axios from 'axios'
import { DrsContext } from '../Context/DrsContext';
import toast from 'react-hot-toast';

const Login = () => {
    const { backendUrl, setToken, token } = useContext(DrsContext);

    const navigate = useNavigate();
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [officailId, setOfficailId] = useState('')

    const [isLoginMode, setIsLoginMode] = useState(true); // Toggles between Login & Register

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (isLoginMode === false) {

                setIsAuthenticating(true);
                const response = await axios.post(backendUrl + '/api/user/register', { officailId, email, password });
                console.log(response);
                if (response.data.success) {

                    toast.success('Signup successful! Logging you in...');
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);

                    // Fake a loading delay for dramatic effect before going to Upload
                    navigate('/upload');

                } else {
                    toast.error(response.data.message)
                }




            } else {

                setIsAuthenticating(true);
                const response = await axios.post(backendUrl + '/api/user/login', { email, password });
                console.log(response);
                if (response.data.success) {

                    toast.success('Logging you in...');
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);

                    // Fake a loading delay for dramatic effect before going to Upload
                    navigate('/upload');

                } else {
                    toast.error(response.data.message)
                }





            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);

        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans relative">

            <div className="w-full max-w-md bg-slate-900 border-2 border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10 overflow-hidden transition-all duration-500">

                {/* Animated Top Border Line */}
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 w-full"></div>

                <div className="flex flex-col items-center mb-8">
                    <div className="bg-slate-950 p-4 rounded-full border border-slate-800 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                        {isLoginMode ? (
                            <Fingerprint size={40} className="text-emerald-500" />
                        ) : (
                            <ShieldAlert size={40} className="text-blue-500" />
                        )}
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-widest text-center">
                        {isLoginMode ? "TV UMPIRE LOGIN" : "OFFICIAL REGISTRATION"}
                    </h2>
                    <p className="text-slate-500 text-sm font-mono mt-1 tracking-wider">
                        {isLoginMode ? "AUTHORIZATION REQUIRED" : "REQUEST SYSTEM ACCESS"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* ONLY SHOW IN REGISTER MODE: Email Input */}
                    {!isLoginMode && (

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User size={18} className="text-slate-500" />
                            </div>
                            <input
                                onChange={(e) => setOfficailId(e.target.value)}
                                type="text"
                                required
                                value={officailId}
                                placeholder="OFFICIAL ID"
                                className={`w-full bg-slate-950 border border-slate-700 text-white text-sm font-mono tracking-widest rounded-lg focus:ring-2 block pl-12 p-4 transition-all outline-none ${isLoginMode ? 'focus:ring-emerald-500 focus:border-emerald-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                            />
                        </div>
                    )}

                    <div className="relative animate-fade-in-down">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail size={18} className="text-slate-500" />
                        </div>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                            value={email}
                            placeholder="OFFICIAL EMAIL"
                            className="w-full bg-slate-950 border border-slate-700 text-white text-sm font-mono tracking-widest rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block pl-12 p-4 transition-all outline-none"
                        />
                    </div>

                    {/* Passcode Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={18} className="text-slate-500" />
                        </div>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                            placeholder="SECURE PASSCODE"
                            value={password}
                            className={`w-full bg-slate-950 border border-slate-700 text-white text-sm font-mono tracking-widest rounded-lg focus:ring-2 block pl-12 p-4 transition-all outline-none ${isLoginMode ? 'focus:ring-emerald-500 focus:border-emerald-500' : 'focus:ring-blue-500 focus:border-blue-500'}`}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isAuthenticating}
                        className={`mt-4 w-full flex items-center justify-center gap-2 p-4 rounded-lg font-black tracking-widest transition-all
          ${isAuthenticating
                                ? "bg-slate-800 text-slate-500 border border-slate-700"
                                : isLoginMode
                                    ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                                    : "bg-blue-500 hover:bg-blue-400 text-slate-950 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                            }`}
                    >
                        {isAuthenticating ? (
                            <span className="animate-pulse">
                                {isLoginMode ? "VERIFYING CREDENTIALS..." : "REGISTERING OFFICIAL..."}
                            </span>
                        ) : (
                            <>
                                {isLoginMode ? "AUTHENTICATE" : "REQUEST ACCESS"}
                                <ChevronRight size={20} />
                            </>
                        )}
                    </button>

                </form>

                {/* TOGGLE BUTTON: Switch between Login and Register */}
                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                    <p className="text-slate-500 text-sm font-mono">
                        {isLoginMode ? "NO CLEARANCE?" : "ALREADY REGISTERED?"}
                    </p>
                    <button
                        onClick={() => setIsLoginMode(!isLoginMode)}
                        className={`mt-2 font-bold tracking-widest text-sm transition-colors ${isLoginMode ? 'text-blue-400 hover:text-blue-300' : 'text-emerald-400 hover:text-emerald-300'}`}
                    >
                        {isLoginMode ? "REGISTER NEW OFFICIAL" : "RETURN TO LOGIN"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Login;

