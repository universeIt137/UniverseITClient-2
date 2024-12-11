import { IoIosMail } from "react-icons/io";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
const AddressNavbar = () => {
    const [language, setLanguage] = useState('eng')
    const handleEnglishLanguage = () => setLanguage('eng')
    const handleBanglaLanguage = () => setLanguage('ban')
    const socialIconsStyle = `text-lg sm:text-sm size-7 sm:size-9 bg-white text-[#f49401] rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 active:scale-90`
    const socialIcons = <>
        <div className="flex justify-between w-full">
            <div className="flex gap-4 ">
                <Link to={"https://www.facebook.com/UniverseITInstitute"} target="_blank">
                    <p className={`${socialIconsStyle}`}><FaFacebookF /></p>
                </Link>

                <Link to={"https://www.linkedin.com/company/universe-it-institute/"} target="_blank">
                    <p className={`${socialIconsStyle}`}><FaLinkedinIn /></p>
                </Link>

                <Link to={"https://www.youtube.com/@universeitinstitute9947"} target="_blank">
                    <p className={`${socialIconsStyle}`}><IoLogoYoutube /></p>
                </Link>
            </div>
            {/* <div className="flex sm:hidden w-max h-10 px-4 bg-white  rounded-md  justify-center items-center gap-3">
                <button onClick={handleBanglaLanguage} className={`size-7  text-xs relative rounded-md transition-all duration-300 active:scale-90 ${language === 'ban' ? 'bg-text_color text-white font-bold' : 'text-primary'}`}>
                    <span className="absolute left-[4px] top-[3px]">অ</span>
                    <span className="absolute  right-[4px] bottom-[3px]">A</span>
                </button>
                <button onClick={handleEnglishLanguage} className={`size-7  text-center text-sm flex justify-center items-center rounded-md transition-all duration-300 active:scale-90 ${language === 'eng' ? 'bg-text_color text-white font-bold' : 'text-primary'}`}>
                    EN
                </button>
            </div> */}
        </div>
    </>
    return (
        <div className="w-full bg-primary text-white py-2 px-3 sm:px-10">
            <div className="flex justify-between items-center max-w-7xl mx-auto flex-wrap gap-4">
                <div className="hidden lg:flex gap-x-10 flex-col lg:flex-row">
                    <div className="flex items-center gap-2">
                        <IoIosMail className="text-xl" />
                        <p className="text-sm sm:text-base">universeitinstitute@gmail.com</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <BiSolidPhoneCall className="text-xl" />
                        <p className="text-sm sm:text-base">01886-061401</p>
                    </div>
                </div>
                <div className="flex gap-y-2 gap-x-4 sm:gap-10 flex-wrap">
                    <div className="w-full sm:w-max">{socialIcons}</div>
                    <dib className="flex gap-4 justify-between">
                        {/* <div className="hidden sm:flex h-10 px-4 bg-white  rounded-md  justify-center items-center gap-3">
                            <button onClick={handleBanglaLanguage} className={`size-7  text-xs relative rounded-md transition-all duration-300 active:scale-90 ${language === 'ban' ? 'bg-text_color text-white font-bold' : 'text-primary'}`}>
                                <span className="absolute left-[4px] top-[3px]">অ</span>
                                <span className="absolute  right-[4px] bottom-[3px]">A</span>
                            </button>
                            <button onClick={handleEnglishLanguage} className={`size-7  text-center text-sm flex justify-center items-center rounded-md transition-all duration-300 active:scale-90 ${language === 'eng' ? 'bg-text_color text-white font-bold' : 'text-primary'}`}>
                                EN
                            </button>
                        </div> */}
                        
                        <Link to={"/certified"}>
                            <button className="h-10 px-4 xs:px-7 bg-white text-primary rounded-md text-sm font-bold hover:text-white hover:bg-text_color">Certificate Verification</button>
                        </Link>

                    </dib>
                </div>
            </div>
        </div>
    );
};

export default AddressNavbar;