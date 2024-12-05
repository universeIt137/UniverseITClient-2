import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { BiLogoTwitter } from 'react-icons/bi';
import { TbBrandYoutubeFilled } from 'react-icons/tb';
import { FaFacebook } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Editor } from '@tinymce/tinymce-react';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import { uploadImg } from '../../../UploadFile/uploadImg';
import Loading from '../../../Shared/Loading/Loading';
import { uploadVideo } from '../../../UploadFile/uploadVideo';
const UpdateBlog = () => {
    const [tinyDescription, setTinyDescription] = useState('')
    const [incomingImages, setIncomingImages] = useState([]);
    const [loading, setLoading] = useState(false);


    const { id } = useParams();
    const [descriptionErr, setDescriptionErr] = useState(false)
    const axiosPublic = useAxiosPublic();
    const [dataLoading, setDataLoading] = useState(false);

    const { data: blogData = {}, refetch: blogDataRefetch, isLoading } = useQuery({
        queryKey: ['blogData', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/singleBlog/${id}`)
            return res?.data
        }
    })

    console.log(blogData);
    useEffect(() => {
        if (!isLoading) {
            setTinyDescription(blogData.description);
            setIncomingImages(blogData.images || []);
        }
        console.log(isLoading);
    }, [blogData, isLoading]);
    if (isLoading) {
        return <Loading />
    }
    const { title: incomingTitle, BannerImageUrl: incomingBannerImageUrl, youtubeVideo: incomingYoutubeVideo, date: incomingDate, meta_word: incomingMeta, author: incomingAuthor, description: incomingDescription, } = blogData;
    // const showingData = new Date(incomingDate || 0);

    // // Format the date as YYYY-MM-DD
    // const formattedDate = showingData?.toISOString()?.split('T')[0];
    // console.log(formattedDate);
    const handleDescriptionChange = (value) => {
        setTinyDescription(value)
    };



    const handleSubmit = async (event) => {
        setDataLoading(true);
        setTinyDescription(tinyDescription)
        setDescriptionErr(false)
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const blogImage = form.image.files[0];
        const youtubeVideo = form.youtubeVideo.value;
        const selectedVideo = form.video.files[0];
        const date = form.date.value;
        const meta_word = form.meta_word.value;
        const description = tinyDescription;
        if (!description) {
            setTinyDescription(tinyDescription)
            return setDescriptionErr(true)
        }
        let blogImageUrl = incomingBannerImageUrl
        if (!blogImage?.name) {

            blogImageUrl = incomingBannerImageUrl
        } else {
            blogImageUrl = await uploadImg(blogImage);
        }

        let videoUrl = blogData?.videoUrl;
        if (selectedVideo) {
            videoUrl = await uploadVideo(selectedVideo);
        }


        const data = { title, BannerImageUrl: blogImageUrl, images: incomingImages, youtubeVideo, videoUrl, date, meta_word, description };
        // console.log(data)

        axiosPublic.put(`/updateBlog/${id}`, data)
            .then(res => {
                console.log(res.data)
                setTinyDescription(tinyDescription)
                if (res.data.modifiedCount) {
                    console.log('data updated')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Blog has been Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setDataLoading(false);

                }
            })
            .catch(() => {
                setTinyDescription(tinyDescription)
            })
        form.reset();
    }


    // Image related Function 

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);

        try {
            setLoading(true);
            const uploadedUrls = await Promise.all(
                files.map(async (file) => await uploadImg(file)) // Upload each file using your uploadImg function
            );
            setIncomingImages([...incomingImages, ...uploadedUrls]); // Update the state with uploaded image URLs
        } catch (error) {
            console.error("Error uploading images:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while uploading images!',
            });
        } finally {
            setLoading(false);
        }
    };


    // Function to delete an image
    const removeImage = (index) => {
        const updatedImages = incomingImages.filter((_, i) => i !== index); // Remove image from state
        setIncomingImages(updatedImages);
    };

    return (
        <>
            <Helmet>
                <title>Dashboard | Update Blog</title>
            </Helmet>
            <div className='bg-gray-100 text-black'>

                {/* form section  */}
                <div className=''>

                    <section className="text-gray-600 body-font relative  w-full lg:w-[73vw] mx-auto">
                        <div className="container   mx-auto">

                            <div className="lg:w-full mx-auto bg-white  mt-2 rounded-xl">


                                <div className="shadow-2xl  px-10 rounded-2xl">
                                    <p className='text-center text-2xl font-bold py-2'>Update Blog</p>
                                    <form action="" onSubmit={handleSubmit} className='flex flex-wrap -m-2'>

                                        <div className="grid lg:grid-cols-3 gap-5">
                                            {/* Title  */}
                                            <div className="p-2 ">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600">Title</label>
                                                    <input type="text" name="title" defaultValue={incomingTitle} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>


                                            {/* image url  */}
                                            <div className="p-2 ">
                                                <div className="relative w-full">
                                                    <label className="leading-7 text-sm text-gray-600">Blog Banner Image</label><br />
                                                    <input type="file" name='image' className="file-input file-input-bordered file-input-md w-full" />
                                                </div>

                                                <div className="avatar">
                                                    <div className="w-32 rounded">
                                                        <p>Already uploaded:</p>
                                                        <img src={incomingBannerImageUrl} />
                                                    </div>
                                                </div>
                                            </div>


                                            {/* Multiple Image Upload */}
                                            <div className="p-2 w-full">
                                                <label className="leading-7 text-sm text-gray-600 font-bold"> Multiple Slider Images</label>
                                                <input
                                                    type="file"
                                                    name="images"
                                                    multiple
                                                    onChange={handleImageChange}
                                                    className="file-input file-input-bordered file-input-md w-full"
                                                    disabled={loading} // Disable input during upload
                                                />
                                                <div className="flex flex-wrap gap-4 mt-4">
                                                    {incomingImages?.map((img, index) => (
                                                        <div key={index} className="relative">
                                                            <img
                                                                src={img}
                                                                alt={`preview-${index}`}
                                                                className="h-20 w-20 object-cover rounded"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImage(index)}
                                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="">Youtube video</label>
                                                <input type="text" name="youtubeVideo" defaultValue={incomingYoutubeVideo} className="w-full px-4 py-2 border rounded-md" />
                                            </div>


                                            {/* Video */}
                                            <div className=" w-full ">
                                                <div className="relative">
                                                    <p>Upload Video</p>
                                                    <input type="file" name='video' accept="video/*" className="file-input file-input-bordered file-input-md w-full" />
                                                </div>

                                            </div>


                                            <div className="">
                                                <p>Date</p>
                                                <label className="input input-bordered flex items-center gap-2">
                                                    <input type="date" defaultValue={incomingDate} name="date" className="grow" placeholder="Search" />

                                                </label>
                                            </div>

                                            <div className="">
                                                <label htmlFor="name">Meta Keyword</label>
                                                <input type="text" defaultValue={incomingMeta} name="meta_word" className="w-full px-4 py-2 border rounded-md" />
                                            </div>




                                        </div>


                                        {/* Description */}
                                        <div className="p-2 w-full mb-10 h-full">
                                            <div className="relative">
                                                <label className="leading-7 text-sm font-bold text-gray-600">Blog Description</label>
                                                <Editor
                                                    apiKey='atnary0we9a0nuqjzgtnpxyd0arpbwud7ocxkjxqjtaab3nm'
                                                    init={{
                                                        height: 500,
                                                        max_height: "500",
                                                        width: '100%',
                                                        border: "0px",
                                                        //    menubar: false,
                                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                                        tinycomments_mode: 'embedded',
                                                        tinycomments_author: 'Author name',

                                                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                                    }}
                                                    value={tinyDescription}
                                                    onEditorChange={handleDescriptionChange} />
                                            </div>
                                        </div>

                                        <div className="p-2 w-full">
                                            <button type="submit" disabled={dataLoading} className="w-full py-2 bg-orange-600 text-white rounded-md">
                                                {dataLoading ? "Updating..." : "Submit"}
                                            </button>
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

export default UpdateBlog;