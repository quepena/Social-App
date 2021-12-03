import axios from "axios";
import { 
    ADMIN_USER_DELETE_FAIL,
    ADMIN_USER_DELETE_REQUEST,
    ADMIN_USER_DELETE_SUCCESS,
    ADMIN_USER_LIST_FAIL,
    ADMIN_USER_LIST_REQUEST, 
    ADMIN_USER_LIST_SUCCESS,
} from "../constants/adminConstants"

export const adminUsersList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_USER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/admin/users`, config);

        dispatch({
            type: ADMIN_USER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminUsersDelete = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_USER_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/admin/users/${id}`, config);

        dispatch({
            type: ADMIN_USER_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}