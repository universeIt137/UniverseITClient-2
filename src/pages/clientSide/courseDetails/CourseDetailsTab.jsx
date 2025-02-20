import React, { useEffect, useState } from 'react';

// import 'react-tabs/style/react-tabs.css';
import Faq from 'react-faq-component';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import CourseCategory from '../../../Shared/CourseCategory';
import SemesterTable from '../../../Shared/SemesterTable';
import Tabs from './Tabs';
import Loading from '../../../Shared/Loading/Loading';
import { IoIosCheckboxOutline } from 'react-icons/io';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';


const CourseDetailsTab = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic()
    const [TabName, setTabName] = useState('Course Details')
    const [rows, setRowsOption] = useState(null)
    const { data: courseSemesters = [], isLoading: courseSemestersIsLoading } = useQuery({
        queryKey: ['singleCourseIdForSemester', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/semesterByCourse/course/${id}`)
            return res?.data
        }
    })


    const { data: successStories = [] } = useQuery({
        queryKey: ['successStory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/successStory');
            return res.data;
        }
    });

    // Filter success stories based on Course id 
    const filteredSuccessStories = successStories.filter(story => story.course_id === id);




    const { data: courseCategories = [], isLoading: courseCategoriesIsLoading } = useQuery({
        queryKey: ['courseCategories', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/courseCategory/course/${id}`)
            return res?.data
        }
    })
    const { data: courseObjectives = [], isLoading: courseObjectivesIsLoading } = useQuery({
        queryKey: ['courseObjective', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/objectives/course/${id}`);
            return res?.data;
        }
    });

    useEffect(() => {
        if (courseObjectives.length > 0) {
            rows && rows[0].expand()
        }
    }, [courseObjectives, rows])

    if (courseSemestersIsLoading || courseCategoriesIsLoading || courseObjectivesIsLoading) {
        return <Loading />
    }
    const allSubjects = courseSemesters?.reduce((a, b) => {
        return a.concat(b.subjects)
    }, []);
    // console.log(allSubjects);
    const totalCredits = allSubjects.reduce((a, b) => {
        return a + parseInt(b.credit)
    }, 0);
    const showingCategory = courseCategories?.find(category => category?._id === TabName) || {}
    const courseObjective = courseObjectives[0] || {};
    const { objectiveFAQ = [] } = courseObjective;
    let convertedArray = objectiveFAQ.map(item => {
        return {
            title: <div className='flex gap-5 justify-between'>
                <p className='font-bold'>{item.question}</p>
            </div>,
            content: item.answer,

        };
    });
    const showingDataAtFAQ = {
        title: '',
        rows: convertedArray
    }
    const config = {
        animate: true,
        arrowIcon: "V",
        openOnload: 1,
        expandIcon: "+",
        collapseIcon: "-",
    };






    return (
        <>
            <div className='overflow-x-hidden bg-white rounded-lg'>
                <Tabs tabName={TabName} setTabName={setTabName} courseCategories={courseCategories} />
                {TabName === 'FAQ' && <div className='pl-2  '>
                    {
                        objectiveFAQ.length < 1 ? <p className="pb-10 pt-5 text-center">No FAQ Found</p> : <Faq config={config} getRowOptions={setRowsOption} data={showingDataAtFAQ} />
                    }
                </div>}
                {
                    showingCategory?.name && <CourseCategory category={showingCategory} />
                }
                {TabName === 'Course Details' && <div>

                    <div className=' mt-5 lg:grid grid-cols-2 bg-gray-200 p-5 rounded-2xl gap-4'>
                        {

                            courseSemesters.map((semester, idx) =>
                                <div className='flex items-center gap-2' key={semester._id}>
                                    <div><MdOutlineCheckBoxOutlineBlank /></div>
                                    <p>{semester?.semesterTitle}</p>
                                </div>
                            )
                        }
                        {
                            courseSemesters?.length < 1 && <p className='py-5 text-center'>No Class Available!!</p>
                        }
                    </div>
                </div>}
            </div>

            <p className="text-xs lg:text-4xl text-center text-secondary font-bold mt-5">What you will get <span className='text-primary'>from this course</span></p>

            <div className="lg:my-8 ">
                {/* <p className="text-primary font-bold text-xl lg:text-3xl text-center">Cerrtificate</p> */}
                <div className="w-11/12 mx-auto flex justify-center mt-2">
                    <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1728218178/UniverseIT/nitgzsu14eguukizmcch.jpg" alt="" className='w-1/2 rounded-2xl' />
                </div>
            </div>


            <p className="text-secondary font-bold text-xs mt-3 lg:text-3xl text-center lg:my-14">Listen From Our <span className="text-primary">Learner</span></p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {filteredSuccessStories?.map(story =>
                    <div key={story?._id} className="border p-2 rounded-xl">
                        <div className="avatar  ">
                            <div className="ring-primary ring-offset-base-100 w-14 mt-2 rounded-full ring ring-offset-2">
                                <img src={story?.image} />
                            </div>
                        </div>
                        <p className="font-body mt-2 text-xs">{story?.description.slice(0, 300)}</p>
                    </div>
                )

                }
            </div>
        </>
    );
};

export default CourseDetailsTab;