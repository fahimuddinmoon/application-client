"use client";
import React, { use, useEffect, useState } from 'react'
import { IoTimeSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarEventFill } from "react-icons/bs";
import { MdHomeWork } from "react-icons/md";
import Privateroute from '@/componentes/Privateroute';
export default function page({ params }) {
  const { id } = use(params);
  const [college, setCollege] = useState([])
  useEffect(() => {
    fetch(`http://localhost:5000/college/${id}`)
      .then(res => res.json())
      .then(data => setCollege(data))
  }, [id])

  const { CollegeName, CollegePhoto, ResearchWorkPhoto, SuccessfulStudentsPhoto, deadline, location, researchWork, sportsCategories, eventDetails } = college
  console.log(sportsCategories)
  return (
    <Privateroute>
      <div className='my-7'>
        <div className='grid lg:grid-cols-2 gap-4 my-2 '>
          <div className='p-4  bg-gray-200 rounded-2xl'>
            <h2 className='text-2xl font-bold flex gap-2 items-center py-3'><MdHomeWork />{CollegeName}</h2>
            <img className='w-full h-96' src={CollegePhoto} alt="" />
            <p className='flex gap-2 items-center text-sm font-semibold text-gray-800 py-1 mt-10'><IoTimeSharp />Deadline : {deadline}</p>
            <p className='flex gap-2 items-center text-sm font-semibold text-gray-800 py-1'><FaLocationDot /> Location : {location}</p>
            <p className='flex gap-2 items-center text-sm font-semibold text-gray-800 py-1'><BsCalendarEventFill /> Event Details : {eventDetails}</p>
            <p className='flex gap-2 items-center text-lg font-bold text-gray-800 py-1'>Sports Category : </p>
            {
              Array.isArray(sportsCategories) && sportsCategories.map((category, index) =>
                <li className='text-sm font-semibold text-gray-800 py-1' key={index}>{category}</li>
              )
            }
          </div>
          <div className=''>
            <div className='p-4  bg-gray-200 rounded-2xl'>
              <h2 className='text-xl font-bold text-gray-800 py-2 text-center'>Success Dairy</h2>
              <img className='h-80 w-full rounded-2xl object-cover' src={SuccessfulStudentsPhoto} alt="" />
            </div>
            <div className='p-4  bg-gray-200 text-center rounded-2xl mt-2'>
              <h2 className='text-xl font-bold text-gray-800 py-1 text-center'>Fixed Your Goal</h2>
              <p className='text-sm font-semibold text-gray-800 py-1'>{researchWork}</p>
              <img className='h-80 w-full rounded-2xl object-cover' src={ResearchWorkPhoto} alt="" />
            </div>
          </div>
        </div>

      </div>
    </Privateroute>
  )
}
