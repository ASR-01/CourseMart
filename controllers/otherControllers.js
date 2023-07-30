import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import { sendEmail } from "../utils/sendEmail.js";
import ErrorHandler from "../utils/customErrorHandler.js";
import { Stats } from "../Modals/stats.js";

// Contact Form

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("Please Add All Field", 400));
  }

  const to = process.env.MY_MAIL;
  const subject = "Contact From CourseMart";
  const text = `I am ${name} and my Email is ${email}.\n${message}`;

  await sendEmail(to, subject, text);
  res.status(200).json({
    success: true,
    message: "Your message has been send",
  });
});

// Course Request
export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return next(new ErrorHandler("Please Add All Field", 400));
  }

  const to = process.env.MY_MAIL;
  const subject = "Request For a course from CourseMart";
  const text = `I am ${name} and my Email is${email}.\n${course}`;

  await sendEmail(to, subject, text);
  res.status(200).json({
    success: true,
    message: "Your Request has been Sent",
  });

  res.status(200).json({
    success: true,
  });
});

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.push(stats[i]);
  }

  const requiredSize = 12 - stats.length;
  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscription: 0,
      views: 0,
    });
  }

  let usersCount = statsData[11].users;
  let viewsCount = statsData[11].users;
  let subscriptionCount = statsData[11].users;

  let usersPercentage = 0;
  let viewsPercentage = 0;
  let subscriptionPercentage = 0;

  let usersProfit = true;
  let viewsProfit = true;
  let subscriptionProfit = true;

  if (statsData[10].users === 0) {
    usersPercentage = usersCount * 100;
  }
  if (statsData[10].users === 0) {
    viewsPercentage = viewsCount * 100;
  }
  if (statsData[10].users === 0) {
    subscriptionPercentage = subscriptionCount * 100;
  } else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      views: statsData[11].views - statsData[10].views,
      subscription: statsData[11].subscription - statsData[10].subscription,
    };

    usersPercentage = (difference.users / stats[10].users) * 10;
    viewsPercentage = (difference.views / stats[10].views) * 10;
    subscriptionPercentage = difference.subscription / stats[10].subscription;

    if (usersPercentage < 0) usersProfit = false;
    if (viewsPercentage < 0) viewsProfit = false;
    if (subscriptionPercentage < 0) subscriptionProfit = false;
  }

  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    subscriptionProfit,
    viewsProfit,
    usersProfit,
  });
});
