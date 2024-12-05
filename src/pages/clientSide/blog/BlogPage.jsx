import React, { useState } from 'react';
import BlogCard from './BlogCard';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const BlogPage = () => {
    // Scroll to top on page load
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // State
    const [firstCardId, setFirstCardId] = useState(0);
    const [cardPerSlice, setCardPerSlice] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');
    const axiosPublic = useAxiosPublic();

    // Fetch blogs
    const { data: allBlogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blog');
            return res.data;
        },
    });

    // Loading spinner
    if (isLoading) {
        return <Loading />;
    }

    // Filter blogs by active status and search term
    const blogs = allBlogs.filter((item) => item.status === true);
    const filteredBlogs = blogs.filter((blog) =>
        blog.author.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    const totalBlogs = filteredBlogs.length;

    // Paginate blogs
    const handleNext = () => {
        const newFirstCardId = firstCardId + cardPerSlice;
        if (newFirstCardId < totalBlogs) {
            setFirstCardId(newFirstCardId);
        }
    };

    const handlePrev = () => {
        const newFirstCardId = firstCardId - cardPerSlice;
        if (newFirstCardId >= 0) {
            setFirstCardId(newFirstCardId);
        }
    };

    return (
        <div className="sm:px-20 px-5 my-10 min-h-screen">
            <Helmet>
                <title>Universe IT | Blogs</title>
            </Helmet>

            <h1 className="text-4xl font-bold text-center my-10">
                <span className="text-primary border-b-2">Latest</span> Blogs
            </h1>

            {/* Search bar */}
            <div className="flex justify-end mb-10">
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Search Blogs by Author Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-10 gap-y-6">
                {/* Blog Cards */}
                <div className="flex-1 space-y-6">
                    {filteredBlogs
                        .slice()
                        .reverse()
                        .slice(firstCardId, firstCardId + cardPerSlice)
                        .map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                </div>

                {/* Sidebar */}
                <aside className="w-full md:w-1/3 ">
                    <h2 className="text-xl font-semibold">Popular Blogs</h2>
                    <div className="gap-10">
                        {blogs
                            .slice()
                            .reverse()
                            .slice(0, 5)
                            .map((sidebarBlog) => (
                                <Link
                                    key={sidebarBlog._id}
                                    to={`/blogDetails/${sidebarBlog._id}`}
                                >
                                    <div className="flex border-2 border-black items-center my-10 rounded-lg p-3 hover:shadow-lg transition">
                                        <img
                                            src={sidebarBlog.BannerImageUrl}
                                            alt={sidebarBlog.title}
                                            className="w-14 h-14 rounded-lg object-cover"
                                        />
                                        <div className="ml-4">
                                            <h3 className="text-sm font-medium text-black">
                                                {sidebarBlog.title}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </aside>
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center items-center gap-6">
                <button
                    onClick={handlePrev}
                    disabled={firstCardId === 0}
                    className={`px-7 py-2 rounded bg-primary text-white ${firstCardId === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-primary-dark'
                        }`}
                >
                    Prev
                </button>
                <span>
                    Page {Math.ceil(firstCardId / cardPerSlice) + 1} of{' '}
                    {Math.ceil(totalBlogs / cardPerSlice)}
                </span>
                <button
                    onClick={handleNext}
                    disabled={firstCardId + cardPerSlice >= totalBlogs}
                    className={`px-7 py-2 rounded bg-primary text-white ${firstCardId + cardPerSlice >= totalBlogs
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-primary-dark'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BlogPage;
