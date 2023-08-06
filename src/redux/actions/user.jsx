import { server } from "../store";
import axios from "axios";
// Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(data);

    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response.data.message });
  }
};
// Profile Action
export const getMyProfile = ( ) => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );

  

    dispatch({ type: "loadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "loadUserFail", payload: error.response.data.message });
  }
};
// Logout Action


export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};




// Register Action
export const register = formdata => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${server}/register`, formdata, {
      headers: {
        'Content-type': 'multipart/form-data',
      },

      withCredentials: true,
    });

    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'registerFail', payload: error.response.data.message });
  }
};

// loadUser
export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error.response.data.message });
  }
};



// Forget password Action
export const forgetPassword = (email) => async (dispatch) => {
  try {
      dispatch({ type: 'forgetPasswordRequest' })
      const { data } = await axios.post(`${server}/forgotPassword`, { email }, {
          headers: {
              "Content-type": "application/json",
          },
          withCredentials: true,
      })
      dispatch({ type: 'forgetPasswordSuccess',payload:data.message})
  } catch (error) {
      dispatch({ type: 'forgetPasswordFail', payload: error.response.data.message })

  }

}
export const resetPassword = (token,password) => async (dispatch) => {
  try {
      dispatch({ type: 'resetPasswordRequest' })
      const { data } = await axios.put(`${server}/resetPassword/${token}`, { password }, {
          headers: {
              "Content-type": "application/json",
          },
          withCredentials: true,
      })
      dispatch({ type: 'resetPasswordSuccess',payload:data.message})
  } catch (error) {
      dispatch({ type: 'resetPasswordFail', payload: error.response.data.message })

  }

}
