import axios from 'axios';


export const profile_URL = "http://localhost:3300/api/v1/employ";
export const job_URL = "http://localhost:3300/api/v1/rrjob"


// instance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config; // <- must always return config
//     },
//     (error) => Promise.reject(error)
// );
// instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             // Token expired or invalid
//             store.dispatch(logout());  
//             window.location.href = "/login";  // redirect user
//         }
//         return Promise.reject(error);
//     }
// );

// export default instance;
