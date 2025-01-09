import axios from "axios";
const axiosPublic = axios.create({

    // baseURL: 'http://localhost:5000'

    // baseURL: 'https://universe-it-server.vercel.app'
    baseURL: 'https://servertwo.universeitinstitute.com'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic; 