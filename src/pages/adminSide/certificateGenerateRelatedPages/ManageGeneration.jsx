import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { uploadImg } from '../../../UploadFile/uploadImg';
import GenerationTable from './GenerationTable';


const ManageGeneration = () => {

    const axiosPublic = useAxiosPublic();
    const { data: contents = [], refetch } = useQuery({
        queryKey: ['something'],
        queryFn: async () => {
            const res = await axiosPublic.get('/certificate-generate');
            return res.data;
        }
    })
   

    




    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const hours = form.hours.value;
        const course_category = form.course_category.value;
        const course_name = form.course_name.value;
        const student_ID = form.student_ID.value;
        const duration = form.duration.value;
        const year = form.year.value;
        const date_of_issue = form.date_of_issue.value;
       
        const image = form.image.files[0];
       




        let qr_code_url = ''
        if (!image?.name) {
            qr_code_url = ''
        } else {
            qr_code_url = await uploadImg(image);

        }

        

        setLoading(true);

        // Simulate form submission
        try {
            const data = { name, hours, course_category, course_name, student_ID, duration, year, qr_code_url, date_of_issue }

            console.log(data);
            axiosPublic.post(`/certificate-generate`, data)
                .then(res => {
                    if (res) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Data has been saved",
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
        <div>
            <div className="w-10/12 mx-auto p-4">
                <Helmet>
                    <title>Dashboard | Manage Representative</title>
                </Helmet>
                <h2 className="text-2xl font-semibold mb-4">Upload Student Info</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {loading && <p className="text-blue-500">Uploading data...</p>}

                    <div className="grid lg:grid-cols-3 gap-4">
                        <div className="">
                            <label htmlFor="name">Name</label>
                            <input type="text" required name="name" className="w-full px-4 py-2 border rounded-md" />
                        </div>
                        <div className="">
                            <label htmlFor="name">Course Hours</label>
                            <input type="text" name="hours" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        <div className="">
                            <label htmlFor="name">Course Category</label>
                            <input type="text" name="course_category" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        <div className="">
                            <label htmlFor="name">Course Name</label>
                            <input type="text" name="course_name" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        <div className="">
                            <label htmlFor="name">Student ID</label>
                            <input type="text" name="student_ID" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        <div className="">
                            <label htmlFor="name">Month Duration</label>
                            <input type="text" name="duration" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        <div className="">
                            <label htmlFor="name">Year</label>
                            <input type="text" name="year" className="w-full px-4 py-2 border rounded-md" />
                        </div>
                        
                        <div className="">
                            <label htmlFor="name">Date of Issue</label>
                            <input type="text" name="date_of_issue" className="w-full px-4 py-2 border rounded-md" />
                        </div>
                        

                        <div className=" w-full">
                            <div className="relative">
                                <p>Upload  Picture</p>
                                <input type="file" name='image' className="file-input file-input-bordered file-input-md w-full " placeholder="Upload website logo" />
                            </div>


                        </div>

                        {/* Video */}
                        

                    </div>

                    
                    <div className="w-1/4 mx-auto">
                        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
                            {loading ? "Uploading..." : "Submit"}
                        </button>
                    </div>
                </form>


            </div>
            {
                contents ? <GenerationTable allData={contents} refetch={refetch}></GenerationTable> : <></>
            }
        </div>
    );
};

export default ManageGeneration;