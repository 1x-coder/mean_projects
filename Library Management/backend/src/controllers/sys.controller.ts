import express from 'express'
import sysModel from '../models/sysModel';


export class SysController{





    getExtendPeriod = (req: express.Request, res: express.Response)=>{
        
            sysModel.findOne({'id':1},(err, findedRequests)=>{
                if(err) console.log(err);
                else res.json(findedRequests);
            })
        }

       
        updateExtendPeriod = (req: express.Request, res: express.Response)=>{
            let extendPeriod = req.body.extendPeriod;

        
        
            sysModel.updateOne({'id': 1},{$set: {'extendPeriod' : extendPeriod}}, (err, resp)=>{
                if(err) {console.log(err);}
                else res.json({"message": "ok"})
            });
        
        
        }




}







