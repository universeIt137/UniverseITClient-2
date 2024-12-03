/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import auth from "../../../firebase/firebase.init";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { uploadImg } from "../../../UploadFile/uploadImg";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const RepresentativeRegister = () => {
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const { createUser } = useAuth()
    const [showPass, setShowPass] = useState(false)


    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const password = form.password.value;
        const institute = form.institute.value;
        const division = form.division.value;
        const district = form.district.value;
        const semester = form.semester.value;
        const representative = false;

        const image = form.image.files[0];





        let ImageUrl = ''
        if (!image?.name) {
            ImageUrl = ''
        } else {
            ImageUrl = await uploadImg(image);
        }



        setLoading(true);

        // Simulate form submission

        const data = { name, phone, email, password, representative, institute, division, district, ImageUrl, semester }

        console.log(data);

        const toastId = toast.loading("Registering...");
        createUser(email, password)
            .then(res => {
                updateProfile(auth.currentUser, {
                    displayName: name,

                })
                    .then(() => {
                        
                        axiosPublic.post('/users/role/representative', data)
                            .then(res => {
                                if (res.status == 200) {
                                    toast.success("Registered Successfully!!", { id: toastId });

                                    form.reset();
                                    navigate('/')
                                }
                            })
                            .catch(err => {
                                toast.error(err?.message, { id: toastId });
                            })

                    })
                    .catch(err => {
                        toast.error(err?.message, { id: toastId });
                    })
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
                // setErr(err?.message)
            })

     

    };
    return (
        <>
            <Helmet>
                <title>Universe IT | Representative Register</title>
            </Helmet>
            <div className="lg:mt-20 h-[80vh]">
                <p className='text-center text-2xl font-bold pb-5'>

                   
                    <Link to={'/rep-register'}> <span className=" hover:text-blue-500"> Representative Register</span> </Link>
                </p>

                <div className="p-10 w-3/4 mx-auto border shadow-lg rounded-lg">

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {loading && <p className="text-blue-500">Uploading data...</p>}

                        <div className="grid lg:grid-cols-3 gap-4">
                            <div className="">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" className="w-full px-4 py-2 border rounded-md" />
                            </div>


                            <div className="">
                                <label htmlFor="name">Phone</label>
                                <input type="text" name="phone" className="w-full px-4 py-2 border rounded-md" />
                            </div>

                            <div className="">
                                <label htmlFor="name">Email</label>

                                <input type="email" name="email" className="w-full px-4 py-2 border rounded-md" />
                            </div>
                            {/* password  */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Pasword</label>
                                <div className="flex">
                                    <input type={showPass ? 'text' : 'password'} name="password" className={`w-full px-4 py-2 border rounded-md`} placeholder="Password" />
                                    <p onClick={() => setShowPass(!showPass)} className="text-xs font-medium uppercase bottom-[18px] right-2 p-1 cursor-pointer  hover:font-semibold w-[70px] border border-gray-500 flex justify-center items-center border-l-0 rounded-r-md">{showPass ? 'Hide' : 'Show'}</p>
                                </div>

                            </div>

                            <div className="">
                                <label htmlFor="name">Instittue</label>
                                <input type="text" name="institute" className="w-full px-4 py-2 border rounded-md" />
                            </div>

                            <div className="">
                                <label htmlFor="name">Division</label>
                                <input type="text" name="division" className="w-full px-4 py-2 border rounded-md" />
                            </div>

                            <div className="">
                                <label htmlFor="name">District</label>
                                <input type="text" name="district" className="w-full px-4 py-2 border rounded-md" />
                            </div>

                            <div className="">
                                <label htmlFor="name">Semester</label>
                                <input type="text" name="semester" className="w-full px-4 py-2 border rounded-md" />
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
                            <button type="submit" className="w-full py-2 bg-orange-500 text-white rounded-md">
                                {loading ? "Uploading..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RepresentativeRegister; 