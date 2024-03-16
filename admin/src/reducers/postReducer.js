const postReducer = (
    state = { posts: [], loading: false, error: false, uploading: false },
    action
    
) => {
    switch (action.type) {
        case "UPLOAD_START":
            return { ...state, uploading: true, error: false }
        case "UPLOAD_SUCCESS":
            return {
                ...state, posts: [action.data, ...state.posts], uploading: false, error: false
                    }
        case "UPLOAD_FAIL":
            return{...state,uploading:false,error:true}
        
        case "RETREIVING_START":
            return { ...state, loading: true, error: false };
        case "RETREIVING_SUCCESS":
            return { ...state, posts: action.data, loading: false, error: false };
        case "RETREIVING_FAIL":
            return { ...state, loading: false, error: true };
        case "GET_POST_COUNT_SUCCESS":
            return { ...state, postCount: action.count };         
        case "GET_POST_LIST_SUCCESS":
            return { ...state, posts: action.posts };
        case "GET_POST_LIST_FAILURE":
            return { ...state, error: action.error };
        default:
            return state;
    }
}
export default postReducer