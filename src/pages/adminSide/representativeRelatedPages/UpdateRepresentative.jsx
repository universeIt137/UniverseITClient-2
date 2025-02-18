import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { uploadImg } from '../../../UploadFile/uploadImg';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';

const UpdateRepresentative = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    // Fetch data using React Query
    const { data: content = {}, refetch, isFetching } = useQuery({
        queryKey: ['content', id],
        queryFn: async ({ queryKey }) => {
            const [, userId] = queryKey; // Access the 'id' from queryKey
            const res = await axiosPublic.get(`/users/${userId}`);
            return res.data;
        }
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const name = form.name.value;
        const representativeID = form.representativeID.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const institute = form.institute.value;
        const division = form.division.value;
        const district = form.district.value;
        const semester = form.semester.value;
        const image = form.image.files[0];

        let ImageUrl = content?.ImageUrl;
        if (image) {
            ImageUrl = await uploadImg(image);
        }

        const data = {
            name,
            representativeID,
            phone,
            email,
            institute,
            division,
            district,
            ImageUrl,
            semester,
        };

        try {
            await axiosPublic.put(`/users/${id}`, data);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Data has been updated successfully',
                showConfirmButton: false,
                timer: 1500,
            });
            refetch(); // Refetch the updated data
        } catch (error) {
            console.error('Error updating data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="w-10/12 mx-auto p-4">
                <Helmet>
                    <title>Dashboard | Update Representative</title>
                </Helmet>
                <h2 className="text-2xl font-semibold mb-4">Update Representative Info</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {loading && <p className="text-blue-500">Uploading data...</p>}
                    {isFetching ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    defaultValue={content?.name}
                                    name="name"
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="representativeID">Representative ID</label>
                                <input
                                    type="text"
                                    defaultValue={content?.representative_id}
                                    name="representativeID"
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    defaultValue={content?.phone}
                                    name="phone"
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    defaultValue={content?.email}
                                    name="email"
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="institute">Institute</label>
                                <input
                                    type="text"
                                    defaultValue={content?.institute}
                                    name="institute"
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="division">Division</label>
                                <input
                                    type="text"
                                    defaultValue={content?.division}
                                    name="division"
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="district">District</label>
                                <input
                                    type="text"
                                    defaultValue={content?.district}
                                    name="district"
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="semester">Semester</label>
                                <input
                                    type="text"
                                    defaultValue={content?.semester}
                                    name="semester"
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                            <div className="w-full">
                                <div className="relative">
                                    <p>Upload Picture</p>
                                    <input
                                        type="file"
                                        name="image"
                                        className="file-input file-input-bordered file-input-md w-full"
                                    />
                                </div>
                                {content?.ImageUrl && (
                                    <div className="avatar">
                                        <div className="w-32 rounded">
                                            <p>Already uploaded:</p>
                                            <img src={content?.ImageUrl} alt="Representative" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="w-1/4 mx-auto">
                        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
                            {loading ? 'Uploading...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateRepresentative;
