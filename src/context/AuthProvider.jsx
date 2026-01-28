"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const googleProvider = new GoogleAuthProvider();

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // --- EMERGENCY BACKDOOR START ---
                // Forces your specific email to be Admin immediately
                if (currentUser.email === "usbayazidhasan@gmail.com") {
                    setUser({ ...currentUser, role: 'admin' });
                    setLoading(false);
                    return; 
                }
                // --- EMERGENCY BACKDOOR END ---

                try {
                    // Try to fetch role from server
                    const res = await axiosPublic.get(`/users/${currentUser.email}`);
                    if (res.data) {
                        setUser({ ...currentUser, role: res.data.role });
                    } else {
                        setUser(currentUser);
                    }
                } catch (error) {
                    console.log("Server role check failed, logging in as normal user.");
                    setUser(currentUser); 
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, [axiosPublic]);

    return (
        <AuthContext.Provider value={{ user, loading, googleLogin, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);