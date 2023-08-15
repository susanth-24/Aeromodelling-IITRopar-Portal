import * as api from "../api";
import { COMMENT_BLOG, CREATE_BLOG, END_LOADING, FETCH_BLOG, FETCH_BLOGS, FETCH_BLOG_SEARCH, START_LOADING, UPDATE_BLOG } from "../constants/actionTypes";

export const createBlog = (blog, history) => async (dispatch) => {
    try {
        const { data } = await api.createBlog(blog);
        console.log(data);
        history(`/blogs/${data._id}`)
        dispatch({ type: CREATE_BLOG, payload: data });
    } catch (error) {
        //error
    }
}
export const getBlogs = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchBlogs(page);

        dispatch({ type: FETCH_BLOGS, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        //throw error;
    }
};

export const getBlog = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchBlog(id);
        dispatch({ type: FETCH_BLOG, payload: { blog: data } });
    } catch (error) {
        //throw error;
    }
};

export const updateBlog = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updateBlog(id, post);
        dispatch({ type: UPDATE_BLOG, payload: data });
    } catch (error) {
        //throw error;
    }
}
export const commentBlog = (commenter, comment, id) => async (dispatch) => {
    try {

        const { data } = await api.commentBlog(commenter, comment, id);
        console.log(data)
        console.log(data)
        dispatch({ type: COMMENT_BLOG, payload: data });
        return data.comments;
    } catch (error) {
        //throw error;
    }
};

export const getBlogsBySearch = (searchQuery) => async (dispatch) => {


    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchBlogsBySearch(searchQuery);
        dispatch({ type: FETCH_BLOG_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        //throw error;
        console.log("sfg")

    }
};
