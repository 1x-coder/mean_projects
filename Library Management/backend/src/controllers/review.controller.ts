import express from 'express'
import review from '../models/review';


export class ReviewController{



    getAll = (req: express.Request, res: express.Response)=>{
        
        let idBook = req.body.idBook;
            review.find({'idBook': idBook},(err, findedRequests)=>{
                if(err) console.log(err);
                else res.json(findedRequests);
            })
        }


        getAllFromAllUsers = (req: express.Request, res: express.Response)=>{
        
            
                review.find((err, findedRequests)=>{
                    if(err) console.log(err);
                    else res.json(findedRequests);
                })
            }

    

        insertReview = (req: express.Request, res: express.Response)=>{
        
            let newRequest = new review({
                idReview: req.body.idReview,
                username: req.body.username,
                rating: req.body.rating,
                idBook: req.body.idBook,
                comment: req.body.comment,
                date: req.body.date,
                edited: req.body.edited
            })
            
    
            newRequest.save((err, isDone)=>{
                if(err) {console.log(err);}
                else res.json({"message": "ok"})
            })
        }
       
        updateReview = (req: express.Request, res: express.Response)=>{
            let idReview = req.body.idReview;
            let rating = req.body.rating;
            let comment = req.body.comment;
            let date = req.body.date;
            let edited = req.body.edited;
        
        
            review.updateOne({'idReview': idReview},{$set: {'rating' : rating, 'comment' : comment,'date': date,'edited': edited}}, (err, resp)=>{
                if(err) {console.log(err);}
                else res.json({"message": "ok"})
            });
        
        }




}







