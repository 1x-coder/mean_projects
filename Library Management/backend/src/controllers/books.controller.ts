import express from 'express'
import bookModel from '../models/bookModel';

export class BooksController{



    getBookById = (req: express.Request, res: express.Response)=>{
        
            let idBook = req.body.idBook;

            bookModel.findOne({'idBook': idBook},(err, findedRequests)=>{
                if(err) console.log(err);
                else res.json(findedRequests);
            })
    }

    getAll = (req: express.Request, res: express.Response)=>{
        
       
            bookModel.find((err, findedRequests)=>{
                if(err) console.log(err);
                else res.json(findedRequests);
            })
        }




    updateAmount = (req: express.Request, res: express.Response)=>{
        let idBook = req.body.idBook;
        let howMuch = req.body.howMuch;
       
        
        bookModel.updateOne({'idBook': idBook},{$inc: {'amount':howMuch}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message": "ok"})
        });
    }


    updateTimesTaken = (req: express.Request, res: express.Response)=>{
        let idBook = req.body.idBook;
        let howMuch = req.body.howMuch;
       
        
        bookModel.updateOne({'idBook': idBook},{$inc: {'timesTaken':howMuch}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({"message": "ok"})
        });

    }




    
    insertBook = (req: express.Request, res: express.Response)=>{
        
        let newRequest = new bookModel({
            idBook: req.body.idBook,
            title: req.body.title,
            writer: req.body.writer,
            genre: req.body.genre,
            publisher: req.body.publisher,
            pubYear: req.body.pubYear,
            language: req.body.language,
            picture: req.body.picture,
            averageRating: null,
            timesTaken: 0,
            amount: 0
        })
        

        newRequest.save((err, isDone)=>{
            if(err) {console.log(err);}
            else res.json({"message": "ok"})
        })
    }




updateBook = (req: express.Request, res: express.Response)=>{
    let idBook = req.body.idBook;
    let title = req.body.title;
    let writer = req.body.writer;
    let genre = req.body.genre;
    let publisher = req.body.publisher;
    let pubYear = req.body.pubYear;
    let language = req.body.language;
    let picture = req.body.picture;
    let amount = req.body.amount;



    bookModel.updateOne({'idBook': idBook},{$set: {'title' : title, 'writer' : writer,'genre': genre,'publisher': publisher,'pubYear': pubYear,'language': language, 'picture': picture, 'amount': amount}}, (err, resp)=>{
        if(err) {console.log(err);}
        else res.json({"message": "ok"})
    });

}



deleteBook = (req: express.Request, res: express.Response)=>{
    let idBook = req.body.idBook;

    bookModel.deleteOne({'idBook': idBook}, (err, resp)=>{
        if(err) console.log(err);
        else res.json({'message': 'ok'})
    })
}


updateRating = (req: express.Request, res: express.Response)=>{
    let idBook = req.body.idBook;
    let howMuch = req.body.howMuch;
   
    
    bookModel.updateOne({'idBook': idBook},{$set: {'averageRating':howMuch}}, (err, resp)=>{
        if(err) console.log(err)
        else res.json({"message": "ok"})
    });
}


}







