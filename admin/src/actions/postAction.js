import * as PostsApi from '../api/PostRequest'

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const getPostCount = () => async (dispatch) => {
  try {
      const response = await PostsApi.getPostCount();
      dispatch({ type: "GET_POST_COUNT_SUCCESS", count: response.data.count });
  } catch (error) {
      dispatch({ type: "GET_POST_COUNT_FAILURE", error: error.message });
  }
}

export const getPostList = () => async (dispatch) => {
  try {
    const response = await PostsApi.getPostList();
    dispatch({ type: "GET_POST_LIST_SUCCESS", postList: response.data });
  } catch (error) {
    dispatch({ type: "GET_POST_LIST_FAILURE", error: error.message });
  }
}