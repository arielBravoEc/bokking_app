import nc from "next-connect";
import dbConnect from "../../../backend/config/dbConnect";
import {
  getAllRooms,
  newRoom,
} from "../../../backend/controllers/roomControllers";
import onError from "../../../backend/middlewares/errors";
const handler = nc({ onError });
dbConnect();
//para usar middleware
//handler.use(middleware).get(getAllRooms);
handler.get(getAllRooms);

handler.post(newRoom);

export default handler;
