import React from "react";
import {
    Drawer,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { FaAngleDown, FaHome, FaBlog, FaUsers, FaTrophy } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { IoSchool } from "react-icons/io5";
import { MdOutlineReviews, MdOutlineVideoLibrary } from "react-icons/md";
import { RiGalleryLine } from "react-icons/ri";

const NavBarDrawer = ({ open, setOpen }) => {
    const closeDrawer = () => setOpen(false);

    const navLi = [
        { name: "Home", link: "/", icon: <FaHome /> },
        { name: "About Us", link: "/aboutUs", icon: <IoIosPeople /> },
        { name: "Blogs", link: "/blogs", icon: <FaBlog /> },
        { name: "Faculties", link: "/faculties", icon: <FaUsers /> },
        { name: "Success Story", link: "/successStory", icon: <FaTrophy /> },
        { name: "Photo Gallery", link: "/photoGallery", icon: <RiGalleryLine /> },
        { name: "Video Gallery", link: "/videoGallery", icon: <MdOutlineVideoLibrary /> },
        { name: "Courses", link: "/courses", icon: <IoSchool /> },
        { name: "Student's Feedback", link: "/feedback", icon: <MdOutlineReviews /> },
    ];

    return (
        <>
            <Drawer open={open} onClose={closeDrawer} className="bg-white">
                <div className="bg-primary/20 h-full">
                    <div className="mb-2 flex items-center justify-between p-4">
                        <Typography variant="h5" className="text-text_color">
                            Universe IT Institute
                        </Typography>
                        <IconButton variant="text" className="text-text_color" onClick={closeDrawer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </IconButton>
                    </div>
                    <List>
                        {navLi.map((item, idx) => (
                            <NavLink
                                key={idx}
                                to={item.link}
                                onClick={closeDrawer} // Close drawer on nav item click
                            >
                                <ListItem className="hover:bg-text_color/20 focus:bg-text_color focus:text-white rounded-none">
                                    <ListItemPrefix>{item.icon}</ListItemPrefix>
                                    {item.name}
                                </ListItem>
                            </NavLink>
                        ))}
                    </List>
                </div>
            </Drawer>
        </>
    );
};

export default NavBarDrawer;
