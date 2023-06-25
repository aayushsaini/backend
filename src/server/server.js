import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";
import dotenv from "dotenv";

import { originControl } from "./server.utility.js";
import { messages } from "../constants/messages.constant.js";

dotenv.config();
const app = Express();

app.use(cors(originControl));
app.use(Express.json());

// Routes
readdirSync("./src/routes/").map((route) =>
  import(`../routes/${route}`).then((importedRoute) =>
    app.use("/api", importedRoute.default)
  )
);

// DB Connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log(`${messages.success.server.dbConnected}`))
  .catch((err) => console.log(`${messages.error.server.dbConnectFail} ${err}`));

// Server Connection
const PORT = process.env.PORTS || 3007;
app.listen(PORT, () => {
  console.log(`${messages.success.server.serverStarted} ${PORT}`);
});

export default app;
