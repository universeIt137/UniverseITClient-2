import React, { useState } from 'react';
import { FaHome, FaUsers, FaWpforms } from 'react-icons/fa';
import { FaCircleUser, FaFileWaveform } from 'react-icons/fa6';
import { MdAdd, MdAddCircle, MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import { SiNginxproxymanager } from 'react-icons/si';
import Dropdown from './Dropdown';
import { FaRegComments } from "react-icons/fa";
import logo from '../../assets/logo/mainLogo.png'
import LogOut from '../../components/adminSide/LogOut/LogOut';
import { GrUserSettings } from 'react-icons/gr';
import useAdmin from '../../hooks/useAdmin';
import useRepresentative from '../../hooks/useRepresentative';
const Sidebar = () => {
  const [openBox, setOpenBox] = useState(null);
  const [isAdmin,] = useAdmin();
  const [isRepresentative,] = useRepresentative();
  const allUrls = [
    {
      name: 'Courses',
      data: <>
        <NavigationItem to="/dashboard/addCourse" icon={MdAddCircle} label="Add Courses" />
        <NavigationItem to="/dashboard/course-category" icon={MdAddCircle} label="Course Category" />
        <NavigationItem to="/dashboard/manageCourses" icon={SiNginxproxymanager} label="Manage Courses" />
      </>
    },
    {
      name: 'Careers',
      data: <>
        <NavigationItem to="/dashboard/add-career" icon={MdAddCircle} label="Add Career" />
        <NavigationItem to="/dashboard/manage-career" icon={SiNginxproxymanager} label="Manage Career" />
      </>
    },
    {
      name: 'Blogs',
      data: <>
        <NavigationItem to="/dashboard/addBlog" icon={MdAddCircle} label="Add Blog" />
        <NavigationItem to="/dashboard/manageBlog" icon={SiNginxproxymanager} label="Manage Blogs" />
      </>
    },
    {
      name: 'Comments',
      data: <>
        <NavigationItem to="/dashboard/manageComments" icon={FaRegComments} label="Manage Comments" />
      </>
    },
    {
      name: 'Website content',
      data: <>
        <NavigationItem to="/dashboard/manageHomepageContent" icon={SiNginxproxymanager} label="Manage Website Content" />
        <NavigationItem to="/dashboard/manageCountDown" icon={SiNginxproxymanager} label="Manage CountDown" />
      </>
    },

    {
      name: 'Faculty',
      data: <>
        <NavigationItem to="/dashboard/addFaculty" icon={MdAddCircle} label="Add Faculty" />
        <NavigationItem to="/dashboard/manageFaculty" icon={SiNginxproxymanager} label="Manage Faculty" />
      </>
    },
    {
      name: 'Executive Member',
      data: <>
        <NavigationItem to="/dashboard/add-member" icon={MdAddCircle} label="Add Member" />
        <NavigationItem to="/dashboard/manage-member" icon={SiNginxproxymanager} label="Manage Member" />
      </>
    },
    {
      name: 'Representative Members',
      data: <>
        <NavigationItem to="/dashboard/add-representative" icon={MdAddCircle} label="Add Representative" />
        <NavigationItem to="/dashboard/manage-representative" icon={MdAddCircle} label="Manage Representative" />
      </>
    },
    {
      name: 'Testimonial',
      data: <>
        <NavigationItem to="/dashboard/addTestimonial" icon={MdAddCircle} label="Add Testimonial" />
        <NavigationItem to="/dashboard/manageTestimonial" icon={SiNginxproxymanager} label="Manage Testimonial" />
      </>
    },
    {
      name: 'Photo Gallery',
      data: <>
        <NavigationItem to="/dashboard/managePhotoGallary" icon={SiNginxproxymanager} label="Manage Photo Gallary" />
      </>
    },
    {
      name: 'All Requests',
      data: <>
        <NavigationItem to="/dashboard/admissionRequest" icon={FaFileWaveform} label="Admission Requests" />
        <NavigationItem to="/dashboard/seminar" icon={FaUsers} label="Seminar Requests" />
        <NavigationItem to="/dashboard/manage-job" icon={FaUsers} label="Job Requests" />
      </>
    },
    {
      name: 'Seminar',
      data: <>
        <NavigationItem to="/dashboard/createSeminar" icon={MdAddCircle} label="Create Seminar" />
        <NavigationItem to="/dashboard/manageSeminar" icon={SiNginxproxymanager} label="Manage Seminar" />
      </>
    },
    {
      name: 'Certificate',
      data: <>
        <NavigationItem to="/dashboard/createCertificate" icon={MdAddCircle} label="Create Certificate" />
        <NavigationItem to="/dashboard/manageCertificate" icon={SiNginxproxymanager} label="Manage Certificate" />
      </>
    },
    {
      name: 'Generate Certificate',
      data: <>
        <NavigationItem to="/dashboard/manage-generation" icon={SiNginxproxymanager} label="Manage Generation" />
      </>
    },
    {
      name: 'Feedback',
      data: <>
        <NavigationItem to="/dashboard/add-feedback" icon={MdAddCircle} label="Add Feedback" />
        <NavigationItem to="/dashboard/manage-feedback" icon={SiNginxproxymanager} label="Manage Feedback" />
      </>
    },
    {
      name: 'Manage Users',
      data: <>
        <NavigationItem to="/dashboard/manageUsers" icon={GrUserSettings} label="Manage Users" />
      </>
    }
  ];

  const representativeUrls = [
    {
      name: 'Blogs',
      data: <>
        <NavigationItem to="/dashboard/addBlog" icon={MdAddCircle} label="Add Blog" />

        <NavigationItem to="/dashboard/manageBlogRep" icon={SiNginxproxymanager} label="Manage Blogs" />
      </>
    },
  ]

  return (
    <>
      <div className="w-64 lg:w-64 bg-white flex flex-col justify-start py-8 border rounded-lg h-screen lg:overflow-x-auto">
        <Link to="/">
          <div className="mb-5 w-1/2 mx-auto">
            <img
              src={logo}
              className="text-center w-full object-cover max-w-[200px]"
              alt=""
            />
          </div>
        </Link>


        <nav className="flex-1 p-4">
          <ul className="space-y-2 pb-20 list-none">
            {/* <NavigationItem to="/dashboard" icon={FaHome} label="Dashboard" /> */}




            {
              isAdmin &&
              <>
                <NavigationItem
                  to="/dashboard/statistics"
                  icon={FaCircleUser}
                  label="Statistic"
                />
                {
                  allUrls.map((item, idx) => <li key={idx} className="mb-4">
                    <Dropdown buttonText={item.name} urls={item.data} openBox={openBox} setOpenBox={setOpenBox} id={idx} />
                  </li>)
                }
              </>
            }



            {
              isRepresentative &&
              <>
                {
                  representativeUrls.map((item, idx) => <li key={idx} className="mb-4">
                    <Dropdown buttonText={item.name} urls={item.data} openBox={openBox} setOpenBox={setOpenBox} id={idx} />
                  </li>)
                }
              </>
            }

            <div className='ml-4'>   <LogOut /></div>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;