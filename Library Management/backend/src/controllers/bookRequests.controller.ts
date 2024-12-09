import express from 'express'
import bookRequestsModel from '../models/bookRequestsModel';

export class BookRequestsController{




    getAll = (req: express.Request, res: express.Response)=>{
        
       
            bookRequestsModel.find((err, findedRequests)=>{
                if(err) console.log(err);
                else res.json(findedRequests);
            })
        }



        
    insertRequest = (req: express.Request, res: express.Response)=>{
        
        let newRequest = new bookRequestsModel({
            idBookRequest: req.body.idBookRequest,
            username: req.body.username,
            title: req.body.title,
            writer: req.body.writer,
            genre: req.body.genre,
            publisher: req.body.publisher,
            pubYear: req.body.pubYear,
            language: req.body.language,
            picture: req.body.picture,
            processed: false
        })
        

        newRequest.save((err, isDone)=>{
            if(err) {console.log(err);}
            else res.json({"message": "ok"})
        })
    }

    delete = (req: express.Request, res: express.Response)=>{
        let idBookRequest = req.body.idBookRequest;

        bookRequestsModel.deleteOne({'idBookRequest': idBookRequest}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }



}







