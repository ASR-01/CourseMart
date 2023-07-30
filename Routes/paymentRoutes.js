import express from "express";

import { authorizeSubscriber, isAuthenticated } from "../Middleware/auth.js";
import {
  buySubscription,
  cancelSubscription,
  getRazorPayKey,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

// Buy Subscription
router.route("/subscribe").get(isAuthenticated, buySubscription);

// Verify Payment and Save Reference in database
router.route("/paymentVerification").post(isAuthenticated, paymentVerification);

// Get Razorpay Key
router.route("/razorPayKey").get(getRazorPayKey);

// Cancel Subscription
router
  .route("/subscribe/cancel")
  .delete(isAuthenticated, authorizeSubscriber, cancelSubscription);

export default router;
