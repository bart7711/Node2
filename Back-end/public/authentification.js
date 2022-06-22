import jwt from "jsonwebtoken";

export function authenticateToken(req,res,next) {
    const token = req.cookies["jwt"];
    if (token === null) return res.sendStatus(401).send("There is no token");
    jwt.verify(token,process.env.SECRET_KEY, (error, user)=>{
        if(error) return res.sendStatus(403).send("Not valid token");
        req.user=user;
        next();
    });
}

export function checkRightVendor(req,res,next){
    userID = req.body.user_id;
    if(req.user.role=="vendor" && userID === req.user.id ){
        next();
    }else{res.status(403).send({message: "You have to be the right vendor to do this."})}
}

export function checkForVendor(req,res,next){
    if(req.user.role=="vendor"){
        next();
    }else{res.status(403).send({message: "You have to be the vendor to do this."});}
}