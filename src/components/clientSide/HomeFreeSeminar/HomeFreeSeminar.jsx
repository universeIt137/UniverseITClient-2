import { useState } from "react";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import seminarBanner from '../../../assets/banner/seminarBanner.jpg'
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";
const HomeFreeSeminar = () => {
    const [seeMore, setSeeMore] = useState(false)
    const axiosPublic = useAxiosPublic()

    const { data: allSeminar = [], isLoading } = useQuery({
        queryKey: ['seminar'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/seminar`)
            return res?.data
        }
    })

    const { data: homepageContent = [], refetch: homepageContentRefetch, isLoading: homeDataIsLoading } = useQuery({
        queryKey: ['homepageContent'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homepageContent')
            return res?.data
        }
    })
    if (isLoading || homeDataIsLoading) {
        return <Loading />
    }
    const data = homepageContent[0] || [];
    const weekDays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const returnDate = (date) => {
        const months = ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', ' July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const newDate = new Date(date).getDate()
        const month = new Date(date).getMonth()
        const year = new Date(date).getFullYear().toString()
        return <>
            <span className="text-xl sm:text-2xl font-bold">{newDate}</span>
            <span className="text-sm lg:text-base font-bold text-primary">
                {months[month]}, {year[2]}{year[3]}
            </span>
        </>
    }
    const returnTime = (time) => {
        const [hour, minutes] = time.split(':');
        const useableTime = hour % 12 || 12;
        const theAbbreviation = hour < 12 || hour === 24 ? 'AM' : 'PM';
        return `${useableTime}:${minutes} ${theAbbreviation}`;
    }


    return (
        <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-10 px-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="space-y-10 max-w-[600px]">
                    <div className="space-y-4">
                        <h2 className="text-3xl sm:text-5xl font-bold text-text_color">Free Seminar Schedule</h2>
                        <p className="font-medium text-sm sm:text-base text-justify text-text_color">Need guidelines to choose a suitable course? Unlock new insights and opportunities by joining our complimentary seminars.</p>
                    </div>
                    <div className="py-5 space-y-5 ">
                        <div className={`space-y-4 ${seeMore ? 'max-h-[5000px]' : 'max-h-[300px]'} overflow-hidden transition-all duration-500`}>
                            {
                                allSeminar?.slice().reverse().map((seminar, idx) =>
                                    <div className="w-full  bg-primary/35 rounded-xl flex overflow-hidden gap-3 " key={idx}>
                                        <p className="flex flex-col min-w-max max-w-max justify-center items-center pl-5 pr-2 sm:pr-4">
                                            {returnDate(seminar?.date)}
                                        </p>
                                        <div className="w-full h-full bg-white lg:py-5 rounded-xl flex justify-between items-center flex-wrap gap-3 pl-3 sm:pl-5 pr-5 sm:pr-10 py-1">
                                            <div className=" w-1/2 " >
                                                <h2 className="text-[] sm:text-base font-bold">{seminar?.topic}</h2>
                                                <p className="text-xs sm:text-sm font-medium">{weekDays[new Date(seminar?.date).getDay()] || 0} | Time: {returnTime(seminar?.time)}</p>
                                            </div>
                                            <div className=" " >
                                                <Link to={`/seminarForm/${seminar?._id}`}>

                                                    <button className={`bg-primary/95 px-1 lg:px-6 py-[2px] mb-1 lg:py-2.5 text-sm lg:text-base rounded-md  text-white lg:font-bold flex justify-center items-center hover:bg-text_color hover:text-white transition-all duration-300 active:scale-90  `}>Register Now</button>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                )
                            }
                        </div>
                        <div className="flex">
                            <div className="w-max" onClick={() => setSeeMore(!seeMore)}>
                                <ButtonStrong text={seeMore ? 'View Less' : 'View All'} /></div>
                        </div>
                    </div>

                </div>
                <div className="flex justify-end">
                    <img src={data?.seminarImage} className=' w-full max-w-[650px] mx-auto rounded-lg sm:rounded-3xl object-cover' alt="" />
                </div>
            </div>
        </div>
    );
};

export default HomeFreeSeminar;