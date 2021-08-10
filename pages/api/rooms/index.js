import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { getAllRooms, newRoom } from "../../../controllers/roomControllers";

const handler = nc();
dbConnect();
//para usar middleware
//handler.use(middleware).get(getAllRooms);
handler.get(getAllRooms);

handler.post(newRoom);

export default handler;
