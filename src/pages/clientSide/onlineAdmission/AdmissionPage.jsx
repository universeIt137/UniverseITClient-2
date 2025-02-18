

// import required modules
import { Helmet } from 'react-helmet-async';

import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import logo from '../../../assets/logo/mainLogo.png'
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import Loading from '../../../Shared/Loading/Loading';
import Swal from 'sweetalert2';
import { useState } from 'react';

const AdmissionPage = () => {
    const axiosPublic = useAxiosPublic();
    const {show, setShow} = useState(false);
    const { data: courses = [], refetch: coursesRefetch, isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/course');
            return res.data;
        }
    })
    if (isLoading) {
        return <Loading />
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const payment_number = form.payment_number.value;
        const course = form.course.value;
        const gender = form.gender.value;
        const transaction_id = form.transaction_id.value;
        const address = form.address.value;

        const theCourse = courses.find(item => item._id === course)
        const data = { name, payment_number, course: theCourse?.title, courseId: theCourse?._id, gender, transaction_id, address };
        console.log(data);

        axiosPublic.post('/admission', data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                   
                    // toast.success('Admission request added successfully')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Admission request added successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
                
            })
            .catch()
        form.reset();


    }
    return (
        <>
            <Helmet>
                <title>Universe IT | Online Admission</title>
            </Helmet>

            <p className='text-secondary text-4xl text-center my-5 font-bold underline'>Payment <span className='text-primary '>Procedure</span></p>
            <div className="grid lg:grid-cols-3 lg:gap-20 gap-5 lg:my-20 border rounded-lg w-10/12 mx-auto lg:p-10 p-1 shadow-lg grid-cols-1">
                
                {/* Bkash card  */}
                <div className="card bg-base-100  shadow-xl border">
                    <figure className='h-1/2'>
                        <img
                            src="https://res.cloudinary.com/dxvacpgrv/image/upload/v1735806271/universeIT/kga4dufpvazdrzta3i3w.png"
                            alt="Bkash Merchant" className='w-1/2 lg:w-full' />
                    </figure>
                    <div className="card-body">
                        <h2 className="lg:card-title text-xs text-pink-600">Bkash Payment Method</h2>
                        <p className='text-secondary text-xs lg:font-body font-semibold'>Merchant No: 01886061401</p>
                        <div className="card-actions justify-end">
                            <button className="lg:btn p-1 rounded-lg bg-pink-400 lg:bg-pink-600 text-white lg:text-white text-xs" onClick={() => document.getElementById('my_modal_4').showModal()}>Payment</button>
                        </div>
                    </div>
                </div>

                {/* Nogod card  */}
                <div className="card bg-base-100  shadow-xl border">
                    <figure className='h-1/2'>
                        <img
                            src="https://res.cloudinary.com/dxvacpgrv/image/upload/v1735806320/universeIT/ksaiqyvdarabtgziioui.jpg"
                            alt="Nogod Merchant" className='w-1/2 lg:w-full' />
                    </figure>
                    <div className="card-body">
                        <h2 className="lg:card-title text-xs text-pink-600">Nogod Payment Method</h2>
                        <p className='text-secondary text-xs lg:font-body font-semibold'>Merchant No: 01839702200</p>
                        <div className="card-actions justify-end">
                            <button className="lg:btn p-1 rounded-lg bg-primary lg:bg-primary text-white lg:text-white text-xs" onClick={() => document.getElementById('my_modal_4').showModal()}>Payment</button>
                        </div>
                    </div>
                </div>

                {/* Duch Bangla card  */}

                <div className="card bg-base-100  shadow-xl border">
                    <figure className='h-1/2'>
                        <img
                            src="https://res.cloudinary.com/dxvacpgrv/image/upload/v1735806487/universeIT/urk15uz7zivifpwyb7du.jpg"
                            alt="DuchBangla Merchant" className='w-1/2 lg:w-full' />
                    </figure>
                    <div className="card-body">
                        <h2 className="lg:card-title text-xs text-secondary">Duch Bangla Payment</h2>
                        <p className='text-secondary text-xs lg:font-body font-semibold'>A/C: 3031100005674</p>
                        <div className="card-actions justify-end">
                            <button className="lg:btn p-1 rounded-lg bg-secondary lg:bg-secondary text-white lg:text-white text-xs" onClick={() => document.getElementById('my_modal_4').showModal()}>Payment</button>
                        </div>
                    </div>
                </div>



                
              

                
                

               

                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        
                        <section>
                            <div className=' text-white px-10 '>
                                <div className='flex justify-center items-center pt-1'>
                                    <img src={logo} className='w-32
                    p-2' alt="" />
                                </div>

                                <div className='text-black'>
                                    <h2 className='lg:text-3xl font-bold text-center'>Online Admission Form</h2>
                                </div>

                                {/* form section  */}
                                <div className=''>

                                    <section className="text-gray-600 body-font relative">
                                        <div className="container lg:px-5  mx-auto">
                                            <div className="flex flex-col text-center w-full ">
                                                <p className="lg:w-full mx-auto  leading-relaxed text-[10px] lg:text-[12px] lg:text-sm pb-2">Unlock Your Creative Potential and Transform Your Fashion Dreams into Reality—Enroll Today!</p>
                                                <p className='text-[10px] lg:text-[12px] lg:text-sm  '>Bkash Merchant No: 01886061401</p>
                                                <p className='text-[10px] lg:text-[12px] lg:text-sm '>Nogod Merchant No: 01839702200</p>
                                                <p className='text-[10px] lg:text-[12px] lg:text-sm '>DBBL A/C: 3031100005674</p>
                                            </div>
                                            <div className="lg:w-full md:w-full mx-auto bg-white py-5 rounded-xl">

                                                <div className="lg:border lg:p-4 rounded-2xl">
                                                    <form action="" onSubmit={handleSubmit} className=' w-full -m-2'>
                                                        <div className=' mx-auto'>
                                                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                                                {/* name  */}
                                                                <div className="p-2 w-full">
                                                                    <div className="relative">
                                                                        <label className="leading-7 text-[12px] lg:text-sm text-gray-600">Name</label>
                                                                        <input required type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                                    </div>
                                                                </div>
                                                                {/* Payment Number  */}
                                                                <div className="p-2 w-full">
                                                                    <div className="relative">
                                                                        <label className="leading-7 text-[12px] lg:text-sm text-gray-600">Payment Number</label>
                                                                        <input required type="text" id="payment_number" name="payment_number" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                                    </div>
                                                                </div>
                                                                {/* course  */}
                                                                <div className='p-2 w-full'>
                                                                    <label className="text-[12px] lg:text-sm">Select course</label>
                                                                    <select required name='course' className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] lg:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-2">

                                                                        <option value="" defaultChecked>Select Course</option>
                                                                        {
                                                                            courses?.map(course => <option key={course?._id} value={course?._id} defaultChecked>{course.title}</option>)
                                                                        }


                                                                    </select>
                                                                </div>


                                                                {/* Transaction ID  */}
                                                                <div className="p-2 w-full">
                                                                    <div className="relative">
                                                                        <label className="leading-7 text-[12px] lg:text-sm text-gray-600">Transaction ID</label>
                                                                        <input required type="text" name="transaction_id" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                                    </div>
                                                                </div>
                                                                {/* address  */}
                                                                <div className="p-2 w-full">
                                                                    <div className="relative">
                                                                        <label className="leading-7 text-[12px] lg:text-sm text-gray-600">Present Address</label>
                                                                        <input required type="text" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                                    </div>
                                                                </div>

                                                                {/* Gender  */}
                                                                <div className='p-2 w-full'>
                                                                    <label className="text-[12px] lg:text-sm">Select Gender</label>
                                                                    <select required name='gender' className="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] lg:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-2">

                                                                        <option value="" defaultChecked>Select Gender</option>
                                                                        <option value="male">Male</option>
                                                                        <option value="female">Female</option>



                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>




                                                        {/* website  */}

                                                        <div className="p-2 flex justify-center items-center mx-auto">
                                                            <ButtonStrong text={'Submit'} />
                                                        </div>
                                                    </form>



                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </section>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}

                                <button className="btn bg-secondary text-white">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>


            </div>

        </>
    );
};

export default AdmissionPage;