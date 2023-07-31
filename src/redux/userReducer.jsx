import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  {},
  {

    // for Login
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false; // Assuming login failed, user is not authenticated
      state.error = action.payload; // Set the error message to the 'error' property
    },


    // for logout
    logOutRequest: (state) => {
      state.loading = true;
    },
    logOutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload
    },
    logOutFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true; // Assuming login failed, user is not authenticated
      state.error = action.payload; // Set the error message to the 'error' property
    },


// for register



registerRequest: state => {
  state.loading = true;
},
registerSuccess: (state, action) => {
  state.loading = false;
  state.isAuthenticated = true;
  state.user = action.payload.user;
  state.message = action.payload.message;
},
registerFail: (state, action) => {
  state.loading = false;
  state.isAuthenticated = false;
  state.error = action.payload;
},



    loadUser: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false; // Assuming login failed, user is not authenticated
      state.error = action.payload; // Set the error message to the 'error' property
    },




    clearError: (state) => {
      state.error = null;
    },

    clearMessage: (state) => {
      state.message = null;
    },
  }
);
