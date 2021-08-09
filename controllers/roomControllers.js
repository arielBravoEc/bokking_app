const getAllRooms = (req, res) => {
  res.status(200).json({
    sucess: true,
    message: "All Rooms",
  });
};

export { getAllRooms };
