import express from "express";
import {
  getAllCourses,
  getCourseLectures,
  createCourses,
  addLecture,
  courseDelete,
  deleteLecture,
} from "../controllers/courseController.js";
import {
  authorizeAdmin,
  authorizeSubscriber,
  isAuthenticated,
} from "../Middleware/auth.js";
import singleUpload from "../Middleware/multer.js";

const router = express.Router();

// Get All Courses Without Lectures

router.route("/courses").get(getAllCourses);

// Create  new courses only -admin Only
router
  .route("/createCourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourses);

// Add Lecture ,Delete course ,Get Course Details
router
  .route("/course/:id")
  .get(isAuthenticated, authorizeSubscriber, getCourseLectures)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizeAdmin, courseDelete);

// Delete Lecture

router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;
