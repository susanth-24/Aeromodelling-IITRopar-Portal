import * as api from "../api";
import { ACCEPT_REQUEST, CREATE_REQUEST, END_LOADING, FETCH_REQUESTS, REJECT_REQUEST, START_LOADING, SUBMIT_EQUIP} from "../constants/actionTypes";

export const createRequest = (post, history) => async (dispatch) => {
    try {
        const { data } = await api.createRequest(post);
        window.alert("Your Request has been submitted, wait for verification, incase of emergency contact club")
        history('/projects')
        dispatch({ type: CREATE_REQUEST, payload: data });
    } catch (error) {
        //throw error;
    }
}

export const getRequests = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchRequests();

        dispatch({ type: FETCH_REQUESTS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        //throw error;
    }
};


export const acceptRequest = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.acceptReq(id, user?.token);
        dispatch({ type: ACCEPT_REQUEST, payload: data });
    } catch (error) {
        //throw error;
    }
}
export const rejectRequest = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.rejectReq(id, user?.token);
        dispatch({ type: REJECT_REQUEST, payload: data });
    } catch (error) {
        //throw error;
    }
}

export const submitEqip = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.submitEqip(id, post);
      dispatch({ type: SUBMIT_EQUIP, payload: data });
    } catch (error) {
      //throw error;
    }
  }