import React, { useState } from 'react';
import BlogCard from './BlogCard';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import { Helmet } from 'react-helmet-async';

const BlogPage = () => {
    window.scrollTo(0, 0);
    const [firstCardId, setFirstCardId] = useState(0);
    const [cardPerSlice, setCardPerSlice] = useState(6);
    const axiosPublic = useAxiosPublic();
    const { data: allBlogs = [], refetch, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blog');
            return res.data;
        }
    });
    if (isLoading) {
        return <Loading />
    }

    const blogs = allBlogs?.filter(item => item.status === true);


    let showingBlogs = blogs.map((data, idx) => {
        const newData = {
            ...data,
            id: idx + 1
        };
        return newData;
    });

    const totalCard = showingBlogs.length;

    const handleNext = () => {
        const newFirstCardId = firstCardId + cardPerSlice;
        if (newFirstCardId < totalCard) {
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
        <div className='sm:px-20 px-5 my-10 min-h-screen'>
            <Helmet>
                <title>Universe IT | Blogs</title>
            </Helmet>
            <p className="text-4xl m-10 text-center"><span className='text-primary border-b-2'>Latest</span> Blogs</p>

            <div className='flex gap-10 flex-col'>
                {
                    (showingBlogs.slice(firstCardId, firstCardId + cardPerSlice)).map((blog, idx) => <BlogCard key={idx} blog={blog} />)
                }
            </div>
            <div className="mt-4 flex justify-center items-center gap-6">
                <button
                    onClick={handlePrev}
                    disabled={firstCardId === 0}
                    className={`px-7 btn bg-primary text-white hover:text-black  active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 focus:text-white w-max ${firstCardId === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Prev
                </button>
                <div>
                    {firstCardId / cardPerSlice + 1} /{Math.ceil(totalCard / cardPerSlice)}
                </div>
                <button
                    onClick={handleNext}
                    disabled={firstCardId + cardPerSlice >= totalCard}
                    className={`px-7 btn bg-primary text-white hover:text-black  active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 focus:text-white w-max ${firstCardId + cardPerSlice >= totalCard ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BlogPage;
