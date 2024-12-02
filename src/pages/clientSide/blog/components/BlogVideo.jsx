import { useQuery } from '@tanstack/react-query';
import React, { useState, useRef, useEffect } from 'react';

import { IoPlayCircleSharp } from 'react-icons/io5';

import ReactPlayer from 'react-player';
import axios from 'axios';

const BlogVideo = ({ content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);    //Modal open/close state
    const [seeMore, setSeeMore] = useState(false);
    const [modalVideoSrc, setModalVideoSrc] = useState(null);

    const [chairmanData, setChairmanData] = useState({});

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
        <div className=" lg:pl-4 ">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between h-64  bg-white  rounded-lg">
                <div className="w-full   relative lg:mt-0">
                    <div
                        className="relative  h-64 rounded-lg shadow-md cursor-pointer overflow-hidden">
                        {
                            (content?.youtubeVideo || content?.videoUrl) ?
                                <div
                                    onClick={() => handlePlayButtonClick(`${content?.youtubeVideo ? content?.youtubeVideo : content?.videoUrl}`)}
                                    className=" cursor-pointer h-64 rounded-lg overflow-hidden"
                                >
                                    <ReactPlayer
                                        url={`${content?.youtubeVideo ? content?.youtubeVideo : content?.videoUrl}`}
                                        width="100%"
                                        height="100%"
                                        light={content?.BannerImageUrl} // Display image thumbnail before the video plays
                                        playIcon={<IoPlayCircleSharp className="text-7xl text-red-600" />} // Custom play button
                                    />
                                </div>
                                :
                                <div className="">
                                    <img src={content?.BannerImageUrl} className='h-64 bg-cover' alt="" />
                                </div>
                        }
                    </div>
                </div>


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

export default BlogVideo;
