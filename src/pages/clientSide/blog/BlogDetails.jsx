import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import BlogSlider from './components/BlogSlider';
import BlogVideo from './components/BlogVideo';

const BlogDetails = () => {
    // Scroll to top when the component renders
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    // Fetch single blog details based on the id
    const { data: blog = {} } = useQuery({
        queryKey: ['blog', id], // Include `id` in the queryKey
        queryFn: async () => {
            const res = await axiosPublic.get(`/singleBlog/${id}`);
            return res.data;
        },
        keepPreviousData: true, // Optionally, keeps the old data while fetching new data
    });

    // console.log(blog);

    // Fetch all blogs for the sidebar
    const { data: blogs = [] } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blog`);
            return res.data;
        },
    });

    return (
        <div className="w-11/12 mx-auto mt-20 lg:mt-18">
            <div className="">
                
                <div className="lg:flex gap-10">
                    <div className="lg:w-3/4">
                        <BlogSlider blog={blog}></BlogSlider>
                        <div className='my-7 flex flex-col lg:flex-row lg:justify-between items-center  ' >
                            <div> <h1 className='lg:text-2xl font-bold ' > Author Name : {blog?.author} </h1> </div>
                            <div>
                                <p className='lg:text-xl font-semibold ' >Publish Date : {blog?.date}</p>
                            </div>
                        </div>
                        <div>
                            <h1 className='lg:text-5xl font-body ' > {blog?.title} </h1>
                            <p className='lg:text-xl font-body ' > { blog?.meta_word } </p>
                        </div>
                        <div className='py-10'>
                            <p dangerouslySetInnerHTML={{ __html: blog?.description }} className='px-2 text-xl'>
                            </p>
                        </div>
                    </div>

                    <div className='lg:w-1/4'>
                        <BlogVideo content={blog}></BlogVideo>
                        {/* Sidebar Section */}
                        <div className="flex-none w-full  mt-6 md:mt-0 md:ml-6">
                            <h2 className="text-xl font-semibold mb-4">Another Blogs</h2>
                            <div className="space-y-4">
                                {blogs.slice(0, 5)?.map((sidebarBlog) => (
                                    <Link key={sidebarBlog._id} to={`/blogDetails/${sidebarBlog._id}`}>
                                        <div className="flex items-center my-4 border-2 hover:shadow-lg transition-all rounded-lg shadow p-3">
                                            <img
                                                src={sidebarBlog.BannerImageUrl}
                                                alt={sidebarBlog.title}
                                                className="w-14 h-14 rounded-lg object-cover"
                                            />
                                            <div className="ml-4">
                                                <h3 className="text-sm text-black font-medium">{sidebarBlog.title}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
