import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebase.config"; // Make sure path is correct

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 1. REQUEST INTERCEPTOR (Attaches Token)
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const token = await auth.currentUser?.getIdToken();
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 2. RESPONSE INTERCEPTOR (Handles 401/403 Errors)
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        // If server says "Unauthorized" (401) or "Forbidden" (403), log user out
        if (status === 401 || status === 403) {
          await logOut();
          router.push('/login');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup
    return () => {
        axiosSecure.interceptors.request.eject(requestInterceptor);
        axiosSecure.interceptors.response.eject(responseInterceptor);
    }
  }, [logOut, router]);

  return axiosSecure;
};

export default useAxiosSecure;