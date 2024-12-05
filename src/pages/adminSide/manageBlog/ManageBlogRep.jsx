import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useState } from "react";
import { Link } from "react-router-dom";

const ManageBlogRep = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: contents = [], refetch } = useQuery({
        queryKey: ['allData'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blog');
            return res.data;
        }
    });

    const filteredBlogs = contents?.filter(item => item.author_email === user?.email);

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
                axiosPublic.delete(`/blog/${id}`)
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

    const [searchTerm, setSearchTerm] = useState('');

    // Filter blogs with a 'status' property or assume 'false' for missing status
    const haveStatus = filteredBlogs?.filter(item => item.hasOwnProperty('status') || item.status === undefined);

    // Filter based on dropdown selection
    const finalBlogs = searchTerm
        ? haveStatus.filter(rep => {
            if (searchTerm === 'live') {
                return rep.status === true; // Only true values for 'live'
            } else if (searchTerm === 'under review') {
                return rep.status === false || rep.status === undefined; // False or missing for 'under review'
            }
            return false;
        })
        : filteredBlogs;

    return (
        <div className="mx-auto w-11/12 my-5">
            <p className="text-2xl font-bold text-center mb-2">Manage Blogs</p>

            {/* Dropdown for Status Filter */}
            <div className="mb-4 flex justify-end mr-12 mt-10">
                <select
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring focus:ring-blue-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                >
                    <option value="">Filter by Status</option>
                    <option value="live">Live</option>
                    <option value="under review">Under Review</option>
                </select>
            </div>

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Banner Image</th>
                        <th className="px-4 py-2 border">Author Name</th>
                        <th className="px-4 py-2 border">Author Email</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Preview</th>
                    </tr>
                </thead>
                <tbody>
                    {finalBlogs.map((content) => (
                        <tr key={content?._id} className="text-center">
                            <td className="px-4 py-2 border font-semibold">{content?.title}</td>
                            <td className="px-4 py-2 border">
                                <div className="avatar">
                                    <div className="w-12 rounded">
                                        <img src={content?.BannerImageUrl} alt="Banner" />
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-2 border font-semibold">{content?.author}</td>
                            <td className="px-4 py-2 border font-semibold">{content?.author_email}</td>
                            <td className="font-bold">
                                {content?.status ? (
                                    <span className="text-green-600 font-bold">Live</span>
                                ) : (
                                    <span className="text-red-600 font-bold">Under Review</span>
                                )}
                            </td>
                            <td className="px-4 py-2 border font-semibold">
                                <Link className="text-blue-600" to={`/dashboard/previewBlog/${content?._id}`}>
                                    Preview
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBlogRep;

