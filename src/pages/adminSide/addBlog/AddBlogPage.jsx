import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { Editor } from "@tinymce/tinymce-react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { uploadImg } from "../../../UploadFile/uploadImg";
import { uploadVideo } from "../../../UploadFile/uploadVideo";
import useAuth from "../../../hooks/useAuth";




const AddBlogPage = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [images, setImages] = useState([]); // Array to store uploaded image URLs

    const { data: content = [], refetch } = useQuery({
        queryKey: ['content'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blog');
            return res.data;
        }
    })

    const handleImageChange = (e) => {
        setImages([...e.target.files]); // Set selected images
    };

    const [formData, setFormData] = useState({
        description: '',

    });

    const handleDescriptionChange = (value) => {
        setFormData({ ...formData, description: value });
    };



    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;

        // Upload each image individually
        const imageUrls = await Promise.all(
            images.map(async (image) => await uploadImg(image))
        );

        const title = form.title.value;
        const youtubeVideo = form.youtubeVideo.value;
        const date = form.date.value;
        const meta = form.meta.value;
        const image = form.image.files[0];
        const description = formData.description;
        const selectedVideo = form.video.files[0];




        let BannerImageUrl = ''
        if (!image?.name) {
            BannerImageUrl = ''
        } else {
            BannerImageUrl = await uploadImg(image);

        }

        let videoUrl = '';
        if (selectedVideo) {
            videoUrl = await uploadVideo(selectedVideo);
        }




        setLoading(true);

        // Simulate form submission
        try {
            const data = {
                title,
                author: user?.displayName,
                author_email: user?.email,
                youtubeVideo,
                date,
                meta,
                videoUrl,
                description,
                BannerImageUrl,
                images: imageUrls, // Array of image URLs
            }

            console.log(data);
            axiosPublic.post(`/blog`, data)
                .then(res => {
                    if (res) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Blog has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })

        } catch (error) {
            console.error("Error submitting form:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-10/12 mx-auto p-4">
            <Helmet>
                <title>Dashboard | Add Blog</title>
            </Helmet>
            <h2 className="text-2xl font-semibold mb-4">Upload Blog Content</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {loading && <p className="text-blue-500">Uploading data...</p>}

                <div className="grid lg:grid-cols-3 gap-4">
                    <div className="">
                        <label htmlFor="name">Title</label>
                        <input type="text" name="title" className="w-full px-4 py-2 border rounded-md" />
                    </div>

                    



                    <div className=" w-full">
                        <div className="relative">
                            <p>Upload Banner Picture</p>
                            <input type="file" name='image' className="file-input file-input-bordered file-input-md w-full " placeholder="Upload website logo" />
                        </div>


                    </div>

                    {/* Multiple Image Upload */}
                    <div className=" w-full">
                        <div className="relative">
                            <label className="text-sm text-gray-600 font-bold">Select Multiple Picture for Slide</label><br />
                            <input
                                type="file"
                                name="images"
                                multiple // Allows selecting multiple images
                                onChange={handleImageChange}
                                className="file-input file-input-bordered file-input-md w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="">Youtube video</label>
                        <input type="text" name="youtubeVideo" className="w-full px-4 py-2 border rounded-md" />
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
                            <input type="date" name="date" className="grow" placeholder="Search" />

                        </label>
                    </div>

                    <div className="">
                        <label htmlFor="name">Meta Keyword</label>
                        <input type="text" name="meta" className="w-full px-4 py-2 border rounded-md" />
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
                                // mergetags_list: [
                                //   { value: 'First.Name', title: 'First Name' },
                                //   { value: 'Email', title: 'Email' },
                                // ],
                                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                            }}
                            value={formData.description}
                            onEditorChange={handleDescriptionChange} />
                    </div>

                </div>


                <div className="w-1/4 mx-auto">
                    <button type="submit" className="w-full py-2 bg-orange-600 text-white rounded-md">
                        {loading ? "Uploading..." : "Submit"}
                    </button>
                </div>
            </form>


        </div>
    );
};

export default AddBlogPage;
