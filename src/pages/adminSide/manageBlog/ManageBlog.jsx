import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const ManageBlog = () => {
    const axiosPublic = useAxiosPublic();


    const { data: contents = [], refetch } = useQuery({
        queryKey: ['allData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blog');
            return res.data;
        }
    })


    const handleStatusChange = (data) => {
        const id = data?._id;
        const status = !data?.status;
        const newData = { id, status }
        const toastId = toast.loading("Status Changing...");
        axiosPublic.put('/blog/status', newData)
            .then(res => {
                if (res) {
                    toast.success("Status has changed!!", { id: toastId });
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
                    .delete(`/blog/${id}`)
                    .then((res) => {
                        if (res) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Blog data has been deleted.',
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

    window.scrollTo(0, 0);


    return (
        <div className="mx-auto w-11/12 my-5">
            <p className="text-2xl font-bold text-center mb-2">Manage Blogs</p>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Banner Image</th>
                        <th className="px-4 py-2 border">Author Name</th>
                        <th className="px-4 py-2 border">Author Email</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contents && contents?.map((content) => (
                            <tr key={content?._id} className="text-center">
                                <td className="px-4 py-2 border font-semibold">{content?.title}</td>
                                <td className="px-4 py-2 border">
                                    <div className="avatar">
                                        <div className="w-12 rounded">

                                            <img src={content?.BannerImageUrl} />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-2 border font-semibold">{content?.author}</td>

                                <td className="px-4 py-2 border font-semibold">{content?.author_email}</td>

                                <td className="font-bold">
                                    <div className="form-control">
                                        <div className="flex items-center gap-2 justify-center">
                                            <label className="label cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-success toggle-sm"
                                                    checked={content?.status || false}
                                                    onChange={() => handleStatusChange(content)}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-4 py-2 border flex justify-center  ">
                                    <button

                                        className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                                    >
                                        <Link to={`/dashboard/update-csr/${content?._id}`}>Update</Link>
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

export default ManageBlog;
