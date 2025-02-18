import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';
import { uploadImg } from '../../../UploadFile/uploadImg';
import { uploadVideo } from '../../../UploadFile/uploadVideo';
import { updateAlert } from '../../../helper/updateAlert';
import Swal from 'sweetalert2';

const VideoUpdate = () => {
    const { id } = useParams();
    const { data: singleVideo = [], refetch, isLoading } = useQuery({
        queryKey: ['successStory',id],
        queryFn: async () => {
            const res = await axios.get(`https://universe-it-server-3s1s.vercel.app/single-video/${id}`);
            console.log(res.data)
            return res.data;
        }
    });
    const { video: videoUrl } = singleVideo;
    const { banner_img: imgUrl } = singleVideo;

    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const title = e.target.title.value;
        const youtube_link = e.target.youtube_link.value;
        const video = e.target.video.files[0];
        const banner_img = e.target.banner_img.files[0];

        let updateVideoUrl = videoUrl;
        if (video?.name) {
            updateVideoUrl = videoUrl;
        } else {
            updateVideoUrl = await uploadVideo(video);
        }

        let updateImgUrl = imgUrl

        if (!banner_img?.name) {
            updateImgUrl = imgUrl
        }
        updateImgUrl = await uploadImg(banner_img);

        const payload = {
            name, title, youtube_link, video: updateVideoUrl, banner_img: updateImgUrl
        };

        try {
            let resp = await updateAlert();
            if (resp.isConfirmed) {
                setLoading(true);
                let res = await axios.put(`https://universe-it-server-3s1s.vercel.app/video-update/${id}`,payload);
                setLoading(false);
                if (res) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Update successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    return;
                }
            }
        } catch (error) {
            setLoading(false)
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Update fail",
                showConfirmButton: false,
                timer: 1500
              });
        }




    };
    if (isLoading) {
        return (
            <Loading></Loading>
        )
    }
    return (
        <div>
            <div className='my-6' >
                <Helmet>
                    <title>Dashboard | Video Update Page </title>
                </Helmet>
                <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Video Update From</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter name"
                                defaultValue={singleVideo?.name}
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
                                defaultValue={singleVideo?.title}
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
                                defaultValue={singleVideo?.youtube_link}
                            />
                        </div>

                        {/* Video Upload */}
                        <div>
                            <td className="py-2 px-4 border">
                                <video src={singleVideo.video ? singleVideo.video : "no video found"} controls className="w-20 h-14 mx-auto" />
                            </td>
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
        </div>
    );
};

export default VideoUpdate;