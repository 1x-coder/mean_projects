import express from 'express'
import user from '../models/user';

export class UserController{
    loginToSystem = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        //console.log(kor_ime);
        //console.log(lozinka);

        user.findOne({'username': username, 'password': password}, (err, returningUser)=>{
            if(err) console.log(err);
            else res.json(returningUser)
        })
    }


    checkUsername = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;


        user.findOne({'username': username}, (err, returningUser)=>{
            if(err) console.log(err);
            else res.json(returningUser)
        })
    }

    checkEmail = (req: express.Request, res: express.Response)=>{
        let email = req.body.email;


        user.findOne({'email': email}, (err, returningUser)=>{
            if(err) console.log(err);
            else res.json(returningUser)
        })
    }


    updateInfo = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let name = req.body.name;
        let lastName = req.body.lastName;
        let address = req.body.address;
        let contact = req.body.contact;
        let picture = req.body.picture;
        let email = req.body.email;
        let oldUsername = req.body.oldUsername;

   

        user.updateOne({'username': oldUsername},{$set: {'username' : username, 'lastName' : lastName,'name': name,'address': address,'contact': contact,'picture': picture, 'email': email}}, (err, resp)=>{
            if(err) {console.log(err);}
            else res.json({"message": "ok"})
        });


    }



    
    changePassword = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let newPassword = req.body.newPassword;
   

        user.updateOne({'username': username},{$set: {'password' : newPassword}}, (err, resp)=>{
            if(err) {console.log(err);}
            else res.json({"message": "ok"})
        });


    }

    
    getAll = (req: express.Request, res: express.Response)=>{
        
       
        user.find((err, findedRequests)=>{
            if(err) console.log(err);
            else res.json(findedRequests);
        })
    }

    
    deleteUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        user.deleteOne({'username': username}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }




    /*try {
   db.restaurant.updateOne(
      { "name" : "Pizza Rat's Pizzaria" },
      { $set: {"_id" : 4, "violations" : 7, "borough" : "Manhattan" } },
      { upsert: true }
   );
} catch (e) {
   print(e);
} */

    /*updateInfo(username, name, lastName, address, contact, email, picture){
    const data={
      username: username,
      name: name,
      lastName: lastName,
      address: address,
      contact: contact,
      email: email,
      picture: picture,
    }

    return this.http.post(`${this.uri}/users/updateInfo`, data);
  } */




//this.userService.insertUser(helper.username, helper.password, helper.name, helper.lastName, helper.address, helper.contact, helper.email, helper.type, helper.picture, "false")



insertUser = (req: express.Request, res: express.Response)=>{
        
    let newRequest = new user({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        lastName: req.body.lastName,
        address: req.body.address,
        contact: req.body.contact,
        email: req.body.email,
        type: req.body.type,
        picture: req.body.picture,
        blocked: req.body.blocked,
        numOfTakenBooks: 0
    })
    

    newRequest.save((err, isDone)=>{
        if(err) {console.log(err);}
        else res.json({"message": "ok"})
    })
}


incNumBook = (req: express.Request, res: express.Response)=>{
    let username = req.body.username;
    let howMuch = req.body.howMuch;
   
    
    user.updateOne({'username': username},{$inc: {'numOfTakenBooks':howMuch}}, (err, resp)=>{
        if(err) console.log(err)
        else res.json({"message": "ok"})
    });


}

changePrivilegies = (req: express.Request, res: express.Response)=>{
    let username = req.body.username;
    let changeTo = req.body.changeTo;


    user.updateOne({'username': username},{$set: {'type' : changeTo}}, (err, resp)=>{
        if(err) {console.log(err);}
        else res.json({"message": "ok"})
    });


}

blockOrUnblock = (req: express.Request, res: express.Response)=>{
    let username = req.body.username;
    let changeTo = req.body.changeTo;


    user.updateOne({'username': username},{$set: {'blocked' : changeTo}}, (err, resp)=>{
        if(err) {console.log(err);}
        else res.json({"message": "ok"})
    });


}




}