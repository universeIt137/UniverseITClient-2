/* eslint-disable react/prop-types */
import { FaRegStar, FaStar } from 'react-icons/fa';
import Rating from 'react-rating';
import ReactPlayer from 'react-player';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import { Link } from 'react-router-dom';
import CourseDetailsPageSubVideos from './CourseDetailsPageSubVideos';
import MainVideo from './MainVideo';
import { useState } from 'react';
import CourseDetailsTab from './CourseDetailsTab';
import Share from './Share';
import SuccessStory from './SuccessStory';
import RelatedCourse from './RelatedCourse';
import CourseTabsAndShare from './CourseTabsAndShare';

const BannerSection = ({ filteredSuccessStories, courseData }) => {

    const { category, title, videoUrl, bannerImages = [], subVideos, notice, bangla, admissionNotice, courseFee, discountFee, technologies = [], keyFeatures = [], instructors = [] } = courseData;
    const handleClick = () => {
        window.location.href = `tel:+8801755450127`;
    };
    // console.log(instructors);

    return (
        <div className='flex flex-col-reverse lg:flex-row  my-5 gap-1 md:gap-5'>
            {/* video and technology section  */}
            <div className="lg:w-4/6 bg-white p-5 rounded-2xl  hidden lg:block">
                {/* main video  */}
                {
                    videoUrl ? <MainVideo videoUrl={videoUrl} /> : <></>
                }


                <section className=' mt-2 bg-gray-200 rounded-xl p-5'>
                    <p className='font-bold text-xl mb-2' >Technologies you will learn</p>
                    <div className='grid lg:grid-cols-8'>

                        {
                            technologies?.map((item, idx) =>
                                <div key={idx} className="flex flex-col items-center lg:justify-between">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ">
                                            <img src={item?.image} />
                                        </div>
                                    </div>
                                    <p className='font-bold  mb-2 text-center'>{item?.name}</p>
                                </div>
                            )
                        }
                        {
                            technologies?.length < 1 && <p className='font-bold  mb-2 text-center'>No Technology added!!!</p>
                        }

                    </div>
                </section>

                {/* sub video  */}
                <div className='rounded-2xl'>
                    <CourseDetailsPageSubVideos subVideos={subVideos} />
                </div>
                {/* courseDetailsSection  */}
                <div className='hidden lg:block'>
                    <CourseTabsAndShare />

                </div>
            </div>

            {/* sidebar */}
            <div className="lg:w-1/3 w-auto bg-white rounded-2xl overflow-hidden h-max">
                <img src={bannerImages[0] || ''} alt="" className='rounded-xl' />
                <div className='px-2 py-5'>
                    {/* <div className='flex justify-between'>
                        <div>
                            <p className='font-bold text-lg'>{title}</p>
                            <p>{category}</p>
                        </div>
                        <p className="text-end text-base sm:text-xl font-bold text-primary">
                            Fee
                            <br />
                            {discountFee === '0' ? (
                                <p className="text-center text-[12px] lg:text-base font-bold text-primary">
                                    {courseFee}৳
                                </p>
                            ) : (
                                <p className="text-center text-[12px] lg:text-base font-bold text-primary">
                                    <span className="font-normal">{discountFee}৳</span>{" "}
                                    <span className="line-through">{courseFee}৳</span>
                                </p>
                            )}
                        </p>
                    </div> */}
                    {/* <p className='text-primary'>
                        <Rating
                            className="space-x-1"
                            emptySymbol={<FaRegStar />}
                            fullSymbol={<FaStar />}
                            initialRating={4}
                            readonly
                        />
                    </p> */}

                    <div className="flex flex-col bg-[#fffaf0] rounded-xl p-4 shadow-md justify-between min-h-full mb-5">
                        <div className="">


                            <div className='flex justify-between'>
                                <div>
                                    <p className="text-2xl text-secondary font-bold">{title}</p>
                                </div>
                                <div className="text-end text-base sm:text-xl font-bold text-primary flex flex-col justify-center items-center">
                                    <p>Fee</p>
                                    {discountFee === '0' ? (
                                        <p className="text-center text-[12px] lg:text-base font-bold text-primary">
                                            {courseFee}৳
                                        </p>
                                    ) : (
                                        <p className="text-center text-[12px] lg:text-base font-bold text-primary">
                                            <span className="font-normal">{discountFee}৳</span>{" "}
                                            <span className="line-through">{courseFee}৳</span>
                                        </p>
                                    )}
                                </div>
                            </div>

                            <p>{category}</p>
                            <p className='text-primary'>
                                <Rating
                                    className="space-x-1"
                                    emptySymbol={<FaRegStar />}
                                    fullSymbol={<FaStar />}
                                    initialRating={4}
                                    readonly
                                />
                            </p>



                            <ul className="text-sm md:text-base lg:text-start space-y-3 px-4 pl-5 mt-5">

                                <li className="flex items-start text-gray-600 text-lg gap-3">
                                    {/* Custom Bullet */}
                                    <span
                                        className="w-2 h-2 mt-2 rounded-full bg-gray-800 flex-shrink-0"
                                        aria-hidden="true"
                                    ></span>
                                    <span>৪+ ঘন্টা প্রোজেক্ট বেসড টিউটোরিয়াল</span>
                                </li>

                                <li className="flex items-start text-gray-600 text-lg gap-3">
                                    {/* Custom Bullet */}
                                    <span
                                        className="w-2 h-2 mt-2 rounded-full bg-gray-800 flex-shrink-0"
                                        aria-hidden="true"
                                    ></span>
                                    <span>৫০+ কুইজ</span>
                                </li>


                                <li className="flex items-start text-gray-600 text-lg gap-3">
                                    {/* Custom Bullet */}
                                    <span
                                        className="w-2 h-2 mt-2 rounded-full bg-gray-800 flex-shrink-0"
                                        aria-hidden="true"
                                    ></span>
                                    <span>৪+ ঘন্টা প্রোজেক্ট বেসড টিউটোরিয়াল</span>
                                </li>

                                <li className="flex items-start text-gray-600 text-lg gap-3">
                                    {/* Custom Bullet */}
                                    <span
                                        className="w-2 h-2 mt-2 rounded-full bg-gray-800 flex-shrink-0"
                                        aria-hidden="true"
                                    ></span>
                                    <span>৫০+ কুইজ</span>
                                </li>
                            </ul>
                            <p className="text-2xl text-black font-bold ml-5 my-4">ফি {discountFee} টাকা</p>
                            <div className='mt-5'>
                                <div className='grid grid-cols-2  sm:grid-cols-2 gap-5 '>
                                    <button className='w-full' onClick={handleClick}>
                                        <ButtonStrong isWidthFull={true} text={<span className='text-nowrap text-sm py-0.5'>CALL NOW</span>} />
                                    </button>
                                    <Link to={'/freeSeminar'}>
                                        <ButtonStrong isWidthFull={true} text={<span className='text-nowrap text-sm lg:text-xs xl:text-sm py-0.5 lg:py-1 xl:py-0.5'>JOIN FREE SEMINAR</span>} />
                                    </Link>
                                </div>

                                <Link to={'/onlineAdmission'}>
                                    <div className='-mt-7'><ButtonStrong text={'ENROLL NOW'} isWidthFull={true} /></div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* <div className=''>
                        <p className='text-lg font-bold py-2'>Instructors:</p>
                        <div className='flex flex-wrap justify-center items-center gap-2'>
                            {instructors.map((item, index) => (
                                <div key={index} className="border p-2 flex flex-col justify-center items-center rounded-lg gap-2 sm:gap-4 relative h-32">
                                    <div className="flex flex-col items-center">
                                        <img className="size-16 rounded-full object-cover" src={item?.image} alt="" />
                                        <div className="text-base font-medium">

                                            <p className='text-center'>{item?.name}</p>

                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                        <div className='mt-5'>
                            <div className='grid grid-cols-2  sm:grid-cols-2 gap-5 '>
                                <button className='w-full' onClick={handleClick}>
                                    <ButtonStrong isWidthFull={true} text={<span className='text-nowrap text-sm py-0.5'>CALL NOW</span>} />
                                </button>
                                <Link to={'/freeSeminar'}>
                                    <ButtonStrong isWidthFull={true} text={<span className='text-nowrap text-sm lg:text-xs xl:text-sm py-0.5 lg:py-1 xl:py-0.5'>JOIN FREE SEMINAR</span>} />
                                </Link>
                            </div>

                            <Link to={'/onlineAdmission'}>
                                <div className='py-3'><ButtonStrong text={'ENROLL NOW'} isWidthFull={true} /></div>
                            </Link>
                        </div>
                    </div> */}

                    {/* This course include section  */}

                    <div className="flex flex-col bg-[#fffaf0] rounded-xl p-4 shadow-md justify-between min-h-full">
                        <div className="">
                            <p className="text-2xl text-secondary font-bold py-2">This course includes:</p>
                            <ul className="text-sm md:text-base lg:text-start space-y-3 px-4 pl-5">
                                {keyFeatures?.map((item, idx) => (
                                    <li key={idx} className="flex items-start text-black gap-3">
                                        {/* Custom Bullet */}
                                        <span
                                            className="w-2 h-2 mt-2 rounded-full bg-black flex-shrink-0"
                                            aria-hidden="true"
                                        ></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                                {keyFeatures?.length < 1 && (
                                    <li className="text-black text-center">No key features added!!</li>
                                )}
                            </ul>
                        </div>
                    </div>



                </div>

                {/* mobile view related video and technologies  */}
                <div className="lg:hidden">
                    <div className="ml-6">
                        <MainVideo videoUrl={videoUrl} />
                    </div>

                    <section className=' mt-2 bg-gray-200 rounded-xl p-5'>
                        <p className='font-bold text-xl mb-2' >Technologies you will learn</p>
                        <div className='grid grid-cols-3 lg:grid-cols-8'>

                            {
                                technologies?.map((item, idx) =>
                                    <div key={idx} className=" flex flex-col items-center lg:justify-between">
                                        <div className="avatar">
                                            <div className="w-7 rounded-full bg-white">
                                                <img src={item?.image} />
                                            </div>
                                        </div>
                                        <p className='font-bold text-xs  mb-2 text-center'>{item?.name}</p>
                                    </div>
                                )
                            }
                            {
                                technologies?.length < 1 && <p className='font-bold  mb-2 text-center'>No Technology added!!!</p>
                            }

                        </div>
                    </section>
                </div>

                <div className='block lg:hidden'><CourseTabsAndShare /></div>
                {/* course video and technology section for mobile view  */}

                <div className="">
                    <SuccessStory filteredSuccessStories={filteredSuccessStories} />
                    <RelatedCourse />
                </div>
            </div>
        </div>
    );
};

export default BannerSection;