/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { makeVisibleTime } from "../../../makeVisibleTime";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";

const BlogCard = ({ blog, slide = false }) => {

    const { BannerImageUrl, title, description, _id, date } = blog
    return (
        <div className="w-full max-w-[340px] sm:max-w-[400px]  md:max-w-[800px] flex flex-col md:flex-row gap-10 bg-gray-200 shadow-lg py-5  md:py-10 px-3 md:px-5 rounded-3xl mx-auto md:items-center">
            <img className="w-full md:size-44 object-cover rounded-lg shadow-lg shadow-primary/50" src={BannerImageUrl} alt="" />
            <div className="space-y-3">
                <p className="font-bold text-gray-600 text-sm">{makeVisibleTime(date)}</p>
                <p className="font-bold text-sm md:text-base">{title}</p>
                <div className=" max-h-[100px] md:h-[100px] overflow-hidden text-gray-600" dangerouslySetInnerHTML={{ __html: description }}></div>
                <Link to={`/blogDetails/${_id}`}><ButtonStrong text={'Read More'} /></Link>
            </div>
        </div>
    );
};

export default BlogCard;