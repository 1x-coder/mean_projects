import express from 'express'
import notification from '../models/notification';



export class NotificationController{


    getAll = (req: express.Request, res: express.Response)=>{
        
            notification.find((err, findedRequests)=>{
                if(err) console.log(err);
                else res.json(findedRequests);
            })
    }



    insertNotification = (req: express.Request, res: express.Response)=>{
    

        let newRequest = new notification({
            idNotification: req.body.idNotification,
            username: req.body.username,
            text: req.body.text,
            always: req.body.always
        })
        

        newRequest.save((err, isDone)=>{
            if(err) console.log(err)
            else res.json({"message": "ok"})
        })
    } 


    getForUser = (req: express.Request, res: express.Response)=>{
        
        let username = req.body.username;
    
            notification.find({'username': username},(err, findedRequests)=>{
                if(err) console.log(err);
                else res.json(findedRequests);
            })
        }

    
        deleteNotification = (req: express.Request, res: express.Response)=>{
        let idNotification = req.body.idNotification;

        notification.deleteOne({'idNotification': idNotification}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

}







