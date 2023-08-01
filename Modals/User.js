import mongoose from "mongoose";
import validator from "validator";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Dude Enter Your Name AtLeast"],
  },
  email: {
    type: String,
    required: [true, "Dude Enter Your Email AtLeast"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    require: [true, "Dude don't you want privacy"],
    minLength: [6, "Password must be atLeast 6 character"],
    select: false,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  subscription: {
    id: String,
    status: String,
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  playlist: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      poster: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetpasswordToken: String,
  resetpasswordExpire: String,
});

schema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hashPassword = bcrypt.hashSync(this.password, 10);
  this.password = hashPassword;
  next();
});

schema.methods.getJWTToken = function () {
  return Jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// console.log(crypto.randomBytes(20).toString('hex'));
schema.methods.getResetToken= function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetpasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetpasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", schema);
