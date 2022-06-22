import { json, Router } from "express";
const router = Router();
import {db} from "../database/createConnection.js";
import { authenticateToken, checkForVendor } from "../public/authentification.js";

router.get("/api/basketItems/:id", authenticateToken, async (req,res)=>{
    const userID = req.params.id
    try{
        const items = await db.all("SELECT user_id, item_id, ammount FROM shopping_basket WHERE user_id =?", [userID]);
        res.send({data:items})
    }catch{
        res.status(500).send();
    }
});

router.post("/api/basketAdd", authenticateToken, async (req,res)=>{
    const userID = req.body.user_id;
    const itemID = req.body.item_id
    const amm = req.body.ammount;

    try{
        const item = await db.get("SELECT ammount FROM items WHERE id =?", [itemID]);
        const ammountInStock = item.ammount;
        const ammountToBuy = amm;
        const newAmmount = ammountInStock - ammountToBuy;

        if(newAmmount >= 0 ){
           const itemIds = await db.all("SELECT item_id FROM shopping_basket WHERE user_id =?", [userID]);
           const ids = itemIds.map(item => item.item_id);
           if(ids.includes(itemID)){
                const item = await db.get("SELECT ammount FROM shopping_basket WHERE item_id =?", [itemID]);
                const totalAmmountInBasket = amm + item.ammount;
                db.run(`UPDATE shopping_basket SET ammount=? WHERE item_id=?`,[totalAmmountInBasket,itemID]);
                db.run(`UPDATE items SET ammount=? WHERE id=?`,[newAmmount,itemID]);
                res.send({ message: "Success"});
           }else{
                db.run(`UPDATE items SET ammount=? WHERE id=?`,[newAmmount,itemID]);
                db.run(`INSERT INTO shopping_basket (user_id, item_id, ammount)VALUES(?,?,?)`,[userID,itemID,amm])
                res.send({ message: "Success"});
           }
        }else{
            res.status(201).send("Item out of stock or you selected too many items somehow");
        }
    }catch{
        res.status(500).send();
    }
});

router.delete("/api/basketRemove", authenticateToken, async (req,res)=>{
    const userID = req.body.user_id;
    const itemID = req.body.item_id;
    try{
        const ammountCancelled = await db.get("SELECT ammount FROM shopping_basket WHERE item_id =? AND user_id=?", [itemID,userID]);
        const ammountInShop = await db.get("SELECT ammount FROM items WHERE id =?", [itemID]);
        const ammountTotal = ammountCancelled.ammount + ammountInShop.ammount;
        db.run("DELETE FROM shopping_basket WHERE item_id = ? AND user_id = ?", [itemID,userID]);
        db.run("UPDATE items SET ammount=? WHERE id=?",[ammountTotal,itemID]);
        const amm = await db.get("SELECT ammount FROM items WHERE id =?", [itemID]);
        res.status(200).send({message:"Success"})
    }catch{
        res.status(500).send();
    }
});

export default router;