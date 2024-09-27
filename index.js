import express from "express";
import authRouter from "./Routes/auth.js";
import connectToDB from "./db.js";
import adminRouter from "./Routes/admin/index.js";

// connect to db
connectToDB();

// Set up the Express app to use the auth router
const app = express();

const port = 4000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to log incoming requests
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
