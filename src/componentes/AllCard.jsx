"use client";

import Link from "next/link";

import React, { useEffect, useState } from 'react'

export default function AllCard() {
    const [colleges, setColleges] = useState([])
    const [search, setSearch] = useState('')

          useEffect(() => {
             fetch(`http://localhost:5000/college?search=${search}`)
                 .then(res => res.json())
                 .then(data => setColleges(data))
         }, [search])
    return (
        <div className='my-14'>
            <div className="">
                <label className="input input-bordered flex mx-auto my-2 items-center gap-2 bg-[#EDE8E0] shadow-sm text-black">
                    <input onChange={e => setSearch(e.target.value)} type="text" className="sm:w-96 " placeholder="Search By College Name" />
                    <button className="text-sm font-bold bg-[#A59488] text-black hover:text-white px-2 py-1 rounded-sm">search</button>
                </label>
            </div>
            <div className='my-9 sm:grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    colleges.map((College, index) =>
                        <div  className="leading-16 rounded-2xl bg-gray-200 my-2" key={College._id}>
                            <img className=' w-full h-60 mx-auto rounded-tr-2xl rounded-tl-2xl' src={College.CollegePhoto} alt="" />
                            <p className='text-2xl font-bold text-center'>{College.CollegeName}</p>
                            <p className='text-sm font-bold text-center'>Location:{College.location}</p>
                            <Link className="block ml-44 md:ml-32 lg:ml-44" href={`/Colleges/${College._id}`}><button className="text-sm font-bold px-2 py-1 rounded-xl bg-blue-600">Details</button></Link>
                        </div>
                    )}
            </div>
        </div>
    )
}
