import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getUser = (userId) => API.get(`/user/${userId}`);
export const getUserList = () => API.get('/user/userlist');
export const getAdminList = () => API.get('/user/adminlist');
export const getUserCount = () => API.get('/user/count');
export const getAdminCount = () => API.get('/user/admincount');
export const getUserRegistrationStats = () => API.get('/user/stats');
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUser = () => API.get('/user')
export const followUser = (id,data)=> API.put(`/user/${id}/follow`, data)
export const unFollowUser = (id, data)=> API.put(`/user/${id}/unfollow`, data)