import Room from "../models/room";
import ErrorHandler from "../../utils/errorHandler";
//import CatchAsyncErrors from '../middlewares/catchAsyncErrors'
import APIFeatures from "../../utils/apiFeatures";

const getAllRooms = async (req, res) => {
  try {
    const resPerPage = 4;
    const roomCount = await Room.countDocuments();
    const apiFeatures = new APIFeatures(Room.find(), req.query)
      .search()
      .filter();

    //const rooms = await Room.find();
    let rooms = await apiFeatures.query;
    let filteredRoomsCount = rooms.length;
    apiFeatures.pagination(resPerPage);
    rooms = await apiFeatures.query;
    res.status(200).json({
      success: true,
      roomCount,
      resPerPage,
      filteredRoomsCount,
      rooms,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error.message,
    });
  }
};

//create new room => /api/rooms
const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Get room details /api/rooms/:id
const getSingleRoom = async (req, res, next) => {
  try {
    //in next doesnt have params, we have query
    const room = await Room.findById(req.query.id);

    if (!room) {
      /* res.status(404).json({
        sucess: false,
        error: "Room not found with this ID",
      }); */
      return next(new ErrorHandler("Room not found with this ID", 404));
    } else {
      res.status(200).json({
        success: true,
        count: room.length,
        room,
      });
    }
  } catch (error) {
    console.log(err.name);
    res.status(400).json({
      sucess: false,
      error: error.message,
    });
  }
};

// Update room details /api/rooms/:id
const updateRoom = async (req, res, next) => {
  try {
    //in next doesnt have params, we have query
    let room = await Room.findById(req.query.id);

    if (!room) {
      return next(new ErrorHandler("Room not found with this ID", 404));
    } else {
      //req.body is the updated room
      room = await Room.findByIdAndUpdate(req.query.id, req.body, {
        //to avoid warnings
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
        count: room.length,
        room,
      });
    }
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error.message,
    });
  }
};

// Delete room /api/rooms/:id
const deleteRoom = async (req, res, next) => {
  try {
    //in next doesnt have params, we have query
    const room = await Room.findById(req.query.id);

    if (!room) {
      return next(new ErrorHandler("Room not found with this ID", 404));
    } else {
      await room.remove();
      res.status(200).json({
        success: true,
        message: "Room has been eliminated",
      });
    }
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error.message,
    });
  }
};

export { getAllRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
