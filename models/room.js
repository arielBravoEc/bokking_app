const mongoose = require("mongoose"); // solo por el seeder
//import mongoose from "mongoose"

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter room name"],
    trim: true,
    maxLength: [100, "Room can not exceed 100 characters"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please enter room price per night"],
    maxLength: [4, "Room can not exceed 4 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter room description"],
  },
  address: {
    type: String,
    required: [true, "Please enter room address"],
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please enter room capacity"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please enter number of beds in room."],
  },
  internet: {
    type: Boolean,
    default: false,
  },
  breakfast: {
    type: Boolean,
    default: false,
  },
  airCondition: {
    type: Boolean,
    default: false,
  },
  petsAllowed: {
    type: Boolean,
    default: false,
  },
  roomCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  //from cloudninary
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter category"],
    enum: {
      values: ["King", "Single", "Twins"],
      message: "Please select correct category from room",
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//if already exists the model or create a new model
//export default mongoose.models.Room || mongoose.model("Room", roomSchema);
module.exports = mongoose.models.Room || mongoose.model("Room", roomSchema); //solo por el seeder
