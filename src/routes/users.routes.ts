import { Router } from "express"
import multer from "multer";

import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvaterController";
import { CreateUserController } from "../modules/accounts/useCases/createUsers/CreateUserController";
import uploadConfig from "../config/upload";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
"/avatar", 
uploadAvatar.single("avatar"),
updateUserAvatarController.handle);

export { usersRoutes };