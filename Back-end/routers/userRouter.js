import Router, { json } from "express";
const router = Router();
import { db } from "../database/createConnection.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { sendEmail } from "../public/mails.js";
import rString from "randomstring";


router.get("/api/user", async (req, res) => {
    try{
        const cookie = req.cookies["jwt"];
        const user = jwt.verify(cookie, process.env.SECRET_KEY)
        if(!user){
            return res.status(401).send({message: "You are unauthenticated",});
        }
        const userToSend = await db.get("SELECT id, username,email,role FROM users WHERE email=?", [user.email]);
        res.send(userToSend);

    }catch (e) {
        return res.status(401).send({message: "You are unauthenticated"});
    }
});

router.post("/api/register", async (req, res)=>{
    try{
        const username = req.body.username;
        const email = req.body.email;
        const user = await db.get("SELECT password,email FROM users WHERE email=?", [email]);
        if(user!=undefined){res.status(401).send({ message: "User with email "+email+" already exist"}); return;}
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await db.run("INSERT INTO users (username,password,email,role) VALUES(?,?,?,?)", 
        [username, hashedPassword, email,'buyer']);
        sendEmail(
            email,
            "Welcome to our shop.",
            "Hello "+username+" and welcome to our shop. We hope you have good time using it.",
            ""
        ).catch(console.error);
        res.status(201).send();
    }catch{
        res.status(500).send();
    }
});

router.post("/api/login", async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const user = await db.get("SELECT password,email FROM users WHERE email=?", [email]);
    if(user==null){res.status(401).send({ message: "User with email "+email+" doesn't exist" });}
    
    try{
        if (await bcrypt.compare(password,user.password)){
            const acessToken = jwt.sign(user, process.env.SECRET_KEY,{ expiresIn: "2d" });
            res.cookie("jwt", acessToken, {
                maxAge: 172800000,
              });
              res.send({
                message: "Sucessfuly loged in",
              });
        }else{
            res.status(401).send({message: "Wrong password"});
        }

    }catch{
       res.status(500).send(); 
    }
});

router.post("/api/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.send({
      message: "Success",
    });
  });

router.post("/api/reset-password-email", async (req, res)=> {
    const email = req.body.email;
    const token = rString.generate(20);
    const user = await db.get("SELECT * FROM users WHERE email=?", [email]); 
    if (user == null) {
        return res.status(401).send({ message: "There is no user with given e-mail." });
      }
      await db.run("UPDATE users SET resetToken = ? WHERE email = ?", [token, email]);

      sendEmail(user.email,"Password reset link","",
      `<p>You requested for reset password, kindly use this 
      <a href="http://localhost:${process.env.FPORT}/reset-password/`+ token + 
      '">link</a> to reset your password</p>');

      res.status(201).send({ message: "Successfuly sent an email" });

});

router.post("/api/reset-password", async (req,res)=>{
    const resetToken = req.query.token;
    const newPassword = req.body.password;
    const user = await db.get(`SELECT email FROM users WHERE resetToken = ?`,[resetToken]);
    if(user==null){return res.status(401).send()}

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword,salt);

    await db.run("UPDATE users SET password = ? WHERE resetToken = ?", [newHashedPassword, resetToken]);

    res.status(201).send({ message: "The password has been changed." });
});
  

export default router;
