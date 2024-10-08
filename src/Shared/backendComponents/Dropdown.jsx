/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { MdAddCircle, MdArrowDropDown } from 'react-icons/md';
import NavigationItem from './NavigationItem';
import { SiNginxproxymanager } from 'react-icons/si';

const Dropdown = ({ buttonText, urls, openBox, setOpenBox, id }) => {

    const handleOpen = () => {
        if (openBox === id) {
            setOpenBox(null);
        } else {
            setOpenBox(id)
        }
    }
    const isOpen = openBox === id ? true : false
    return (

        <>
            <div className="w-full relative">
                <button
                    onClick={handleOpen}
                    className={`bg-white flex items-center justify-between  px-4 py-2 rounded-md w-full text-left`}
                >
                    {buttonText}
                    <p className={` transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}><MdArrowDropDown /></p>
                </button>

                <div className={`transition-all duration-300 mt-2 ml-4 bg-primary/50 border rounded-lg w-full z-10 overflow-hidden ${isOpen ? 'scale-y-100' : 'scale-y-0 absolute'} origin-top `}>
                    {urls}
                </div>
            </div>
        </>
    );
};

export default Dropdown;