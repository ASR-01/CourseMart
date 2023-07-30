import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "../utils/customErrorHandler.js";
import { User } from "../Modals/User.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Not Logged In", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user_id = user._id; // Set user ID separately as req.user_id
    req.user = user; // Set the entire user object as req.user
    next();
  } catch (err) {
    return next(
      new ErrorHandler("Invalid token or authentication failed", 401)
    );
  }
});

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );
  }
  next();
};


export const authorizeSubscriber = (req, res, next) => {
  if (req.user.subscription.status !== "active" && req.user.role !== "admin") {
    return next(
      new ErrorHandler(
     "only Subscriber can access this role",
        403
      )
    );
  }
  next();
};
