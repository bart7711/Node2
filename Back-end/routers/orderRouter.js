import { json, Router } from "express";
const router = Router();
import {db} from "../database/createConnection.js";
import { authenticateToken, checkForVendor } from "../public/authentification.js";

router.get("/api/orders",authenticateToken, checkForVendor, async(req,res)=>{
    try {
        const orders = await db.all("SELECT id,user_id,order_id,ammount FROM orders");
        res.send({ data: orders });
      } catch {
        res.status(500).send();
      }
});

router.put("/api/buy-item",authenticateToken, async (req,res)=>{
    const itemID = req.body.item_id
    const userID = req.body.user_id;
    try{
        const item = await db.get("SELECT ammount FROM items WHERE id =?", [itemID]);
        const ammountInStock = item.ammount;
        const ammountToBuy = req.body.ammount;
        
        if(ammountInStock>=0){
            await db.run("DELETE FROM shopping_basket WHERE item_id = ? AND user_id = ?", [itemID,userID]);
            await db.run(`INSERT INTO orders (user_id,item_id,ammount) VALUES(?,?,?)`,[userID,itemID,ammountToBuy])
            res.status(200).send("We did it");
        }else{
            res.status(500).send("Item out of stock or you selected too many items somehow");
        }
    }catch{
        res.status(500).send();
    }
});

export default router;