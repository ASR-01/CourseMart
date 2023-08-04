import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import { User } from "../Modals/User.js";
import ErrorHandler from "../utils/customErrorHandler.js";
import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../Modals/payment.js";

// Buy Subscription

export const buySubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role === "admin") {
    next(new ErrorHandler("Admin cannot buy Subscription", 404));
  }

  const plan_id = process.env.PLAN_ID || "plan_MJ9RlgpVurTs90";
  const subscription = await instance.subscriptions.create({
    plan_id,
    customer_notify: 1,
    total_count: 12,
  });

  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;

  res.status(201).json({
    success: true,
    subscriptionID: subscription.id,
  });

  await user.save();
});

// Verification of payment
export const paymentVerification = catchAsyncError(async (req, res, next) => {
  const { razorpay_signature, razorpay_subscription_id, razorpay_payment_id } =
    req.body;
  const user = await User.findById(req.user._id);

  const subscription_id = user.subscription.id;
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
    .digest("hex");

  const isAuthentic = generated_signature === razorpay_signature;
  if (!isAuthentic)
    return res.redirect(`${process.env.FRONTEND_URL}/paymentFailed`);

  // Database Comes here
  await Payment.create({
    razorpay_signature,
    razorpay_subscription_id,
    razorpay_payment_id,
  });

  user.subscription.status = "Active";
  await user.save();
  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
  );
});

export const getRazorPayKey = catchAsyncError(async (req, res, next) => {
  await res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
});

// Cancelling the Subscription

export const cancelSubscription = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const subscriptionId = user.subscription.id;

  let refund = false;

  await instance.subscriptions.cancel(subscriptionId);
  const payment = await Payment.findOne({
    razorpay_subscription_id: subscriptionId,
  });

  const gap = Date.now() - payment.createdAt;
  const refundTime = process.env.REFUND_DAYS * 24 * 60 * 1000;

  if (refundTime > gap) {
    await instance.payments.refund(payment.razorpay_payment_id);
    refund = true;
  }

  await payment.deleteOne();
  user.subscription.id = undefined;
  user.subscription.status = undefined;
  await user.save();

  await res.status(200).json({
    success: true,
    message: refund
      ? "Subscription cancelled ,You will receive full refund in 7 days. "
      : "Subscription cancelled ,No refund will be initiated as Subscription was cancelled after 7 Days. ",
  });
});
