import * as UserApi from "../api/UserRequest"

export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({ type: "UPDATING_START" })
    try {
        const { data } = await UserApi.updateUser(id, formData);
        dispatch({type:"UPDATING_SUCCESS",data:data})
    }
    catch (error) {
        dispatch({type:"UPDATING_FAIL"})
    }
}

export const followUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "FOLLOW_USER", data: id})
    UserApi.followUser(id, data)
}

export const unFollowUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "UNFOLLOW_USER", data: id})
    UserApi.unFollowUser(id, data)
}

export const getUserCount = () => async (dispatch) => {
    try {
        const response = await UserApi.getUserCount();
        dispatch({ type: "GET_USER_COUNT_SUCCESS", count: response.data.count });
    } catch (error) {
        dispatch({ type: "GET_USER_COUNT_FAILURE", error: error.message });
    }
}

export const getAdminCount = () => async (dispatch) => {
    try {
        const response = await UserApi.getAdminCount();
        dispatch({ type: "GET_ADMIN_COUNT_SUCCESS", count: response.data.count });
    } catch (error) {
        dispatch({ type: "GET_ADMIN_COUNT_FAILURE", error: error.message });
    }
}

export const getUserRegistrationState = () => async (dispatch) => {
    try {
        const response = await UserApi.getUserRegistrationStats();
        dispatch({
            type: "GET_USER_REGISTRATION_STATS_SUCCESS",
            registrationsLastMonth: response.data.registrationsLastMonth,
            registrationsLastWeek: response.data.registrationsLastWeek,
            registrationsLastDay: response.data.registrationsLastDay
        });
    } catch (error) {
        dispatch({ type: "GET_USER_REGISTRATION_STATS_FAILURE", error: error.message });
    }
}

export const getUserList = () => async (dispatch) => {
    try {
        const response = await UserApi.getUserList();
        dispatch({ type: "GET_USER_LIST_SUCCESS", userList: response.data });
    } catch (error) {
        dispatch({ type: "GET_USER_LIST_FAILURE", error: error.message });
    }

}

export const getAdminList = () => async (dispatch) => {
    try {
        const response = await UserApi.getAdminList();
        dispatch({ type: "GET_ADMIN_LIST_SUCCESS", adminList: response.data });
    } catch (error) {
        dispatch({ type: "GET_ADMIN_LIST_FAILURE", error: error.message });
    }

}