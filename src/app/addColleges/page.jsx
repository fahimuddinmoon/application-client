"use client";
import Privateroute from '@/componentes/Privateroute';
import { imageUpload } from '@/imageUpload/upload';
import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2';

export default function addCollegesPage() {
    const handleKeyDown = (e) => {
        if (e.key === ' ') {
            e.preventDefault()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const CollegeName = e.target.CollegeName.value
        const location = e.target.location.value
        const deadline = e.target.deadline.value
        const eventDetails = e.target.eventDetails.value
        const researchWork = e.target.researchWork.value
        const keySkill = e.target.sportsCategories.value
        const array = keySkill.split(',')
        const sportsCategories = array.map(word => word.charAt(0).toUpperCase() + word.slice(1))

        const image = e.target.CollegePhoto.files[0]
        const CollegePhoto = await imageUpload(image)
        const images = e.target.ResearchWorkPhoto.files[0]
        const ResearchWorkPhoto = await imageUpload(images)
        const imagess = e.target.SuccessfulStudentsPhoto.files[0]
        const SuccessfulStudentsPhoto = await imageUpload(imagess)

        const collegeData =
            { CollegeName, location, CollegePhoto, eventDetails, researchWork, sportsCategories, deadline, ResearchWorkPhoto, SuccessfulStudentsPhoto }
        try {
            const { data } = await axios.post('http://localhost:5000/college', collegeData)
            if (data.insertedId) {
                Swal.fire({
                    title: "College Added Successfully!",
                    icon: "success",
                    draggable: true
                });
            }

        } catch {

        } finally {

        }
    }
    return (
        <Privateroute>
            <div>
                <h3 className="text-center mt-20 text-3xl font-bold my-8">Added New Job</h3>
                <div className="sm:w-10/12 mx-auto sm:p-12 bg-[#ae9c8f] rounded-tl-full rounded-br-full ">
                    <div className="card bg-base-100 lg:w-8/12 mx-auto my-4  ">
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset p-6 bg-[#EDE8E0]">
                                <label className=" fieldset-label text-sm font-bold text-gray-700">College Name</label>
                                <input type="text" name="CollegeName" className="input w-full" required placeholder="Title" />

                                <label className=" fieldset-label text-sm font-bold text-gray-700">College Photo</label>
                                <input type="file" name="CollegePhoto" className="file-input file-input-md w-full" />

                                <label className=" fieldset-label text-sm font-bold text-gray-700">Location</label>
                                <input type="text" name="location" className="input w-full" required placeholder="Location" />

                                <label className=" fieldset-label text-sm font-bold text-gray-700">Deadline</label>
                                <input type="date" name="deadline" className="input w-full" required placeholder="Deadline" />

                                <label className=" fieldset-label text-sm font-bold text-gray-700">sports Categories</label>
                                <input type="text" name="sportsCategories" onKeyDown={handleKeyDown} className="input w-full" required placeholder="sports Categories" />

                                <label className=" fieldset-label text-sm font-bold text-gray-700">Event Details</label>
                                <input type="text" name="eventDetails" className="input w-full" required placeholder="Event Details" />

                                <label className=" fieldset-label text-sm font-bold text-gray-700">Research work</label>
                                <input type="text" name="researchWork" className="input w-full" required placeholder="Research work" />

                                <label className=" fieldset-label text-sm font-bold text-gray-700">Research Work Photo</label>
                                <input type="file" name="ResearchWorkPhoto" className="file-input file-input-md w-full" />

                                <label className=" fieldset-label text-sm font-bold text-gray-700">Successful students Photo</label>
                                <input type="file" name="SuccessfulStudentsPhoto" className="file-input file-input-md w-full" />


                                <button className="btn bg-[#ae9c8f] mt-4">Add Task</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </Privateroute>
    )
}
