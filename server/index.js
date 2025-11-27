import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import process from "node:process";
dotenv.config({
  path: "./.env",
});

const app = express();
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: [
      "https://e-commerce-client-12.vercel.app",
      "http://localhost:5137",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    exposedHeaders: ["X-Total-Count"],
  })
);

connectDB();

app.listen(
  process.env.PORT,
  console.log(
    "Server is listening on PORT : \n" + `http://localhost:${process.env.PORT}`
  )
);

// app.use((req, res, next) => {
//   if (!req.secure && req.get("x-forwarded-proto") !== "https") {
//     return res.redirect(`https://${req.get("host")}${req.url}`);
//   }
//   next();
// });

// # Routes Import

import { router as productRouter } from "./routes/product.router.js";
import { router as categoryRouter } from "./routes/category.router.js";
import { router as brandRouter } from "./routes/brand.router.js";
import { router as userRouter } from "./routes/user.router.js";
import { router as authRouter } from "./routes/auth.router.js";
import { router as cartRouter } from "./routes/cart.router.js";
import { router as orderRouter } from "./routes/order.router.js";

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/brands", brandRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, message });
});
