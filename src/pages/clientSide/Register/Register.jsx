/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import useAuth from "../../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import auth from "../../../firebase/firebase.init";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Register = () => {
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const { createUser } = useAuth()

    const { register, handleSubmit, formState: { errors }, reset } = useForm()


    const onSubmit = async ({ name, email, password }) => {
        const toastId = toast.loading("Registering...");
        createUser(email, password)
            .then(res => {
                updateProfile(auth.currentUser, {
                    displayName: name,

                })
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email,
                        }
                        axiosPublic.post('/register', userInfo)
                            .then(res => {
                                if (res.status == 200) {
                                    toast.success("Registered Successfully!!", { id: toastId });

                                    reset();
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

    }
    const inputStyle = 'w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
    const btnStyle = 'btn flex flex-col justify-center items-center px-7 py-1 rounded-md bg-primary text-white hover:font-bold transition-all duration-300 hover:bg-orange-700  active:bg-primary focus:outline-none focus:ring focus:ring-red-300 active:scale-90 focus:text-white w-max'
    const InputLabel = ({ text }) => {
        return <label className="leading-7 text-sm text-gray-600 font-bold">{text}</label>
    }
    return (
        <>
            <Helmet>
                <title>Universe IT | Admin Register</title>
            </Helmet>
            <div className="p-2 ">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[600px] mx-auto space-y-5 border m-4 p-5 shadow-lg rounded-lg">
                    <p className='text-center text-2xl font-bold pb-5'>
                       
                        <Link to={'/register'}> <span className=" hover:text-blue-500">  Admin Register </span> </Link>
                         
                    </p>
                    {/* your Name  */}
                    <div className="flex flex-col gap-2">
                        <InputLabel text={'Your Name'} />
                        <input type="text" className={`${inputStyle}`} placeholder="Name" {...register("name", { required: true })} />
                        <p className="text-sm text-red-500">{errors.name && 'Name is required'}</p>
                    </div>
                    {/* your Email  */}
                    <div className="flex flex-col gap-2">
                        <InputLabel text={`Your Email`} />
                        <input type="email" className={`${inputStyle}`} placeholder="Email" {...register("email", { required: true })} />
                        <p className="text-sm text-red-500">
                            {errors.email && 'Email is required'}
                        </p>
                    </div>
                    {/* password  */}
                    <div className="flex flex-col gap-2">
                        <InputLabel text={`Password`} />
                        <div className="flex">
                            <input type={showPass ? 'text' : 'password'} className={`${inputStyle} rounded-r-none border-r-0`} placeholder="Password" {...register("password", {
                                required: true,

                            })} />
                            <p onClick={() => setShowPass(!showPass)} className="text-xs font-medium uppercase bottom-[18px] right-2 p-1 cursor-pointer  hover:font-semibold w-[70px] border border-gray-500 flex justify-center items-center border-l-0 rounded-r-md">{showPass ? 'Hide' : 'Show'}</p>
                        </div>
                        <p className="text-sm text-red-500">
                            {errors?.password?.type === 'required' && 'Password invalid'}
                            {errors?.password?.type === 'minLength' && 'Password must be minimum 8 characters'}
                            {errors?.password?.type === 'maxLength' && 'Password must be maximum 20 characters'}
                            {errors?.password?.type === 'pattern' && 'Password must contain at least one digit, one lowercase letter, and one uppercase letter.'}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Already have an account? <Link to={'/login'}><span className="font-bold underline hover:text-primary">Log in</span></Link></p>
                    </div>

                    <div className="flex gap-3 items-center flex-col xs:flex-row">
                        <button className={`${btnStyle}`}>
                            Register
                        </button>

                    </div>
                </form>
            </div>
        </>
    );
};

export default Register; 