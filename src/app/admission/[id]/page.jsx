"use client";
import axios from 'axios';
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { AuthContext } from '@/firebaseAuth/AuthProvider';
import Privateroute from '@/componentes/Privateroute';
export default function applyPage({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const { user } = useContext(AuthContext);
    const [college, setCollege] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/college/${id}`)
            .then(res => res.json())
            .then(data => setCollege(data))
    }, [id])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const candidateName = e.target.candidateName.value
        const subject = e.target.subject.value
        const candidateAddress = e.target.candidateAddress.value
        const candidateNumber = e.target.candidateNumber.value
        const candidateEmail = e.target.candidateEmail.value
        const Birth = e.target.Birth.value
        const candidatePhoto = e.target.candidatePhoto.value
        const applyCollege = college?.CollegeName
        const location = college?.location


        const candidateData =
            { candidateName, subject, candidateAddress, candidateNumber, candidateEmail, candidatePhoto, Birth, applyCollege, location }
        console.log(candidateData)
        try {
            const { data } = await axios.post('http://localhost:5000/apply', candidateData)
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
            <div className="my-7">
                <h3 className="font-bold text-2xl text-center pt-4">{college?.CollegeName}( Apply Form )</h3>
                {/* apply form */}
                <div className="card bg-base-100  mx-auto my-4  ">
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset p-6 bg-[#EDE8E0]">
                            <label className=" fieldset-label text-sm font-bold text-gray-700">Candidate Name</label>
                            <input type="text" name="candidateName" className="input w-full" required placeholder="Candidate Name" />

                            <label className=" fieldset-label text-sm font-bold text-gray-700">Candidate Subject</label>
                            <input type="text" name="subject" className="input w-full" placeholder=" Candidate Subject" />

                            <label className=" fieldset-label text-sm font-bold text-gray-700">Address</label>
                            <input type="text" name="candidateAddress" className="input w-full" required placeholder="Address" />

                            <label className=" fieldset-label text-sm font-bold text-gray-700">Phone Number</label>
                            <input type="number" name="candidateNumber" className="input w-full" required placeholder="Phone Number" />

                            <label className=" fieldset-label text-sm font-bold text-gray-700">Candidate Email</label>
                            <input type="text" name="candidateEmail" defaultValue={user?.email} disabled className="input w-full" required />

                            <label className=" fieldset-label text-sm font-bold text-gray-700">Date Of Birth</label>
                            <input type="date" name="Birth" className="input w-full" required placeholder="Date Of Birth" />

                            <label className=" fieldset-label text-sm font-bold text-gray-700">Candidate Photo</label>
                            <input type="text" name="candidatePhoto" defaultValue={user?.photoURL} disabled className="file-input file-input-md w-full" />


                            <button className="btn bg-[#ae9c8f] mt-4">Add Task</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </Privateroute>
    )
}
