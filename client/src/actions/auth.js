import * as api from '../api';
import { AUTH,SIGNUP, USER_PROFILE, DELETE_USER } from '../constants/actionTypes';

export const signin = (input, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(input);
        dispatch({ type: AUTH, data });
        history('/projects')
    } catch (error) {
        throw error;
    }
}
export const userProfile = (id) => async (dispatch) => {
    try {
        
        const { data } = await api.userprofile(id);

        dispatch({ type: USER_PROFILE, payload: { data } });
    } catch (error) {
        throw error
    }
}
export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
        throw error;
    }
}




export const signup = (input, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(input);
        dispatch({ type: SIGNUP, data });
        history('/projects')
    } catch (error) {
        throw error
    }
}
