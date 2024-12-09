import express from 'express'
import requests from '../models/requests';

export class RequestsController{




    insertRequest = (req: express.Request, res: express.Response)=>{
        
        let newRequest = new requests({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            lastName: req.body.lastName,
            address: req.body.address,
            contact: req.body.contact,
            email: req.body.email,
            type: req.body.type,
            picture: req.body.picture,
            status: req.body.status,
            processed: false
        })
        

        newRequest.save((err, isDone)=>{
            if(err) {console.log(err);}
            else res.json({"message": "ok"})
        })
    }



    getAll = (req: express.Request, res: express.Response)=>{
        
            requests.find({'status':"na cekanju"},(err, findedRequests)=>{
                if(err) console.log(err);
                else res.json(findedRequests);
            })
        }



    

        setStatus = (req: express.Request, res: express.Response)=>{
            let username = req.body.username;
            let status = req.body.status;
    
       
    
            requests.updateOne({'username': username},{$set: {'status' : status, 'processed': "true"}}, (err, resp)=>{
                if(err) {console.log(err);}
                else res.json({"message": "ok"})
            });
            
    
        }




    }







