import React from 'react';
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { IoPlayCircleSharp } from "react-icons/io5";
import 'swiper/css';  // Import Swiper styles
import 'swiper/css/pagination';  // Import pagination styles

const SuccessCard = ({ filteredSuccessStories }) => {

    const [modalVideoSrc, setModalVideoSrc] = useState(null); // Modal video source state
    const [isModalOpen, setIsModalOpen] = useState(false);    // Modal open/close state

    // Function to open the modal and set video source
    const handlePlayButtonClick = (videoSrc) => {
        setModalVideoSrc(videoSrc);  // Set the clicked video URL
        setIsModalOpen(true);        // Open the modal
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setModalVideoSrc(null);      // Clear video source
        setIsModalOpen(false);       // Close the modal
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between">
                
            </div>
            


            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    filteredSuccessStories?.map((story, index) =>
                        <div className="relative shadow-lg rounded-lg border" key={story._id}>
                            {/* Video Thumbnail with click to open modal */}
                            <div
                                onClick={() => handlePlayButtonClick(story?.youtube_link || story?.video)}
                                className="h-[35.9vw]  lg:h-[15.9vw] cursor-pointer border rounded-lg overflow-hidden"
                            >
                                <ReactPlayer
                                    
                                    url={story?.youtube_link || story?.video}
                                    width="100%"
                                    height="100%"
                                    light={story?.banner}  // Display image thumbnail before the video plays
                                    playIcon={<IoPlayCircleSharp className="text-4xl text-white" />}  // Custom play button
                                />
                            </div>

                            <div className="flex items-center">
                                {/* Thumbnail Image */}
                                <div className="avatar hidden lg:block">
                                    <div className="ring-primary ring-offset-base-100 w-12 m-5 rounded-full ring ring-offset-2 ">
                                        <img src={story?.banner_img} alt="Success Story" className='' />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="font-bold text-xs lg:text-xl">{story.name}</p>
                                    {/* title used as a batch no  */}
                                    <p className="text-xs text-gray-600">{story.title}</p>
                                </div>
                            </div>
                        </div>)
                }

            </div>

            {/* Modal to play video */}
            {isModalOpen && modalVideoSrc && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="relative w-[90%] max-w-4xl bg-black rounded-lg p-4">
                        {/* Close button */}
                        <button
                            className="absolute top-2 right-2 text-white text-2xl"
                            onClick={handleCloseModal}
                        >
                            ✕
                        </button>
                        {/* ReactPlayer inside the modal */}
                        <div className="w-full h-[60vh]">
                            <ReactPlayer
                                url={modalVideoSrc}
                                width="100%"
                                height="100%"
                                controls
                                playing
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuccessCard;