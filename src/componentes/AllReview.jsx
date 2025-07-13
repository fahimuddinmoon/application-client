"use client";
import React, { useEffect, useState } from 'react'
export default function AllReview() {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch(`https://college-app-server-beta.vercel.app/reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <div className='my-4'>
            <div className='text-center my-10'>
                <h2 className='text-2xl font-bold '>What Students Are Saying</h2>
                <p className='text-sm font-bold text-gray-800'>Read real reviews from students and discover their experiences, insights, and feedback about the college.</p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3'>
                {
                    reviews.map((review, index) =>
                        <div className='leading-16 rounded-2xl bg-gray-200 py-7 my-2' key={review._id}>

                            <div className='pb-5'>
                                <p className='text-sm font-bold text-center'>{review.college}</p>
                                <p className='text-2xl font-bold  text-center'>" {review.review} "</p>
                            </div>
                            <img className='w-12 h-12 object-cover mx-auto border rounded-full hover:border-2' src={review?.photo} alt="" />
                            <p className='text-sm font-bold text-center'>{review?.email}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
