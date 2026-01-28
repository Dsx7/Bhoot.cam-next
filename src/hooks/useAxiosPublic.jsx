import axios from "axios";

const axiosPublic = axios.create({
  // CHANGE: Use process.env instead of import.meta.env
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", 
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;