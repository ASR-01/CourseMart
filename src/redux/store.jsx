import { configureStore } from "@reduxjs/toolkit";
import { profileReducer, userReducer ,subscriptionReducer} from "../redux/userReducer";
import { courseReducer } from "./reducers/courseReducer";
import { adminReducer } from "./reducers/adminreducer";
import { otherReducer } from "./reducers/otherReducres";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile:profileReducer,
    course : courseReducer,
    subscription : subscriptionReducer,
    admin : adminReducer,
    other : otherReducer,
  },
});

export default store;

export const server = "https://coursemart.onrender.com/api/v1";
