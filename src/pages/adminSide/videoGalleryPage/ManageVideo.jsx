import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../Shared/Loading/Loading";
import { deleteAlert } from "../../../helper/deleteAlert";
import Swal from "sweetalert2";

const ManageVideo = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // Fetch video data
    const { data: videos = [], refetch, isLoading } = useQuery({
        queryKey: ["successStory"],
        queryFn: async () => {
            const res = await axios.get("https://universe-it-server-3s1s.vercel.app/all-video");
            return res.data;
        },
    });

    // Navigate to Edit Page
    const handleEdit = (id) => {
        navigate(`/dashboard/video-update/${id}`);
    };

    // Delete Video
    const handleDelete = async (id) => {


        try {
            const resp = await deleteAlert();
            if (resp.isConfirmed) {
                const res = await axios.delete(`https://universe-it-server-3s1s.vercel.app/video-delete/${id}`);
                if (res) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Video delete successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    return;
                }
            }
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto p-4">
            <Helmet>
                <title>Dashboard | Video Gallery Page</title>
            </Helmet>
            <h2 className="text-2xl font-semibold mb-4 text-center">Video Management</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Title</th>
                            <th className="py-2 px-4 border">YouTube Link</th>
                            <th className="py-2 px-4 border">Video</th>
                            <th className="py-2 px-4 border">Banner Image</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video) => (
                            <tr key={video._id} className="text-center border-b">
                                <td className="py-2 px-4 border">{video.name}</td>
                                <td className="py-2 px-4 border">{video.title}</td>
                                <td className="py-2 px-4 border">
                                    <a
                                        href={video.youtube_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        Watch Video
                                    </a>
                                </td>
                                <td className="py-2 px-4 border">
                                    <video src={video.video} controls className="w-20 h-14 mx-auto" />
                                </td>
                                <td className="py-2 px-4 border">
                                    <img src={video.banner_img} alt="Banner" className="w-16 h-10 mx-auto rounded" />
                                </td>
                                <td className="py-2 px-4 border space-x-2">
                                    <button
                                        onClick={() => handleEdit(video._id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(video._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageVideo;
