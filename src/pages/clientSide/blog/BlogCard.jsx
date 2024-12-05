/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { makeVisibleTime } from "../../../makeVisibleTime";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";

const BlogCard = ({ blog, slide = false }) => {
    const { BannerImageUrl, title, description, _id, date, author } = blog;

    return (
        <div className="w-11/12 mx-auto my-5">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-10 bg-gray-200 shadow-lg p-5 md:p-10 rounded-3xl">
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                    <img
                        className="w-full h-[200px] md:h-[300px] lg:h-[350px] object-cover rounded-lg shadow-lg border-2 border-black"
                        src={BannerImageUrl}
                        alt={title}
                    />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 space-y-3">
                    {/* Date */}
                    <p className="text-gray-600 text-sm font-bold">
                        {makeVisibleTime(date)}
                    </p>

                    {/* Title */}
                    <h3 className="text-lg md:text-2xl font-bold text-gray-800">
                        {title}
                    </h3>

                    {/* Author */}
                    <p className="text-sm md:text-lg font-semibold text-gray-700">
                        Author: <span className="font-medium">{author}</span>
                    </p>

                    {/* Description */}
                    <div
                        className="text-gray-600 text-sm md:text-base max-h-[100px] overflow-hidden"
                        dangerouslySetInnerHTML={{
                            __html: description.length > 100
                                ? `${description.slice(0, 100)}...`
                                : description,
                        }}
                    ></div>

                    {/* Read More Button */}
                    <Link to={`/blogDetails/${_id}`}>
                        <ButtonStrong text="Read More" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
