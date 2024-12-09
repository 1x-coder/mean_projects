import express from 'express'
import sysModel from '../models/sysModel';
import loanModel from '../models/loanModel';


export class LoanController{



    getAllFromAllUsers = (req: express.Request, res: express.Response)=>{
        
       
            loanModel.find((err, findedRequests)=>{
                if(err) console.log(err);
                else res.json(findedRequests);
            })
        }

    getAll = (req: express.Request, res: express.Response)=>{
        
        let username = req.body.username;
        let wantReturned = req.body.wantReturned;
            loanModel.find({'returnedBook': wantReturned, 'username': username},(err, findedRequests)=>{
                if(err) console.log(err);
                else res.json(findedRequests);
            })
        }



    getAllBookAndUsername = (req: express.Request, res: express.Response)=>{

    let username = req.body.username;
    let idBook = req.body.idBook;
        loanModel.find({'username': username, 'idBook': idBook, 'returnedBook': true},(err, findedRequests)=>{
            if(err) console.log(err);
            else res.json(findedRequests);
        })
    }

    getAllForOneBook = (req: express.Request, res: express.Response)=>{

    let idBook = req.body.idBook;
    let wantReturned = req.body.wantReturned;
        loanModel.find({ 'idBook': idBook, 'returnedBook': wantReturned},(err, findedRequests)=>{
            if(err) console.log(err);
            else res.json(findedRequests);
        })
    }


        
    extendDate = (req: express.Request, res: express.Response)=>{
        let idLoan = req.body.idLoan;
        let deadLine = req.body.deadLine;

    

        loanModel.updateOne({'idLoan': idLoan},{$set: {'deadLine' : deadLine, 'extended': true}}, (err, resp)=>{
            if(err) {console.log(err);}
            else res.json({"message": "ok"})
        });


    }

        
    checkIfUserTookBook = (req: express.Request, res: express.Response)=>{
        
        let idBook = req.body.idBook;
        let username = req.body.username;

        loanModel.findOne({'idBook': idBook, 'username': username, 'returnedBook': false},(err, findedRequests)=>{
            if(err) console.log(err);
            else res.json(findedRequests);
        })
    }



    
    insertLoan = (req: express.Request, res: express.Response)=>{
        

            let newRequest = new loanModel({
                idLoan: req.body.idLoan,
                idBook: req.body.idBook,
                title: req.body.title,
                deadLine: req.body.deadLine,
                username: req.body.username,
                writer: req.body.writer,
                loanDate: req.body.loanDate,
                returnDate: null,
                picture: req.body.picture,
                processed: false,
                extended: false,
                returnedBook: false
            })
            
    
            newRequest.save((err, isDone)=>{
                if(err) console.log(err)
                else res.json({"message": "ok"})
            })
    }



    
    updateReturnedDateAndBook = (req: express.Request, res: express.Response)=>{
    let idLoan = req.body.idLoan;
    let returnDate = req.body.returnDate;
    let returnedBook = req.body.returnBook;



    loanModel.updateOne({'idLoan': idLoan},{$set: {'returnDate' : returnDate, 'returnedBook' : returnedBook}}, (err, resp)=>{
        if(err) {console.log(err);}
        else res.json({"message": "ok"})
    });

}



}







