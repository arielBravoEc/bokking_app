//this is a dymanical routing
import nc from "next-connect";
import dbConnect from "../../../backend/config/dbConnect";
import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "../../../backend/controllers/roomControllers";
import onError from "../../../backend/middlewares/errors";
const handler = nc({ onError });
dbConnect();

handler.get(getSingleRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);
export default handler;
