import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaBook, FaBookReader, FaBriefcase, FaPeopleArrows, FaSwatchbook, FaUser, FaUserCog } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Loading from '../../../Shared/Loading/Loading';
import { Link } from 'react-router-dom';
import { GiTeacher } from 'react-icons/gi';
import { FaLandMineOn, FaUsersLine } from 'react-icons/fa6';
import { RiFunctionFill } from 'react-icons/ri';

const Profile = () => {

  const axiosPublic = useAxiosPublic();
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await axiosPublic.get('/course');
      return res.data;
    }
  })


  // Faculty Data 
  const { data: faculties = [] } = useQuery({
    queryKey: ['faculties'],
    queryFn: async () => {
      const res = await axiosPublic.get('/faculty');
      return res.data;
    }
  })




  // Executive Members 
  const { data: members = [] } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosPublic.get('/team-member');
      return res.data;
    }
  })



  // Admission Requests

  const { data: admissionRequests = [] } = useQuery({
    queryKey: ['admissionRequests'],
    queryFn: async () => {
      const res = await axiosPublic.get('/admission');
      return res.data;
    }
  })


  // seminar request 
  const { data: seminarRequests = [] } = useQuery({
    queryKey: ['seminarRequests'],
    queryFn: async () => {
      const res = await axiosPublic.get('/seminarRequest');
      return res.data;
    }
  })

  // job request 
  const { data: jobRequests = [] } = useQuery({
    queryKey: ['jobRequests'],
    queryFn: async () => {
      const res = await axiosPublic.get('/apply-job');
      return res.data;
    }
  })

  // representative

  const { data: contents = [], refetch } = useQuery({
    queryKey: ['all data'],
    queryFn: async () => {
      const res = await axiosPublic.get('/users');
      return res.data;
    }
  })

  const representatives = contents?.filter(item => item.hasOwnProperty('representative'));

  //Admin
  const Admin = contents.filter(user => !user.hasOwnProperty('representative'));

  if (isLoading) {
    return <Loading />
  }


  return (
    <>
      <Helmet>
        <title>Dashboard </title>
      </Helmet>

      <div className="grid lg:grid-cols-3 gap-5 m-3">





        <Link to="/dashboard/manageCourses">
          <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
            <div className="bg-primary text-white shadow-sm  p-5 border rounded-full text-3xl ">
              <FaBookReader />
            </div>
            <div className="">
              <p className='text-3xl text-primary font-semibold'>{courses.length}</p>
              <p className='text-pretty text-gray-500'>Total Courses</p>
            </div>
          </div>
        </Link>

        <Link to="/dashboard/manageFaculty">
          <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
            <div className="bg-primary text-white shadow-sm border p-5 border rounded-full text-3xl ">
              <GiTeacher />
            </div>
            <div className="">
              <p className='text-3xl text-primary font-semibold'>{faculties.length}</p>
              <p className='text-pretty text-gray-500'>Total Teachers</p>
            </div>
          </div>
        </Link>


        <Link to="/dashboard/manage-member">
          <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
            <div className="bg-primary text-white shadow-sm  p-5 border rounded-full text-3xl ">
              <FaUserCog />
            </div>
            <div className="">
              <p className='text-3xl text-primary font-semibold'>{members.length}</p>
              <p className='text-pretty text-gray-500'>Total Executive Members</p>
            </div>
          </div>
        </Link>


        <Link to={"/dashboard/manage-job"}>
          <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
            <div className="bg-primary text-white shadow-sm  p-5 border rounded-full text-3xl ">
              <FaBriefcase />
            </div>
            <div className="">
              <p className='text-3xl text-primary font-semibold'>{jobRequests.length}</p>
              <p className='text-pretty text-gray-500'>Total Job Requests</p>
            </div>
          </div>
        </Link>



        <Link to="/dashboard/admissionRequest">
          <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
            <div className="bg-primary text-white shadow-sm  p-5 border rounded-full text-3xl ">
              <FaUsersLine />
            </div>
            <div className="">
              <p className='text-3xl text-primary font-semibold'>{admissionRequests.length}</p>
              <p className='text-pretty text-gray-500'>Total Admission Requests</p>
            </div>
          </div>
        </Link>

        <Link to="/dashboard/seminar">
          <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
            <div className="bg-primary text-white shadow-sm border p-5 border rounded-full text-3xl ">
              <RiFunctionFill />
            </div>
            <div className="">
              <p className='text-3xl text-primary font-semibold'>{seminarRequests.length}</p>
              <p className='text-pretty text-gray-500'>Total Seminars Requests</p>
            </div>
          </div>
        </Link>

        <Link to="/dashboard/manage-representative">
          <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
            <div className="bg-primary text-white shadow-sm border p-5  rounded-full text-3xl ">
              <FaPeopleArrows></FaPeopleArrows>
            </div>
            <div className="">
              <p className='text-3xl text-primary font-semibold'>{representatives?.length}</p>
              <p className='text-pretty text-gray-500'>Total Representatives</p>
            </div>
          </div>
        </Link>

        <Link to="/dashboard/manageUsers">
          <div className="bg-white flex justify-around items-center rounded-lg py-5 shadow-sm shadow-secondary">
            <div className="bg-primary text-white shadow-sm border p-5  rounded-full text-3xl ">
              <FaUserCog></FaUserCog>
            </div>
            <div className="">
              <p className='text-3xl text-primary font-semibold'>{Admin?.length}</p>
              <p className='text-pretty text-gray-500'>Total Admins</p>
            </div>
          </div>
        </Link>






      </div>


    </>
  );
};

export default Profile;