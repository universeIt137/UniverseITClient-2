import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MdOutlineStreetview } from 'react-icons/md';
import { SiNordicsemiconductor } from 'react-icons/si';
import useAuth from '../../../hooks/useAuth';

const Dashboard = () => {
    const { user } = useAuth();
    console.log(user);
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div className="max-w-[100vw] overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-3">
                    <div className="bg-white rounded-md p-6 shadow-md">
                        <h3 className="text-lg font-bold mb-4">Welcome back, {user?.displayName} </h3>
                        <div className="text-8xl h-48 flex justify-center items-center">
                            <MdOutlineStreetview />
                        </div>
                        <div className="flex items-center mt-4">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                    </div>
                  
                    
                </div>

            </div>




        </>
    );
};

export default Dashboard;
