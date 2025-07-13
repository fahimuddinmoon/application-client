"use client";
import Privateroute from '@/componentes/Privateroute';
import { AuthContext } from '@/firebaseAuth/AuthProvider';
import axios from 'axios';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
export default function admissionPage() {
  const { user } = useContext(AuthContext);

  const [colleges, setColleges] = useState([])
  useEffect(() => {
    fetch(`https://college-app-server-beta.vercel.app/college`)
      .then(res => res.json())
      .then(data => setColleges(data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const candidateName = e.target.candidateName.value
    const subject = e.target.subject.value
    const candidateAddress = e.target.candidateAddress.value
    const candidateNumber = e.target.candidateNumber.value
    const candidateEmail = e.target.candidateEmail.value
    const Birth = e.target.Birth.value
    const candidatePhoto = e.target.candidatePhoto.value


    const candidateData =
      { candidateName, subject, candidateAddress, candidateNumber, candidateEmail, candidatePhoto, Birth }

    try {
      const { data } = await axios.post('https://college-app-server-beta.vercel.app/apply', candidateData)
      if (data.insertedId) {
        Swal.fire({
          title: "Apply Successfully!",
          icon: "success",
          draggable: true
        });
        router.push("/myCollege");
      }

    } catch {

    } finally {

    }
  }
  return (
    <Privateroute>
      <div className='min-h-screen'>
        <div className='my-9 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {
            colleges.map((College, index) =>
              <div className="leading-16 rounded-2xl bg-gray-200 my-2" key={College._id}>
                <img className=' w-full h-60 mx-auto rounded-tr-2xl rounded-tl-2xl' src={College.CollegePhoto} alt="" />
                <p className='text-2xl font-bold text-center'>{College.CollegeName}</p>
                <p className='text-sm font-bold text-center'>Location:{College.location}</p>
                <p className='text-sm font-bold text-center'>Deadline:{College.deadline}</p>
                <Link href={`/admission/${College._id}`} className="block ml-44 md:ml-32 lg:ml-44"><button className="text-sm font-bold px-2 text-white py-1 rounded-xl bg-blue-600">Apply</button></Link>
              </div>
            )}
        </div>
      </div>
    </Privateroute>
  )
}
