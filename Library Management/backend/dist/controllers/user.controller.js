"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.loginToSystem = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            //console.log(kor_ime);
            //console.log(lozinka);
            user_1.default.findOne({ 'username': username, 'password': password }, (err, returningUser) => {
                if (err)
                    console.log(err);
                else
                    res.json(returningUser);
            });
        };
        this.checkUsername = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, returningUser) => {
                if (err)
                    console.log(err);
                else
                    res.json(returningUser);
            });
        };
        this.checkEmail = (req, res) => {
            let email = req.body.email;
            user_1.default.findOne({ 'email': email }, (err, returningUser) => {
                if (err)
                    console.log(err);
                else
                    res.json(returningUser);
            });
        };
        this.updateInfo = (req, res) => {
            let username = req.body.username;
            let name = req.body.name;
            let lastName = req.body.lastName;
            let address = req.body.address;
            let contact = req.body.contact;
            let picture = req.body.picture;
            let email = req.body.email;
            let oldUsername = req.body.oldUsername;
            user_1.default.updateOne({ 'username': oldUsername }, { $set: { 'username': username, 'lastName': lastName, 'name': name, 'address': address, 'contact': contact, 'picture': picture, 'email': email } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.changePassword = (req, res) => {
            let username = req.body.username;
            let newPassword = req.body.newPassword;
            user_1.default.updateOne({ 'username': username }, { $set: { 'password': newPassword } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getAll = (req, res) => {
            user_1.default.find((err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            user_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
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
        this.insertUser = (req, res) => {
            let newRequest = new user_1.default({
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
            });
            newRequest.save((err, isDone) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.incNumBook = (req, res) => {
            let username = req.body.username;
            let howMuch = req.body.howMuch;
            user_1.default.updateOne({ 'username': username }, { $inc: { 'numOfTakenBooks': howMuch } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.changePrivilegies = (req, res) => {
            let username = req.body.username;
            let changeTo = req.body.changeTo;
            user_1.default.updateOne({ 'username': username }, { $set: { 'type': changeTo } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.blockOrUnblock = (req, res) => {
            let username = req.body.username;
            let changeTo = req.body.changeTo;
            user_1.default.updateOne({ 'username': username }, { $set: { 'blocked': changeTo } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map