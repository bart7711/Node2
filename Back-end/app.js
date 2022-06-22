import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter.js";
import itemRouter from "./routers/itemRouter.js";
import orderRouter from "./routers/orderRouter.js"
import shoppingRouter from "./routers/shoppingBasket.js";
import rateLimit from 'express-rate-limit';


const app = express();
app.use(express.json());
app.use(helmet());

app.use(
  cors({
    credentials: true,
    origin: [`http://localhost:${process.env.FPORT}`, `http://localhost:${process.env.PORT}`],
  })
);

app.use(cookieParser());
app.use(userRouter);
app.use(itemRouter);
app.use(orderRouter);
app.use(shoppingRouter);


const baseLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const authLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 5, 
	standardHeaders: true,
	legacyHeaders: false, 
});

app.use(baseLimiter);
app.use("/login", authLimiter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Starting server on port:", PORT);
});