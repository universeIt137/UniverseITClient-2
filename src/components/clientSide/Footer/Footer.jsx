import { IoIosCall, IoIosMail } from 'react-icons/io';
import logo from '../../../assets/logo/whiteLogo.png'
import { FaLinkedin, FaLocationDot } from "react-icons/fa6";
import { FaFacebook, FaGithubSquare, FaTwitterSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Footer = () => {

    const axiosPublic = useAxiosPublic();
    const formRef = useRef();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_saos63c', 'template_x1ajmyn', formRef.current, {
                publicKey: 'PbUISmrSE9uXrKvsb',
            })
            .then(
                () => {
                    setSuccess(true);
                    console.log('SUCCESS!');
                },
                (error) => {
                    setError(true);
                    console.log('FAILED...', error.text);
                },
            );
    };


    const { data: popularCategories = [], refetch } = useQuery({
        queryKey: ['popularCategories'],
        queryFn: async () => {
            const res = await axiosPublic('/popular-category');
            return res.data;
        }
    })


    return (
        <div className='bg-neutral'>
            <div className='max-w-7xl mx-auto'>
                <footer className="footer bg-neutral text-neutral-content p-10">
                    <form
                        ref={formRef}
                        onSubmit={sendEmail}
                    >
                        <img className='w-40' src={logo} alt="" />
                        <p className="max-w-[400px] font-medium text-gray-300">Universe IT Institute is dedicated to providing IT training that equips students with the skills and expertise to thrive in today's competitive marketplace.</p>
                        <fieldset className="form-control sm:w-80">
                            <div className="join">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="username@site.com"
                                    className="input input-bordered join-item  w-[80%]" />
                                <button className="btn btn-primary join-item  bg-primary/95 border-none hover:bg-primary px-1 sm:px-5">Subscribe</button>
                            </div>
                        </fieldset>
                        {error && <p className='text-white'>Error</p>}
                        {success && <p className='text-white'>Success</p>}
                    </form>
                    <nav className='max-w-[220px] text-sm'>
                        <h6 className="footer-title">Contact</h6>
                        <Link to={"/contact-us"}>Contact Us</Link>
                        <a className="link link-hover  flex gap-2"> <span className='pt-2'><FaLocationDot /></span>House# 39/C (Siraj Convention Center,Lift 4th floor),Main Road, Block-C,  Aftabnagar, Merul Badda,Dhaka , Dhaka, Bangladesh, 1212</a>
                        <a className="link link-hover flex gap-2">
                            <IoIosMail className="text-xl" />
                            universeitinstitute@gmail.com
                        </a>
                        <a className="link link-hover"><span className="flex items-center gap-2"><IoIosCall /> 01886-061401</span></a>
                        <a className="link link-hover"><span className="flex items-center gap-2"><IoIosCall /> 01821-779282</span></a>
                    </nav>
                    <div className="flex justify-between lg:gap-24  gap-10 lg:footer">
                        <div className="footer w-full">
                            <nav>
                                <h6 className="footer-title">Popular Courses</h6>
                                {
                                    popularCategories?.map((category) =>
                                        <Link to={`/courses/${category.popularCategory}`} key={category._id} className="link link-hover">{category.popularCategory}</Link>
                                    )
                                }

                            </nav>
                        </div>

                        <div className="footer">
                        <nav>
                            <h6 className="footer-title">Quick Link</h6>
                            <Link to={"/login"} className="link link-hover">Login</Link>
                            <Link to={"/register"} className="link link-hover">Register</Link>
                            <Link to={"/rep-register"} className="link link-hover">Representative Register</Link>
                            <Link to={"/aboutUs"} className="link link-hover">About us</Link>
                            <Link to={"/faculties"} className="link link-hover">Our faculty</Link>
                            <Link to={"/career"} className="link link-hover">Career</Link>
                            <Link to={"/blogs"} className="link link-hover">Blogs</Link>
                            <Link to={"/photoGallery"} className="link link-hover">Photo Gallery</Link>
                            <Link to={"/videoGallery"} className="link link-hover">Video Gallery</Link>
                        </nav>
                        </div>
                    </div>

                </footer>
                <footer className="footer bg-neutral text-neutral-content items-center p-4 px-10">
                    <aside className="grid-flow-col items-center">

                        <p>© {new Date().getFullYear()} Universe IT. All right reserved.</p>
                    </aside>
                    <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                        <Link to={"https://www.facebook.com/UniverseITInstitute"} target='_blank' className='text-2xl sm:text-3xl'>
                            <FaFacebook />
                        </Link>
                        <Link to={"https://www.linkedin.com/"} target='_blank' className='text-2xl sm:text-3xl'>
                            <FaLinkedin />
                        </Link>
                        <Link to={"https://x.com/?lang=en"} target='_blank' className='text-2xl sm:text-3xl'>
                            <FaTwitterSquare />
                        </Link>
                        <Link to={"https://github.com/universeIt137"} target='_blank' className='text-2xl sm:text-3xl'>
                            <FaGithubSquare />
                        </Link>
                    </nav>
                </footer>
            </div>
        </div>
    );
};

export default Footer;