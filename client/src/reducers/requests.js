import { ACCEPT_REQUEST, CREATE_REQUEST, FETCH_REQUESTS, REJECT_REQUEST, SUBMIT_EQUIP } from "../constants/actionTypes";

export default (state = { isLoading: true, requests: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case FETCH_REQUESTS:
            console.log(action.payload)
            return {
                ...state,
                requests: action.payload
            };
        case ACCEPT_REQUEST:
            return { ...state, requests: state.requests.requests.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case REJECT_REQUEST:
            return { ...state, requests: state.requests.requests.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case SUBMIT_EQUIP:
            return { ...state, requests: state.requests.requests.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case CREATE_REQUEST:

            return { ...state, requests: [...state.requests, action.payload] };



        default:
            return state;
    }
};