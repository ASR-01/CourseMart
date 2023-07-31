import express from "express";
import {
  register,
  login,
  Logout,
  getMyProfile,
  changePassword,
  updateProfile,
  updateProfilePicture,
  forgotPassword,
  resetPassword,
  addToPlaylist,
  removeFromPlaylist,
  getAllUsersAdmin,
  updateRoleUserOrAdmin,
  deleteUser,
  deleteMyProfile
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../Middleware/auth.js";

import  singleUpload from "../Middleware/multer.js";


const router = express.Router();

// To register a new User
router.route("/register").post(singleUpload,register);

// Login
router.route("/login").post(login);
// Logout
router.route("/logout").get(Logout);

// Get My profile
router.route("/me").get(isAuthenticated, getMyProfile);


// Delete Profile

router.route("/me").delete(isAuthenticated, deleteMyProfile);

// Change Password
router.route("/changePassword").put(isAuthenticated, changePassword);

// UpdateProfile

router.route("/updateProfile").put(isAuthenticated, updateProfile);
// UpdateProfilePicture
router
  .route("/updateProfilePicture")
  .put(isAuthenticated,singleUpload,signUpload, updateProfilePicture);

// ForgetPassword
router.route("/forgotPassword").post(forgotPassword);

// ResetPassword
router.route("/resetPassword/:token").put(resetPassword);

// Add to playlist
router.route("/addToPlaylist").post(isAuthenticated, addToPlaylist);

// Remove From Playlist
router.route("/removeFromPlaylist").delete(isAuthenticated, removeFromPlaylist);



// Admin Routes
router.route("/admin/users").get(isAuthenticated,authorizeAdmin,getAllUsersAdmin)

//Admin or User Role
router.route("/admin/users/:id").put(isAuthenticated,authorizeAdmin,updateRoleUserOrAdmin).delete(isAuthenticated,authorizeAdmin,deleteUser)
export default router;
