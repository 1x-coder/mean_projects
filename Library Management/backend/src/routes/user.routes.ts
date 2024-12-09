import express from 'express';
import { UserController } from '../controllers/user.controller';


const userRouter = express.Router();

userRouter.route('/loginToSystem').post(
    (req, res)=> new UserController().loginToSystem(req, res)
)

userRouter.route('/checkUsername').post(
    (req, res)=> new UserController().checkUsername(req, res)
)

userRouter.route('/checkEmail').post(
    (req, res)=> new UserController().checkEmail(req, res)
)

userRouter.route('/updateInfo').post(
    (req, res)=> new UserController().updateInfo(req, res)
)

userRouter.route('/changePassword').post(
    (req, res)=> new UserController().changePassword(req, res)
)

userRouter.route('/insertUser').post(
    (req, res)=> new UserController().insertUser(req, res)
)

userRouter.route('/incNumBook').post(
    (req, res)=> new UserController().incNumBook(req, res)
)


userRouter.route('/getAll').get(
    (req, res)=> new UserController().getAll(req, res)
)

userRouter.route('/deleteUser').post(
    (req, res)=> new UserController().deleteUser(req, res)
)

userRouter.route('/changePrivilegies').post(
    (req, res)=> new UserController().changePrivilegies(req, res)
)

userRouter.route('/blockOrUnblock').post(
    (req, res)=> new UserController().blockOrUnblock(req, res)
)

export default userRouter;