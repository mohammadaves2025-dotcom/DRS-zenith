import { createContext, useEffect } from "react";
import axios from 'axios'
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const DrsContext = createContext();

const DrsContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState(null);

    const navigate = useNavigate(DrsContext);

    useEffect(() => {
        try {
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
            }
        } catch (e) {
            console.warn("Storage access blocked");
        }
    }, []);

    const value = {
        token, setToken, backendUrl
    };


    return (
        <DrsContext.Provider value={value}>
            {props.children}
        </DrsContext.Provider>
    )
}

export default DrsContextProvider; 
