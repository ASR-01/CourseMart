import { server } from "../store";
import axios from "axios";

export const updateProfile = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });
    const { data } = await axios.put(
      `${server}/updateProfile`,
      { name, email },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(data)
    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProfileFail",
      payload: error.response.data.message,
    });
  }
};

export const changePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "changePasswordRequest" });
      const { data } = await axios.put(
        `${server}/changePassword`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "changePasswordSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "changePasswordFail",
        payload: error.response.data.message,
      });
    }
  };

export const updateProfilePicture = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfilePictureRequest" });
    const { data } = await axios.put(
      `${server}/updateProfilePicture`,
      formdata,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: "updateProfilePictureSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProfilePictureFail",
      payload: error.response.data.message,
    });
  }
};
// Add to playlist

export const addToPlayList = id => async (dispatch) => {
  try {
    dispatch({ type: "addToPlayListRequest" });

    const { data } = await axios.post(
      `${server}/addToPlaylist`,
      { id },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
console.log(data);
    dispatch({ type: "addToPlayListSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "addToPlayListFail",
      payload: error.response.data.message,
    });
  }
};

// remove to playlist

export const removeFromPlayList = id => async (dispatch) => {
  try {
    dispatch({ type: "removeFromPlayListRequest" });

    const { data } = await axios.delete(
      `${server}/removeFromPlaylist?id=${id}`,

      {
        withCredentials: true,
      }
    );
   console.log(data);
    dispatch({ type: "removeFromPlayListSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "removeFromPlayListFail",
      payload: error.response.data.message,
    });
  }
};
