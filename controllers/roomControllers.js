import Room from "../models/room";

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({
      success: true,
      count: rooms.length,
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
    res.status(400).json({
      sucess: false,
      error: error.message,
    });
  }
};

// Get room details /api/rooms/:id
const getSingleRoom = async (req, res) => {
  try {
    //in next doesnt have params, we have query
    const room = await Room.findById(req.query.id);

    if (!room) {
      res.status(404).json({
        sucess: false,
        error: "Room not found with this ID",
      });
    } else {
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

// Update room details /api/rooms/:id
const updateRoom = async (req, res) => {
  try {
    //in next doesnt have params, we have query
    let room = await Room.findById(req.query.id);

    if (!room) {
      res.status(404).json({
        sucess: false,
        error: "Room not found with this ID",
      });
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
const deleteRoom = async (req, res) => {
  try {
    //in next doesnt have params, we have query
    const room = await Room.findById(req.query.id);

    if (!room) {
      res.status(404).json({
        sucess: false,
        error: "Room not found with this ID",
      });
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
