"use client";
import { AuthContext } from '@/firebaseAuth/AuthProvider';
import Link from 'next/link'
import React, { useContext } from 'react'
export default function Navber() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="navbar ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="lg:hidden pr-3 lg:pr-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <Link className='text-sm font-bold text-gray-800' href='/'><li>Home</li></Link>
                        <Link className='text-sm font-bold text-gray-800' href='/Colleges'><li>Colleges</li></Link>
                        <Link className='text-sm font-bold text-gray-800' href='/admission'><li>Admission</li></Link>
                        <Link className='text-sm font-bold text-gray-800' href='/myCollege'><li>My College</li></Link>
                        <Link className='text-sm font-bold text-gray-800' href='/addColleges'><li>Add Colleges</li></Link>
                    
                    </ul>
                </div>
                <a className="sm:text-2xl font-bold" >Admission Hub</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-12">
                    <Link className='text-sm font-bold text-gray-800' href='/'><li>Home</li></Link>
                    <Link className='text-sm font-bold text-gray-800' href='/Colleges'><li>Colleges</li></Link>
                    <Link className='text-sm font-bold text-gray-800' href='/admission'><li>Admission</li></Link>
                    <Link className='text-sm font-bold text-gray-800' href='/myCollege'><li>My College</li></Link>
                    <Link className='text-sm font-bold text-gray-800' href='/addColleges'><li>Add Colleges</li></Link>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img

                                        referrerPolicy='noreferrer'
                                        title={user?.displayName}
                                        alt=""
                                        src={user?.photoURL} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li> <Link className='text-sm font-bold text-gray-800' href='/profile'>Profile</Link></li>
                                <li className='text-sm font-bold text-gray-800' onClick={logout}><p>log Out</p></li>


                            </ul>
                        </div> :
                        <Link  href='/login' className="btn  text-sm font-bold text-gray-600">login</Link>
                }
            </div>
        </div>
    )
}
