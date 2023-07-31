import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import ErrorHandler from "../utils/customErrorHandler.js";
import { User } from "../Modals/User.js";
import { Course } from "../Modals/Course.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import getDataUri from "../utils/datauri.js";
import { Stats } from "../Modals/stats.js";
// User Register

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;

  if (!name || !email || !password )
    return next(new ErrorHandler("Please enter all field", 400));

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 409));

  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  sendToken(res, user, "Registered Successfully", 201);
});

// User Login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter All Field", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user);

  if (!user) {
    return next(new ErrorHandler("Incorrect Email or Password ", 401));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect  Email or Password ", 401));
  }

  sendToken(res, user, `Welcome Back ${user.name}`, 200);
});

// Logout

export const Logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: `logged out  Successfully`,
    });
});

// UserProfile

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  // console.log(user);

  res.status(200).json({
    user,
  });
});

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  console.log("req.body:", req.body);
  console.log("req.user_id:", req.user_id);

  if (!oldPassword || !newPassword) {
    return next(new ErrorHandler("Please Enter All Field", 400));
  }

  const user = await User.findById(req.user_id).select("+password");
  // console.log("user:", user);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect Old Password", 400));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    message: "Password Changed Successfully",
  });
});

// Update Profile
export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user_id);
  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();
  res.status(200).json({
    message: "Profile Changed Successfully",
  });
});
// Update Profile Picture

export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user_id);
  console.log("user:", user);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const file = req.file;
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Picture Updated Successfully",
  });
});

// forgot Password

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    next(new ErrorHandler("User Not Found with this Email Address", 400));
  }

  const resetToken = await user.getResetToken();
  await user.save();
  // Send Token Via Email

  const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
  const message = `Click on the Link to reset Your password ${url}. if you have not requested  then pls ignore`;
  await sendEmail(user.email, "CourseMart Reset Password", message);

  res.status(200).json({
    success: true,
    message: `Reset Token has been send to ${user.email}`,
  });
});

// Reset Password

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetpasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetpasswordToken,
    resetpasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new ErrorHandler("Token is Invalid or has been expired", 401));
  }

  user.password = req.body.password;
  user.resetpasswordExpire = undefined;
  user.resetpasswordToken = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});
// Add to playlist

export const addToPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user_id);
  const course = await Course.findById(req.body.id);
  if (!course) {
    next(new ErrorHandler("Invalid Course ID", 404));
  }

  const itemExist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) {
      return true;
    }
  });
  if (itemExist) {
    return next(new ErrorHandler("Item Already Exist", 409));
  }

  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: "Added to PlayList",
  });
});

export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user_id);
  const course = await Course.findById(req.query.id);
  if (!course) {
    next(new ErrorHandler("Invalid Course ID", 404));
  }

  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString !== course._id.toString) {
      return item;
    }
  });
  user.playlist = newPlaylist;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Removed from PlayList",
  });
});

// Admin Routes

export const getAllUsersAdmin = catchAsyncError(async (req, res, next) => {
  const user = await User.find({});

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user Role

export const updateRoleUserOrAdmin = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new ErrorHandler("User Not Found", 404));
  }

  if (user.role === "user") user.role = "admin";
  else user.role === "user";

  await user.save();

  res.status(200).json({
    success: true,
    message: "Role Updated",
  });
});

// delete User
export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new ErrorHandler("User Not Found", 404));
  }

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // Cancel Subscription

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User Deleted SuccessFully",
  });
});

// delete userProfile
export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  await user.deleteOne();

  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Deleted SuccessFully",
    });
});

User.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

  const subscription = await User.find({ "subscription.status": "active" });
  stats[0].users = await User.countDocuments();
  stats[0].subscription = subscription.length;
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save();
});
