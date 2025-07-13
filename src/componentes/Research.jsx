"use client";
import React from 'react'

export default function Research({ college }) {
    return (
        <div className='mt-14'>
            <div className='my-5 text-center'>
                <h2 className='text-2xl font-bold '>Tech & Research Highlights</h2>
                <p className='text-sm font-bold text-gray-700'>A glimpse into the innovative minds of students shaping the future through groundbreaking research and technology.</p>
            </div>
            <div className='my-9 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    college.map((singleCollege, index) =>
                        <div className='leading-16 rounded-2xl bg-gray-200 my-2' key={singleCollege._id}>
                            <img className='w-full h-60 mx-auto rounded-tr-2xl rounded-tl-2xl' src={singleCollege.ResearchWorkPhoto} alt="" />
                            <div className='p-3'>
                                <p className='text-2xl font-bold '>{singleCollege.CollegeName}</p>
                                <p className='text-sm font-bold '>{singleCollege.researchWork}</p>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}
