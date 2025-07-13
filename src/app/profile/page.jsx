"use client";
import Privateroute from '@/componentes/Privateroute'
import { AuthContext } from '@/firebaseAuth/AuthProvider';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

export default function profilePage() {

  const { user } = useContext(AuthContext);
  const [users, setUser] = useState({})
  useEffect(() => {
    fetch(`https://college-app-server-beta.vercel.app/users/${user?.email}`)
      .then(res => res.json())
      .then(data => setUser(data))
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target.Name.value
    const email = e.target.email.value
    const university = e.target.university.value
    const address = e.target.address.value
    const updateData = { name, email, university, address }
    try {
      const { data } = await axios.put(`https://college-app-server-beta.vercel.app/update/${user?.email}`, updateData)
      mutate()
      console.log(data)
      // if (data.insertedId) {
      //   Swal.fire({
      //     title: "profile Successfully!",
      //     icon: "success",
      //     draggable: true
      //   });
      // }
    } catch {

    }
  }
  return (
    <Privateroute>
      <div className='min-h-screen mt-16'>
        <div className='flex justify-between items-center'>
          

          <div>
            <img className='w-24 h-24 object-cover rounded-full' src={users?.image} alt="" />
            <p>User Name : {users?.name}</p>
            <p>User Email : {users?.email}</p>
            {
              users?.college && (
                <div>{users?.college}</div>
              )
            }
            {
              users?.address && (
                <div>{users?.address}</div>
              )
            }

          </div>

          <div className="card bg-base-100 lg:w-8/12 mx-auto my-4  ">
          <h2 className='text-2xl font-bold text-center pb-5'>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset p-6 bg-[#EDE8E0]">

                <label className=" fieldset-label text-sm font-bold text-gray-700">Name</label>
                <input type="text" name="Name" className="input w-full" required placeholder="Name" />

                <label className=" fieldset-label text-sm font-bold text-gray-700">Location</label>
                <input type="email" name="email" className="input w-full" required placeholder="Email" />

                <label className=" fieldset-label text-sm font-bold text-gray-700">University</label>
                <input type="text" name="university"  className="input w-full" required placeholder="University" />

                <label className=" fieldset-label text-sm font-bold text-gray-700">Address</label>
                <input type="text" name="address" className="input w-full" required placeholder="Address" />

                <button className="btn bg-[#ae9c8f] mt-4">Save </button>
              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </Privateroute>
  )
}
