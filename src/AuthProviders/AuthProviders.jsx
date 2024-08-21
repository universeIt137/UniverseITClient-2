// import React from 'react';

import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import auth from "../firebase/firebase.init";
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'


export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
    const axiosPublic = useAxiosPublic()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refetchUser, setRefetchUser] = useState(0)
    // const axiosPublic = useAxiosPublic();

    const createUser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }
    const loginUser = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const provider = new GoogleAuthProvider();
    const googleLogIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            // if (currentUser) {
            //     const userInfo = { email: currentUser?.email }
            //     axiosPublic.post('/jwt', userInfo)
            //         .then(res => {
            //             if (res?.data) {
            //                 localStorage.setItem('token', res?.data?.token)
            //             }
            //         })
            // }
            // else {
            //     localStorage.removeItem('token')
            // }
            setLoading(false);
        })
        return () => {
            return unsubscribe()
        }
    }, [axiosPublic, refetchUser]) 
    const authInfo = { user, loading, createUser, loginUser, logOut, googleLogIn, refetchUser, setRefetchUser };


    return (
        <AuthContext.Provider value={authInfo}> 
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;