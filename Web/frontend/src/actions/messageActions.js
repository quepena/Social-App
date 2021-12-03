// import axios from "axios";
// import { 
//     CONVERSATION_LIST_FAIL,
//     CONVERSATION_LIST_REQUEST, 
//     CONVERSATION_LIST_SUCCESS,
//     MESSAGE_LIST_FAIL,
//     MESSAGE_LIST_REQUEST,
//     MESSAGE_LIST_SUCCESS,
// } from "../constants/messageConstants";

// export const conversationsListByUser = (id) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: CONVERSATION_LIST_REQUEST
//         })

//         const { userLogin: { userInfo } } = getState();

//         const config = {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.get(`/api/conversations/${id}`, config);

//         dispatch({
//             type: CONVERSATION_LIST_SUCCESS,
//             payload: data
//         })
//     } catch (error) {
//         dispatch({
//             type: CONVERSATION_LIST_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message
//         })
//     }
// }

// export const messagesListByConversation = (id) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: MESSAGE_LIST_REQUEST
//         })

//         const { userLogin: { userInfo } } = getState();

//         const config = {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.get(`/api/messages/${id}`, config);

//         dispatch({
//             type: MESSAGE_LIST_SUCCESS,
//             payload: data
//         })
//     } catch (error) {
//         dispatch({
//             type: MESSAGE_LIST_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message
//         })
//     }
// }