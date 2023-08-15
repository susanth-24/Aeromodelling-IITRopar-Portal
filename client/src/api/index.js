import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);


export const deleteUser = (id) => API.delete(`/user/${id}`);
export const userprofile = (id) => API.get(`/user/profile/${id}`)
export const signIn = (formData) => API.post('user/signin', formData);
export const signUp = (formData) => API.post('user/signup', formData);

export const createBlog=(newBlog)=>API.post('/blog',newBlog);
export const fetchBlogs=()=>API.get('/blog');
export const fetchBlog=(id)=>API.get(`/blog/${id}`);
export const updateBlog=(id,updatedBlog)=>API.patch(`/blog/${id}`,updatedBlog);
export const commentBlog = (commenter, comment, id) => API.post(`/blog/${id}/commentBlog`, { commenter, comment });
export const fetchBlogsBySearch = (searchQuery) => API.get(`/blog/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const createRequest=(request)=>API.post('/requests',request);
export const fetchRequests=()=>API.get('/requests');
export const submitEqip=(id,sub)=>API.patch(`/requests/${id}`,sub);
export const acceptReq=(id)=>API.patch(`/requests/${id}/accept`)
export const rejectReq=(id)=>API.patch(`/requests/${id}/reject`)