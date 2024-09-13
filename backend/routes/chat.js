import  {Router} from "express"
import { newChat } from "../controllers/chat";
import { upload } from "../middleware/multer";
const app=Router();
app.post("/createChat",upload,newChat);
app.post('/change-status', requestValidator, changeStatusValidator, changeStatus);
app.post('/get-notifications', requestValidator, getValidator, getNotifications);