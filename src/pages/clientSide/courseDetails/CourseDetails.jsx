import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import BannerSection from './BannerSection';
import Loading from '../../../Shared/Loading/Loading';
import { Helmet } from 'react-helmet-async';

const CourseDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();

    const { data: courseData = {}, isLoading } = useQuery({
        queryKey: ['course', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/course/${id}`);
            return res?.data;
        },
    });

    const handleClick = () => {
        window.location.href = `tel:+8801886061401`;
    };

    const { data: stories = [] } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/successStory');
            return res.data;
        },
    });

    const filteredSuccessStories = stories.filter((story) => story.course_id === id);

    const [showStickySection, setShowStickySection] = useState(false);

    // Scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const triggerPoint = 500; // Adjust trigger point as per your design
            setShowStickySection(scrollPosition > triggerPoint);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <section className="px-3 mx-auto relative">
            <Helmet>
                <title>Universe IT | Course Details</title>
            </Helmet>

            {/* Banner Section */}
            <BannerSection
                filteredSuccessStories={filteredSuccessStories}
                courseData={courseData}
            />

            {/* Sub video and success story */}
            <section className="flex flex-col lg:flex-row gap-6 my-5">
                <div className="lg:w-4/6"></div>
                <div className="lg:w-1/3 rounded-xl"></div>
            </section>

            {/* Sticky Section */}
            {showStickySection && (
                <div className="fixed bottom-0 left-0 right-0 bg-[#fffaf0] shadow-lg border-t border-gray-200 z-50">
                    <div className="flex items-center justify-around px-4 py-8">
                        <span className="lg:text-2xl font-bold text-gray-900">ফি: {courseData?.discountFee} টাকা</span>
                        <div className="flex gap-3">
                            <button className="bg-orange-500 text-white text-[14px] lg:text-xl px-1  lg:px-4 lg:py-2  rounded-lg font-medium">
                                <Link to={"/onlineAdmission"}>
                                    Enroll Now
                                </Link>
                            </button>

                            <button onClick={handleClick} className="bg-orange-500 text-white text-[14px] px-1 lg:text-xl lg:px-4 lg:py-2 rounded-lg font-medium">
                                    Call Now
                            </button>
                            <button className="border border-orange-500 text-orange-500 text-[14px] px-1 lg:text-xl lg:px-4 lg:py-2 rounded-lg font-medium">
                                <Link to={"/freeSeminar"}>
                                    Free Seminar
                                </Link>
                            </button>
                           
                        </div>  
                    </div>
                </div>
            )}
        </section>
    );
};

export default CourseDetails;
