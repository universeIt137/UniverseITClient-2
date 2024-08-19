import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BiLogoTwitter } from 'react-icons/bi';
import { TbBrandYoutubeFilled } from 'react-icons/tb';
import { FaFacebook } from 'react-icons/fa';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import { uploadImg } from '../../../UploadFile/uploadImg';

const ManageHomepageContent = () => {

    const axiosPublic = useAxiosPublic()
    const { data: homepageContent = [], refetch: homepageContentRefetch, isLoading } = useQuery({
        queryKey: ['homepageContent'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homepageContent')
            return res?.data
        }
    })

    const { title: incomingTitle, imageUrl: incomingImageUrl, subtitle: incomingSubtitle, video_url: incomingVideo_url, video_section_video: incomingVideo_section_video, courseImages: incomingCourseImages = [], milestoneImage: incomingMilestoneImg, seminarImage: incomingFreeSeminarImg } = homepageContent[0] || []





    const handleSubmit = async (event) => {
        const toastId = toast.loading("Home page content is updating...");
        event.preventDefault();
        const form = event.target;
        const video_url = form.video_url.value || '';
        const video_section_video = form.video_section_video.value || '';
        const selectedImage = form.image.files[0] || {};
        const selectedCourseImage = form.courseImage.files[0] || {};
        const title = form.title.value || '';
        const subtitle = form.subtitle.value || '';
        const milestoneImage = form.milestoneImage.files[0] || {};
        const seminarImage = form.seminarImage.files[0] || {};
        let imageUrl = '';
        let secondImageUrl = '';
        let milestoneImageUrl = '';
        let seminarImageUrl = '';
        if (!selectedImage?.name) {
            imageUrl = incomingImageUrl;
        } else {
            imageUrl = await uploadImg(selectedImage);
        }

        if (!selectedCourseImage?.name) {
            secondImageUrl = '';
        } else {
            secondImageUrl = await uploadImg(selectedCourseImage);
        }

        if (!milestoneImage?.name) {
            milestoneImageUrl = incomingMilestoneImg;
        } else {
            milestoneImageUrl = await uploadImg(milestoneImage);
        }
        console.log(milestoneImageUrl);
        if (!seminarImage?.name) {
            seminarImageUrl = incomingFreeSeminarImg;
        } else {
            seminarImageUrl = await uploadImg(seminarImage);
        }

        console.log(seminarImageUrl);
        let courseImagesArray = [...incomingCourseImages];
        if (secondImageUrl) {
            courseImagesArray = [...incomingCourseImages, { image: secondImageUrl, id: new Date().getTime() }];
        }

        const data = { video_url, title, imageUrl: imageUrl ? imageUrl : '', subtitle, video_section_video, courseImages: courseImagesArray, milestoneImage: milestoneImageUrl, seminarImage: seminarImageUrl };
        console.log(data);

        axiosPublic.post(`/updateHomepageContent/${homepageContent[0]?._id || 'notAvailable'}`, data)
            .then(res => {
                toast.success("Home page Content Updated Successfully!!", { id: toastId });
                if (res.data?.modifiedCount || res.data?.insertedId) {
                    console.log(res.data);
                    homepageContentRefetch();
                }
            })
            .catch(err => {
                console.log(err);
                toast.error(err?.message, { id: toastId });
            });
    };

    const handleDelete = (image) => {

        console.log(image);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Image Deleting...");
                const afterDeleteArray = incomingCourseImages?.filter(img => img.id !== image.id);
                const data = { courseImages: afterDeleteArray }
                axiosPublic.post(`/updateHomepageContent/${homepageContent[0]?._id || 'notAvailable'}`, data)
                    .then(res => {
                        toast.success("Deleted Successfully!!", { id: toastId });
                        if (res.data?.modifiedCount || res.data?.insertedId) {
                            console.log(res.data);
                            homepageContentRefetch();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error(err?.message, { id: toastId });
                    });

            }
        });

    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Homepage content</title>
            </Helmet>
            <div className='bg-gray-100 text-black'>

                {/* form section  */}
                <div className=''>

                    <section className="text-gray-600 body-font relative w-full lg:w-[73vw] mx-auto">
                        <div className="container mt-2 mx-auto">

                            <div className="lg:w-full mx-auto bg-white  py-5 rounded-xl">
                                <p className='text-center text-2xl font-bold pb-2'>Manage Homepage Content</p>

                                <div className="shadow-2xl  px-10 rounded-2xl">
                                    <form action="" onSubmit={handleSubmit} className='flex flex-wrap -m-2'>



                                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Title</label><br />
                                                    <input defaultValue={incomingTitle} name='title' type="text" placeholder='Title' className="file-input file-input-bordered file-input-md w-full px-2" />
                                                </div>
                                            </div>
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Subtitle</label><br />
                                                    <textarea defaultValue={incomingSubtitle} name='subtitle' type="text" placeholder='Subtitle' className="file-input file-input-bordered file-input-md w-full px-2 h-[100px]" />
                                                </div>
                                            </div>

                                            {/* video upload  */}
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Homepage section video</label><br />
                                                    <input defaultValue={incomingVideo_url} name='video_url' type="text" placeholder='Video Url' className="file-input file-input-bordered file-input-md w-full px-2" />
                                                </div>
                                            </div>

                                            {/* image upload  */}
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Homepage section Image</label><br />
                                                    <input name='image' type="file" className="file-input file-input-bordered file-input-md w-full" />
                                                </div>
                                            </div>
                                            {/* milestone image upload  */}
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Milestone section Image</label><br />
                                                    <input name='milestoneImage' type="file" className="file-input file-input-bordered file-input-md w-full" />
                                                </div>
                                            </div>
                                            {/* seminar image upload  */}
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Free Seminar section Image</label><br />
                                                    <input name='seminarImage' type="file" className="file-input file-input-bordered file-input-md w-full" />
                                                </div>
                                            </div>

                                            {/* video section video upload upload  */}
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Video section's video</label><br />
                                                    <input defaultValue={incomingVideo_section_video || ''} name='video_section_video' type="text" placeholder='Video Url' className="file-input file-input-bordered file-input-md w-full px-2" />
                                                </div>
                                            </div>
                                            {/* course Images  */}
                                            <div className=" w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Add Course Images</label><br />
                                                    <input name='courseImage' type="file" placeholder='Video Url' className="file-input file-input-bordered file-input-md w-full" />
                                                </div>
                                                <div className='border border-gray-500 rounded-md mt-5 p-2'>
                                                    <p className=''>Already added Images</p>
                                                    <div className='flex gap-2 flex-wrap'>
                                                        {
                                                            incomingCourseImages?.map((image, idx) => <div className='w-[100px] p-2 rounded-md border border-black overflow-hidden' key={idx}>
                                                                <div className='flex justify-end pb-2'> <p onClick={() => handleDelete(image)} className=' w-7 h-7 rounded-md bg-gray-200 hover:bg-red-500 hover:text-white active:scale-90 flex justify-center items-center'>X</p></div>
                                                                <img src={image?.image} className=' w-full h-[70px] object-cover' />
                                                            </div>)
                                                        }

                                                    </div>
                                                    {
                                                        incomingCourseImages?.length < 1 && <p className='text-sm text-center pt-5'>No image Found!!</p>
                                                    }
                                                </div>

                                            </div>
                                        </div>

                                        {/* Notice */}














                                        <div className="p-2 w-full">
                                            <div className='flex justify-center items-center'><ButtonStrong text={'Submit'} /></div>
                                        </div>
                                    </form>


                                    <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                        <a className="text-indigo-500">info@UniverseIT.com</a>
                                        <p className="leading-normal my-5">House # 3/GA,
                                            <br />Shyamoli, Road # 1. Dhaka-1207.
                                        </p>
                                        <span className="inline-flex">
                                            <a className="text-gray-500">
                                                <Link to="https://x.com/"><BiLogoTwitter className="text-2xl" /></Link>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <Link to="https://www.youtube.com/"><TbBrandYoutubeFilled className="text-2xl" /></Link>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <Link to="https://www.facebook.com/"><FaFacebook className="text-xl" /></Link>
                                            </a>

                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </>
    );
};

export default ManageHomepageContent;