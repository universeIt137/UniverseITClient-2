import React, { useState } from 'react'
import { uploadVideo } from '../../../UploadFile/uploadVideo';
import { uploadImg } from '../../../UploadFile/uploadImg';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { uploadAlert } from '../../../helper/uploadAlert';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const UploadVideo = () => {
    const [loading,setLoading] = useState(false)
    const axiosPublic = useAxiosPublic();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const title = e.target.title.value;
        const youtube_link = e.target.youtube_link.value;
        const video = e.target.video.files[0];
        const banner_img = e.target.banner_img.files[0];
        let videoUrl = "";
        if (!video?.name) {
            videoUrl = "";
        }
        videoUrl = await uploadVideo(video);

        let imgUrl = ""

        if (!banner_img?.name) {
            imgUrl = ""
        }

        imgUrl = await uploadImg(banner_img);

        const payload = {
            name, title, youtube_link, video: videoUrl, banner_img: imgUrl
        };

        try {
            let resp = await uploadAlert();
            if (resp.isConfirmed) {
                setLoading(true)
                let res = await axiosPublic.post("https://universe-it-server-3s1s.vercel.app/video-upload", payload);
                setLoading(false)
                if (res) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    e.target.reset();
                    return;
                }
            }
        } catch (error) {
            setLoading(false)
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Video Upload Fail",
                showConfirmButton: false,
                timer: 1500
            });
        }

    }
    return (
        <div className='my-6' >
            <Helmet>
                <title>Dashboard | Video Upload </title>
            </Helmet>
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Upload Video & Details</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter name"
                            required
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter title"
                            required
                        />
                    </div>

                    {/* YouTube Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
                        <input
                            type="url"
                            name="youtube_link"
                            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter YouTube link"
                        />
                    </div>

                    {/* Video Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Video</label>
                        <input
                            type="file"
                            name="video"
                            accept="video/*"
                            className="mt-1 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Banner Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Banner Image</label>
                        <input
                            type="file"
                            name="banner_img"
                            accept="image/*"
                            className="mt-1 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold"
                    >
                        {
                            loading ? "Loading..." : "Submit"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UploadVideo
