import { 
    ADMIN_USER_LIST_FAIL,
    ADMIN_USER_LIST_REQUEST, 
    ADMIN_USER_LIST_SUCCESS,
    ADMIN_USER_LIST_RESET,
    ADMIN_USER_DELETE_REQUEST,
    ADMIN_USER_DELETE_SUCCESS,
    ADMIN_USER_DELETE_FAIL
} from "../constants/adminConstants";

export const adminUsersListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ADMIN_USER_LIST_REQUEST:
            return { loading: true }
        case ADMIN_USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case ADMIN_USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case ADMIN_USER_LIST_RESET:
            return { users: [] }
        default:
            return state;
    }
}

export const adminUsersDeleteReducer = (state = { }, action) => {
    switch (action.type) {
        case ADMIN_USER_DELETE_REQUEST:
            return { loading: true }
        case ADMIN_USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case ADMIN_USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}