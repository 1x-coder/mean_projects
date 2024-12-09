import express from 'express'
import bookReservation from '../models/bookReservation';

export class BookReservationController{


    getAll = (req: express.Request, res: express.Response)=>{
        
       
        bookReservation.find((err, findedRequests)=>{
            if(err) console.log(err);
            else res.json(findedRequests);
        })
    }


    insertReservation = (req: express.Request, res: express.Response)=>{
        

        let newRequest = new bookReservation({
            idBookReservation: req.body.idBookReservation,
            idBook: req.body.idBook,
            username: req.body.username
        })
        

        newRequest.save((err, isDone)=>{
            if(err) console.log(err)
            else res.json({"message": "ok"})
        })
    }

    getAllForOneBook = (req: express.Request, res: express.Response)=>{

        let idBook = req.body.idBook;
            bookReservation.find({'idBook': idBook},(err, findedRequests)=>{
                if(err) console.log(err);
                else res.json(findedRequests);
            })
        }


        
        deleteReservation = (req: express.Request, res: express.Response)=>{
        let idBookReservation = req.body.idBookReservation;

        bookReservation.deleteOne({'idBookReservation': idBookReservation}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }




}







