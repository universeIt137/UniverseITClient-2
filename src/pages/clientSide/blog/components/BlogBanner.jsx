import React from 'react';
import BlogSlider from './BlogSlider';


const BlogBanner = ({ blog }) => {
    return (
        <div className='flex'>
            <div className="lg:w-3/4 ">
                <BlogSlider></BlogSlider>
            </div>
            
        </div>
    );
};

export default BlogBanner;