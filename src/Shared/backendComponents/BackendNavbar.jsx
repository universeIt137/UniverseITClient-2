import React, { useState } from 'react';
import { FaRegBell } from 'react-icons/fa';
import { FaRegCircleUser } from 'react-icons/fa6';
import { IoSettingsOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Fade as Hamburger } from 'hamburger-react'
import Sidebar from './Sidebar';
import logo from '../../assets/logo/mainLogo.png'
import useAuth from '../../hooks/useAuth';
const BackendNavbar = () => {
    const [isOpen, setOpenMenu] = useState(false)
    const { user } = useAuth();
    // console.log(user);
    return (
        <>
            <div className="flex items-center bg-white justify-between  p-5 ">
                <h2 className="text-2xl font-bold hidden lg:block">Universe IT Institute</h2>
               <Link to={'/'}> <img className='max-w-28 block lg:hidden' src={logo} alt="" /></Link>
                <div className="flex items-center flex-wrap gap-2">
                
                    <Link className='flex' >{ user?.displayName }<FaRegCircleUser className='ml-5 text-2xl' /></Link>

                    <div className='z-20 block lg:hidden'>
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="">
                                <Hamburger toggled={isOpen} toggle={setOpenMenu} size={23} duration={0.6} />
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label onClick={() => setOpenMenu(false)} htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <Sidebar/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BackendNavbar;