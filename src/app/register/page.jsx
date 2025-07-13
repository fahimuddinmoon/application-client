"use client";

import { AuthContext } from '@/firebaseAuth/AuthProvider'
import { imageUpload } from '@/imageUpload/upload';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';
export default function registerPage() {
    const { googleLogin, createUser, profileUpdate, logout } = useContext(AuthContext)
    const router = useRouter();
    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogin()
        } catch {

        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const image = e.target.image.files[0]
        const photoUrl = await imageUpload(image)

        try {
            await createUser(email, password)
            await profileUpdate({ displayName: name, photoURL: photoUrl });
            Swal.fire({
                title: "Account Created SuccessFully!",
                icon: "success",
                draggable: true
            });
            logout()
            router.push("/login");
        } catch (error) {
            Swal.fire({
                title: "Registration Failed!",
                text: error.message || "Unknown error occurred",
                icon: "error"
            });
        }
    }
    return (
        <div className="min-h-screen w-10/12 mx-auto pt-16 lg:pt-24 text-black mb-7">
            <h4 className="text-2xl font-bold text-center my-6">Register</h4>
            <div className="card  w-8/12 mx-auto my-16 shrink-0 ">
                <form onSubmit={handleSubmit}>
                    <fieldset className="fieldset">
                        <label className=" fieldset-label">User Name</label>
                        <input required type="text" placeholder="User Name" name="name" className="input w-full" />
                        <label className=" fieldset-label">Email</label>
                        <input required type="email" name="email" className="input w-full" placeholder="Email" />
                        <label className=" fieldset-label">Password</label>
                        <input required type="password" name="password" className="input w-full" placeholder="Password" />
                        <label className=" fieldset-label">Image</label>
                        <input required type="file" placeholder="Photo" name="image" accept="image/*" />

                        <button className="btn btn-primary mt-4">Login</button>
                    </fieldset>
                </form>
                <div className="items-center">
                    <button onClick={handleGoogleLogin} className="justify-center items-center flex gap-3 mx-auto bg-slate-200 rounded-full mt-4 text-lg font-bold px-3 py-2 text-black"> Sign Up With Google <span className="text-2xl"><FcGoogle /></span></button>

                </div>
            </div>


        </div>
    )
}
