import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';


const RepresentativeTable = ({ contents, refetch }) => {
    const axiosPublic = useAxiosPublic();



    const handleRepresentativeChange = (data) => {
        const id = data?._id;
        const representative = !data?.representative;
        const newData = { id, representative }
        
        const toastId = toast.loading("User Role Changing...");
        axiosPublic.put('/users/role/representative', newData)
            .then(res => {
                if (res) {
                    toast.success("Role has changed!!", { id: toastId });
                }
                refetch()
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            })

    };


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
                    .delete(`/users/${id}`)
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
            <p className="text-2xl font-bold text-center mb-2">Manage Representatives</p>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Rep. ID</th>
                        <th className="px-4 py-2 border">Blogs</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Permission</th>


                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contents?.map((content, index) => (
                            <tr key={content?._id} className="text-center">
                                <td className="px-4 py-2 border font-semibold">{index + 1}</td>
                                <td className="px-4 py-2 border font-semibold">{content?.name}</td>
                                <td className="px-4 py-2 border font-semibold">{content?.email}</td>
                                <td className="px-4 py-2 border font-semibold">{content?.representative_id}</td>
                                <td className="px-4 py-2 border font-semibold"><Link to={`/dashboard/rep-blogs/${content?.email}`}><button className='btn btn-primary'>Blogs</button></Link></td>
                                <td className="px-4 py-2 border font-semibold">{
                                    content?.representative ?
                                        <span className='text-green-600 font-bold'>Active</span>
                                        :
                                        <span className='text-red-600 font-bold'>Deactive</span>
                                }</td>

                                <td className="font-bold border">
                                    <div className="form-control">
                                        <div className="flex items-center justify-center gap-2">
                                            <label className="label cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-success toggle-sm"
                                                    checked={content?.representative || false}
                                                    onChange={() => handleRepresentativeChange(content)}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </td>



                                <td className="px-4 py-2 border flex">

                                    <button

                                        className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                                    >
                                        <Link to={`/dashboard/details-representative/${content?._id}`}>Profile</Link>
                                    </button>

                                    <button

                                        className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                                    >
                                        <Link to={`/dashboard/update-representative/${content?._id}`}>Update</Link>
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
                </tbody>
            </table>
        </div>
    );
};

export default RepresentativeTable;
