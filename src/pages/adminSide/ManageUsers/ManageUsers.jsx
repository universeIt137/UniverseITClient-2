import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const ManageUsers = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allUsers = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })

    const users = allUsers.filter(user => !user.hasOwnProperty('representative'));
    // console.log(users);
    if (isLoading) {
        return ''
    }
    const handleOfficialStateChange = (data) => {
        // console.log(data);
        const id = data?._id;
        const admin = !data?.admin;
        const newData = { id, admin }
        console.log(newData);
        const toastId = toast.loading("User Role Changing...");
        axiosPublic.put('/users/role/admin', newData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Role has changed!!", { id: toastId });
                }
                refetch()
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            })

    };




    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "User Deleted from database",
                                icon: "success"
                            });
                            refetch();
                        }
                    })


            }
        });
    }
    return (
        <>
            <Helmet>
                <title>Dashboard | Manage Users</title>
            </Helmet>
            <div className="bg-white p-5 rounded-lg w-full lg:w-[calc(100vw-300px)] mx-auto">
                <p className='text-2xl font-bold text-center'>Manage Users</p>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Profile</th>
                                <th>Admin</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((item, index) =>
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button

                                                className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                                            >
                                                <Link to={`/dashboard/details-representative/${item?._id}`}>Profile</Link>
                                            </button>
                                        </td>
                                        <td className="font-bold">
                                            <div className="form-control">
                                                <div className="flex items-center gap-2">
                                                    <label className="label cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="toggle toggle-success toggle-sm"
                                                            checked={item?.admin || false}
                                                            onChange={() => handleOfficialStateChange(item)}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </td>




                                        <td
                                            onClick={() => handleDelete(item?._id)}
                                            className='text-2xl text-red-500  cursor-pointer'><MdDelete /></td>
                                    </tr>
                                )
                            }





                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageUsers;