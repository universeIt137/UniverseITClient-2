import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';


const GenerationTable = ({ allData, refetch }) => {
    const axiosPublic = useAxiosPublic();




    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic
                    .delete(`/certificate-generate/${id}`)
                    .then((res) => {
                        if (res) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Data has been deleted.',
                                icon: 'success',
                            });
                            refetch();
                        }

                    })
                    .catch((err) => {
                        console.log(err);

                    });
            }
        });
    };


    return (
        <div className="overflow-x-auto w-11/12 mx-auto my-5">
            <p className="text-2xl font-bold text-center mb-2">Manage Certificate</p>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Course Name</th>
                        <th className="px-4 py-2 border">Year</th>
                        <th className="px-4 py-2 border">Date_of_issue</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                {
                    allData ? <tbody>
                        {
                            allData?.map((content, index) => (
                                <tr key={content?._id} className="text-center">
                                    <td className="px-4 py-2 border font-semibold">{index + 1}</td>
                                    <td className="px-4 py-2 border font-semibold">{content?.name}</td>
                                    <td className="px-4 py-2 border font-semibold">{content?.course_name}</td>
                                    <td className="px-4 py-2 border font-semibold">{content?.year}</td>
                                    <td className="px-4 py-2 border font-semibold">{content?.date_of_issue}</td>

                                    <td className="px-4 py-2 border">
                                        <button

                                            className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                                        >
                                            <Link to={`/dashboard/update-generation/${content?._id}`}>Update</Link>
                                        </button>

                                        <button

                                            className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                                        >
                                            <Link to={`/dashboard/generate-certificate/${content?._id}`}>Generate</Link>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(content?._id)}
                                            className="px-2 py-1 bg-red-500 text-white rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody> : <></>
                }
            </table>
        </div>
    );
};

export default GenerationTable;
