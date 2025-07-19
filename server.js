import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/common/config/db.js";
import morgan from "morgan";
import router from "./src/router/index.js";

// ket noi database
connectDB();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use("/api", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Truy cập: http://localhost:${PORT}`);
});
