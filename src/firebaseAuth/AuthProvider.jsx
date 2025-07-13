"use client";

import React, { createContext, useEffect, useState } from 'react'
export const AuthContext = createContext(null)
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.config';
import axios from 'axios';
export default function AuthProvider({ children }) {
    const [name, setName] = useState('fahim')
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider()
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const profileUpdate = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setLoading(true)
        signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
            if (currentUser && currentUser?.photoURL) {
                // api Call
                const { data } = await axios.post(`https://college-app-server-beta.vercel.app/users/${currentUser?.email}`, {

                    name: currentUser?.displayName,
                    image: currentUser?.photoURL,
                    email: currentUser?.email,
                   
                })

                setUser(currentUser)
            } else {

                setUser(null)
            }
            setLoading(false)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const apiInfo = {
        user,
        setUser,
        loading,
        googleLogin,
        createUser,
        profileUpdate,
        login,
        logout,
        name
    }
    return (
        <AuthContext.Provider value={apiInfo}>
            {children}
        </AuthContext.Provider>
    )
}
