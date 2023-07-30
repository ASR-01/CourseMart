import express from "express";

import {  authorizeAdmin, isAuthenticated } from "../Middleware/auth.js";
import { contact, courseRequest, getDashboardStats } from "../controllers/otherControllers.js";
const router = express.Router();


// Contact Form
router.route('/contact').post(contact)

// Request From
router.route('/courseRequest').post(courseRequest)


// Get Admin DashBoard Stats
router.route('/adminDashboard/stats').get(isAuthenticated,authorizeAdmin,getDashboardStats)



export default router;
