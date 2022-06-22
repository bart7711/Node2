import { json, Router } from "express";
const router = Router();
import {db} from "../database/createConnection.js";
import { authenticateToken, checkRightVendor, checkForVendor } from "../public/authentification.js";

router.get("/api/items", async (req, res) => {
  try {
    const items = await db.all("SELECT id,name,price,category,ammount,imageLink,user_id,description FROM items");
    res.send({ data: items });
  } catch {
    res.status(500).send();
  }
});

router.get("/api/items-by-category", async (req, res) => {
  const category = req.query.category;
  try {
    const items = await db.all("SELECT id,name,price,category,ammount,imageLink,user_id,description FROM items WHERE category =?", [category]);
    res.send({ data: items });
  } catch {
    res.status(500).send();
  }
});

router.get("/api/itemsForVendor/:userID", async (req,res)=>{
  const userID = req.params.userID;
  try{
  const items = await db.all("SELECT id,name,price,category,ammount,imageLink,user_id,description FROM items WHERE user_id =?", [userID]);
  res.send({data:items});
  }catch{
    res.status('500').send();
  }
});

router.get("/api/item/:id", async (req, res) => {
  try {
    const item = await db.get("SELECT id,name,price,category,ammount,imageLink,user_id,description FROM items WHERE id =?", [req.params.id]);
    if(item===undefined){res.status(404).send({message:"There is none"});}
    res.send({ data: item });
  } catch {
    res.status(500).send();
  }
});

router.post("/api/items",authenticateToken,checkForVendor, async (req, res) => {
    try {
        const newItem = req.body
        await db.run("INSERT INTO items (name,price,category,ammount,imageLink,user_id,description) VALUES(?,?,?,?,?,?,?)", [
        newItem.name,
        newItem.price,
        newItem.category,
        newItem.ammount,
        newItem.imageLink,
        req.user.id,
        newItem.description,
      ]);
      res.send({ data: newItem });
    } catch {
      res.status(500).send();
    }
  });

router.put("/api/item/:itemId", authenticateToken, checkRightVendor, async (req, res) => {
    try {
      const item = req.body;
      const itemId = req.params.itemId;
      const updatedItem = await db.run("UPDATE items SET name = ?, price = ?, category = ?, ammount =?, imageLink=?, description = ?, WHERE id = ?", [
        item.name,
        item.price,
        item.category,
        item.ammount,
        item.imageLink,
        item.description,
        itemId,
      ]);
      res.send({ data: updatedItem });
    } catch {
      res.status(500).send();
    }
  });

  router.delete("/api/item/:itemId", authenticateToken, checkRightVendor, async (req, res) => {
    const itemId = req.params.itemId;
    try {
      await db.run("DELETE FROM items WHERE id = ?", [itemId]);
      res.send({ message: "Successfuly deleted item with id "+itemId });
    } catch {
      res.status(500).send();
    }
  });

export default router;
