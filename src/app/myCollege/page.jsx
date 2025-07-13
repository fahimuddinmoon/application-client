"use client";
import Privateroute from '@/componentes/Privateroute';
import { AuthContext } from '@/firebaseAuth/AuthProvider';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'

export default function myCollegePage() {

  const [Applys, setApply] = useState([])
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch(`http://localhost:5000/applied/${user?.email}`)
      .then(res => res.json())
      .then(data => setApply(data))
  }, [user])
  console.log(Applys)
  return (
    <Privateroute>
      <div className='min-h-screen'>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>

                <th>College Name</th>
                <th>Location</th>
                <th>Subject</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                Applys.map(apply =>
                  <tr key={apply?._id}>
                    <th>{apply?.applyCollege}</th>
                    <td className='font-semibold'>{apply?.location}</td>
                    <td>{apply?.subject}</td>
                    <td><Link className='px-1 py-1  text-sm font-semibold bg-blue-600 rounded-2xl text-white' href={`/myCollege/${apply?._id}`}>Review</Link></td>
                  </tr>
                )
              }

            </tbody>
          </table>
        </div>
      </div>
    </Privateroute>
  )
}
