import express from "express";
import alarmsRouter from "./routes/alarms-router";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());

app.use("/alarms", alarmsRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
