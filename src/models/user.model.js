import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      text: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      text: true,
    },
    userName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      text: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: "someLink",
      trim: true,
    },
    coverPicture: {
      type: String,
      default: "someLink",
      trim: true,
    },
    friends: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: {
        type: String,
        default: "",
        maxlength: 100,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "Married", "In a relationship", "It's complicated"],
      },
      twitter: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);