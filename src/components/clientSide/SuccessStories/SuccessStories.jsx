/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import ComponentsTitle from "../../../Shared/ComponentsTitle/ComponentsTitle";
import demoVideo1 from '../../../assets/demoVideo/demo1.mp4';
import demoVideo2 from '../../../assets/demoVideo/demo2.mp4';
import demoVideo3 from '../../../assets/demoVideo/demo3.mp4';
import { IoPlayCircleSharp } from "react-icons/io5";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import { Link } from "react-router-dom";
import VideoPlayingModal from "../../../Shared/VideoPlayingModal";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../Shared/Loading/Loading";
import SuccessStory from "../../../pages/clientSide/courseDetails/SuccessStory";
import SuccessCard from "./SuccessCard";



const SuccessStories = ({ isHomePage = false }) => {

    const [seeMore, setSeeMore] = useState(false);
    const [modalVideoSrc, setModalVideoSrc] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { data: successStories = [], refetch, isLoading } = useQuery({
        queryKey: ['successStory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/successStory');
            return res.data;
        }
    });
    if (isLoading) {
        return <Loading />
    }

    const handlePlayButtonClick = (videoSrc) => {
        setModalVideoSrc(videoSrc);
    };

    const handleCloseModal = () => {
        setModalVideoSrc(null);
    };

    return (
        <div className="bg-[#fefaee] lg:py-10 ">
            <div className="max-w-7xl mx-auto">
                <ComponentsTitle title={'Video Gallery'} description={'Shine a spotlight on the stories of our determined students who have achieved remarkable feats through their unwavering dedication.'} />


                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-wrap px-5 sm:px-10 pt-10">
                    {successStories.slice(0, seeMore ? successStories.length : 2).map((video) => (
                        <div className="min-h-full" key={video._id}>
                            <div className="relative">
                                <div className="relative">
                                    <video
                                        className="rounded-lg shadow-lg w-full md:h-[25.5vw] xl:h-[329px]"
                                        src={video?.video}
                                        muted
                                    />
                                    <div onClick={() => handlePlayButtonClick(video?.video)} className="absolute inset-0 flex items-center justify-center cursor-pointer">
                                        <button className="relative">
                                            <span className="absolute size-4 bg-white top-4 left-4 z-0"></span>
                                            <IoPlayCircleSharp className="text-5xl rounded-full text-red-600 relative z-10" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> */}

                <div className="px-5">
                    <SuccessCard filteredSuccessStories={successStories} />
                </div>


                <div className="flex justify-center items-center pt-10">
                    {
                        !isHomePage ? (
                            <div className="w-max" onClick={() => setSeeMore(!seeMore)}>
                                <ButtonStrong text={seeMore ? 'View Less' : 'View All'} />
                            </div>
                        ) : (
                            <Link to={'/videoGallery'}>
                                <div className="w-max">
                                    <ButtonStrong text={'View All'} />
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>

            {modalVideoSrc && (
                <VideoPlayingModal videoSrc={modalVideoSrc} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default SuccessStories;
