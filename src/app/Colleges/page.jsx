"use client";
import Privateroute from '@/componentes/Privateroute';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
export default function collegePage() {
  const [colleges, setColleges] = useState([])
  useEffect(() => {
    fetch(`https://college-app-server-beta.vercel.app/college`)
      .then(res => res.json())
      .then(data => setColleges(data))
  }, [])
  return (
    <Privateroute>
      <div className='my-14 min-h-screen'>
       
        <div className='my-9 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {
            colleges.map((College, index) =>
              <div className="leading-16 rounded-2xl bg-gray-200 my-2" key={College._id}>
                <img className=' w-full h-60 mx-auto rounded-tr-2xl rounded-tl-2xl' src={College.CollegePhoto} alt="" />
                <p className='text-2xl font-bold text-center'>{College.CollegeName}</p>
                <p className='text-sm font-bold text-center'>Location:{College.location}</p>
                <Link className="block ml-44 md:ml-32 lg:ml-44" href={`/Colleges/${College._id}`}><button className="text-sm font-bold px-2 py-1 rounded-xl bg-blue-600">Details</button></Link>
              </div>
            )}
        </div>
      </div>
    </Privateroute>
  )
}
