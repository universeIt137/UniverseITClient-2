import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const RepresentativeDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: profileData = {}, isLoading, isError } = useQuery({
        queryKey: ['profileData', id], // Include 'id' in the queryKey
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${id}`);
            return res.data;
        },
        enabled: !!id, // Only run query if 'id' exists
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading profile data.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="flex flex-col items-center">
                {/* Profile Icon */}
                {
                    profileData.ImageUrl ?
                        <>
                            <div className="avatar">
                                <div className="rounded-full w-32">
                                    <img src={profileData?.ImageUrl} alt="Profile" />
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-4xl font-bold text-blue-500">
                                {profileData.name.charAt(0)}
                            </div>
                        </>
                }

                {/* Name */}
                <h1 className="text-2xl font-semibold mt-4 text-gray-800">{profileData?.name}</h1>
                {/* Representative ID */}
                <p className="text-sm text-gray-500 mt-1">
                    Representative ID: <span className="text-gray-700">{profileData?.representative_id}</span>
                </p>

                <p>
                    {
                        profileData?.representative ?
                            <span className='text-green-600 font-bold'>Active</span>
                            :
                            <span className='text-red-600 font-bold'>Deactive</span>
                    }
                </p>
            </div>

            <div className="mt-6 space-y-4">
                {/* Email */}
                <div className="flex justify-between items-center">
                    <p className="text-gray-600 font-medium">Email:</p>
                    <p className="text-gray-800">{profileData?.email}</p>
                </div>

                {/* Phone */}
                <div className="flex justify-between items-center">
                    <p className="text-gray-600 font-medium">Phone:</p>
                    <p className="text-gray-800">{profileData?.phone || "Not Provided"}</p>
                </div>

                {/* District */}
                <div className="flex justify-between items-center">
                    <p className="text-gray-600 font-medium">District:</p>
                    <p className="text-gray-800">{profileData?.district || "Not Provided"}</p>
                </div>

                {/* Division */}
                <div className="flex justify-between items-center">
                    <p className="text-gray-600 font-medium">Division:</p>
                    <p className="text-gray-800">{profileData?.division || "Not Provided"}</p>
                </div>

                {/* Institute */}
                <div className="flex justify-between items-center">
                    <p className="text-gray-600 font-medium">Institute:</p>
                    <p className="text-gray-800">{profileData?.institute || "Not Provided"}</p>
                </div>

                {/* Semester */}
                <div className="flex justify-between items-center">
                    <p className="text-gray-600 font-medium">Semester:</p>
                    <p className="text-gray-800">{profileData?.semester || "Not Provided"}</p>
                </div>
            </div>
        </div>
    );
};

export default RepresentativeDetails;
