import { COMMENT_BLOG, CREATE_BLOG, FETCH_BLOG, FETCH_BLOGS, FETCH_BLOG_SEARCH, UPDATE_BLOG } from "../constants/actionTypes";

export default (state = { isLoading: true, blogs: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case CREATE_BLOG:
            return { ...state, blogs: [...state.blogs, action.payload] }
        case FETCH_BLOGS:
            console.log(action.payload.data)
            return {
                ...state,
                blogs: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_BLOG:
            return { ...state, blog: action.payload.blog }
        case UPDATE_BLOG:
            return { ...state, blogs: state.blogs.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case COMMENT_BLOG:
            return {
                ...state, blogs: state.blogs.map((post) => {
                    if (post._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return post;
                    }
                })
            }

        case FETCH_BLOG_SEARCH:
            console.log( action.payload.data)
            return { ...state, blogs: action.payload.data };
        default:
            return state;
    }
}