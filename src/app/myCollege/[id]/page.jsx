"use client";
import { AuthContext } from '@/firebaseAuth/AuthProvider';
import axios from 'axios';
import React, { use, useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function page({ params }) {
    const [Applys, setApply] = useState([])
    const { user } = useContext(AuthContext);
    const { id } = use(params)
    useEffect(() => {
        fetch(`http://localhost:5000/apply/${id}`)
            .then(res => res.json())
            .then(data => setApply(data))
    }, [id])
    console.log(Applys)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const review = e.target.review.value
        const reviewData = {
            review,
            college: Applys?.applyCollege,
            email: user?.email,
            photo: user?.photoURL
        }
        try {
            const { data } = await axios.post('http://localhost:5000/reviews', reviewData)
            if (data.insertedId) {
                Swal.fire({
                    title: "Review Posted Successfully!",
                    icon: "success",
                    draggable: true
                });
            }
        } catch {

        }
    }
    return (
        <div className='min-h-screen'>
            <div className='text-center my-6 '>
                <h2 className='text-2xl font-bold '>Share Your Experience</h2>
                <p className='text-sm font-bold text-gray-800'>Let us know what you think about the college. Your honest review helps others make informed decisions.</p>
            </div>
            <div className='pt-7 text-center'>
                <h2 className='text-2xl font-bold'> {Applys?.applyCollege}</h2>
                <p className='text-sm font-bold text-gray-800'>{Applys?.location}</p>
            </div>
            <div className='pt-5 '>
                <form className='' onSubmit={handleSubmit}>
                    <fieldset className="fieldset w-8/12 md:w-6/12 lg:w-3/12 mx-auto">
                        <legend className="fieldset-legend">Share Your Experience</legend>
                        <textarea name='review' className="textarea h-24" placeholder=""></textarea>
                        <button className='px-2 py-2 text-sm font-bold bg-blue-600 text-white rounded-2xl'>Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
