import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const ManageBlog = () => {
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: contents = [], refetch, isLoading, isError } = useQuery({
        queryKey: ["allData"],
        queryFn: async () => {
            const res = await axiosPublic.get("/blog");
            return res.data;
        },
    });

    const handleStatusChange = (data) => {
        const id = data?._id;
        const status = !data?.status;
        const newData = { id, status };
        const toastId = toast.loading("Status Changing...");
        axiosPublic
            .put("/blog/status", newData)
            .then(() => {
                toast.success("Status has changed!!", { id: toastId });
                refetch();
            })
            .catch((err) => {
                toast.error(err?.message, { id: toastId });
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won’t be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/blog/${id}`).then(() => {
                    Swal.fire("Deleted!", "Blog data has been deleted.", "success");
                    refetch();
                });
            }
        });
    };

    const filteredBlogs = contents; // Adjust this filter as needed for user-specific blogs
    const haveStatus = filteredBlogs.filter(
        (item) => item.hasOwnProperty("status") || item.status === undefined
    );
    const finalBlogs = searchTerm
        ? haveStatus.filter((rep) =>
            searchTerm === "live"
                ? rep.status === true
                : searchTerm === "under review"
                    ? rep.status === false || rep.status === undefined
                    : false
        )
        : filteredBlogs;

    return (
        <div className="mx-auto w-11/12 my-5">
            <Helmet>
                <title>Dashboard | Manage Blog</title>
            </Helmet>
            <p className="text-2xl font-bold text-center mb-4">Manage Blogs</p>
            <div className="mb-6 flex justify-end">
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
            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : isError ? (
                <p className="text-center text-red-500">Error loading blogs.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Title</th>
                                <th className="px-4 py-2 border">Banner Image</th>
                                <th className="px-4 py-2 border">Author Name</th>
                                <th className="px-4 py-2 border">Author Email</th>
                                <th className="px-4 py-2 border">Preview</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finalBlogs.map((content) => (
                                <tr key={content?._id} className="text-center">
                                    <td className="px-4 py-2 border font-semibold">{content?.title}</td>
                                    <td className="px-4 py-2 border">
                                        <div className="w-12 rounded overflow-hidden">
                                            <img
                                                src={content?.BannerImageUrl}
                                                alt={content?.title || "Blog Banner"}
                                                className="object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 border font-semibold">{content?.author}</td>
                                    <td className="px-4 py-2 border font-semibold">{content?.author_email}</td>
                                    <td className="px-4 py-2 border font-semibold">
                                        <Link to={`/dashboard/previewBlog/${content?._id}`}>Preview</Link>
                                    </td>
                                    <td className="font-bold">
                                        <label className="label cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="toggle toggle-success toggle-sm"
                                                checked={content?.status || false}
                                                onChange={() => handleStatusChange(content)}
                                            />
                                        </label>
                                    </td>
                                    <td className="px-4 py-2 border flex justify-center gap-2">
                                        <Link to={`/dashboard/updateBlog/${content?._id}`}>
                                            <button className="px-2 py-1 bg-blue-500 text-white rounded">
                                                Update
                                            </button>
                                        </Link>
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
            )}
        </div>
    );
};

export default ManageBlog;
