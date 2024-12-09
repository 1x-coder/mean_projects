

import express from 'express';
import { SysController } from '../controllers/sys.controller';


const sysRouter = express.Router();

sysRouter.route('/getExtendPeriod').get(
    (req, res)=> new SysController().getExtendPeriod(req, res)
)

sysRouter.route('/updateExtendPeriod').post(
    (req, res)=> new SysController().updateExtendPeriod(req, res)
)

export default sysRouter;