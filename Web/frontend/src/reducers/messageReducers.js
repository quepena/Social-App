// import { 
//     CONVERSATION_LIST_FAIL,
//     CONVERSATION_LIST_REQUEST, 
//     CONVERSATION_LIST_SUCCESS,
//     MESSAGE_LIST_FAIL,
//     MESSAGE_LIST_REQUEST,
//     MESSAGE_LIST_SUCCESS, 
// } from "../constants/messageConstants";

// export const conversationListReducer = (state = { conversations: [] }, action) => {
//     switch (action.type) {
//         case CONVERSATION_LIST_REQUEST:
//             return { loading: true }
//         case CONVERSATION_LIST_SUCCESS:
//             return { loading: false, conversations: action.payload }
//         case CONVERSATION_LIST_FAIL:
//             return { loading: false, error: action.payload }
//         default:
//             return state;
//     }
// }

// export const messageListReducer = (state = { messages: [] }, action) => {
//     switch (action.type) {
//         case MESSAGE_LIST_REQUEST:
//             return { loading: true }
//         case MESSAGE_LIST_SUCCESS:
//             return { loading: false, messages: action.payload }
//         case MESSAGE_LIST_FAIL:
//             return { loading: false, error: action.payload }
//         default:
//             return state;
//     }
// }