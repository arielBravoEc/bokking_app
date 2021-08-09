import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter room name"],
    trim: true,
    maxLength: [100, "Room can not exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter room price"],
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
    required: [true, "Please enter room capacity"],
  },
});

//if already exists the model or create a new model
export default mongoose.models.Room || mongoose.model("Room", roomSchema);
