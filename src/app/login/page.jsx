"use client";
import { AuthContext } from '@/firebaseAuth/AuthProvider';
import Link from 'next/link';
import React from 'react'
import { useContext } from "react";

import Swal from "sweetalert2";
export default function loginPage() {
    const { login } = useContext(AuthContext)
    
    const handleSubmit = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value


        login(email, password)
            .then(result => {

                Swal.fire({
                    title: "Login SuccessFully!",
                    icon: "success",
                    draggable: true
                });
              

            }).catch((error) => {

                Swal.fire({
                    title: "Something Else . Please Try Again!",
                    icon: "error",
                    draggable: true
                });
            });
    }
    return (
        <div className="w-10/12 mx-auto pt-16 lg:pt-24 text-black min-h-screen">
            <h4 className="text-2xl font-bold text-center my-6">Login</h4>
            <div className="card w-8/12 mx-auto my-16 shrink-0 ">
                <form onSubmit={handleSubmit}>
                    <fieldset className="fieldset">
                        <label className=" fieldset-label">Email</label>
                        <input required type="email" name="email" className="input w-full" placeholder="Email" />
                        <label className=" fieldset-label">Password</label>
                        <input required type="password" name="password" className="input w-full" placeholder="Password" />
                        <button className="btn btn-primary mt-4">Login</button>
                    </fieldset>
                </form>
                <div className="text-center text-black">
                    You Have No Account Please<Link className="text-lg font-bold text-red-700" href='/register'> Register </Link>
                </div>
            </div>


        </div>
    )
}
