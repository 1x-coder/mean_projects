import express from 'express';
import { LoanController } from '../controllers/loan.controller';


const loanRouter = express.Router();


loanRouter.route('/getAll').post(
    (req, res)=> new LoanController().getAll(req, res)
)

loanRouter.route('/getAllForOneBook').post(
    (req, res)=> new LoanController().getAllForOneBook(req, res)
)


loanRouter.route('/extendDate').post(
    (req, res)=> new LoanController().extendDate(req, res)
)


loanRouter.route('/checkIfUserTookBook').post(
    (req, res)=> new LoanController().checkIfUserTookBook(req, res)
)



loanRouter.route('/insertLoan').post(
    (req, res)=> new LoanController().insertLoan(req, res)
)


loanRouter.route('/getAllBookAndUsername').post(
    (req, res)=> new LoanController().getAllBookAndUsername(req, res)
)

loanRouter.route('/updateReturnedDateAndBook').post(
    (req, res)=> new LoanController().updateReturnedDateAndBook(req, res)
)
loanRouter.route('/getAllFromAllUsers').get(
    (req, res)=> new LoanController().getAllFromAllUsers(req, res)
)





export default loanRouter;