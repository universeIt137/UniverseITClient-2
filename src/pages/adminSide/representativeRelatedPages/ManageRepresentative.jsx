import React, { useState } from 'react';
import RepresentativeTable from './RepresentativeTable';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const ManageRepresentative = () => {
    const axiosPublic = useAxiosPublic();

    // Search state
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch data
    const { data: contents = [], refetch } = useQuery({
        queryKey: ['all data'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });

    // Filter only representatives
    const representatives = contents?.filter(item => item.hasOwnProperty('representative'));

    // Filter based on search term for `representative_id`
    const filteredRepresentatives = searchTerm
        ? representatives.filter(rep =>
              rep.representative_id.toLowerCase().includes(searchTerm.trim().toLowerCase())
          )
        : representatives;

    return (
        <div>
            <div className=" mx-auto">
                <Helmet>
                    <title>Dashboard | Manage Representative</title>
                </Helmet>

                {/* Search Input */}
                <div className="mb-4 flex justify-end  mr-12 mt-10">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Search by Representative ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Representative Table */}
                <RepresentativeTable contents={filteredRepresentatives} refetch={refetch} />
            </div>
        </div>
    );
};

export default ManageRepresentative;
