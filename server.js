import Express from "express";
import cors from "cors";
import { originControl } from "./Utility/utility.js";

const app = Express();
app.use(cors(originControl));

app.get("/", (req, res) => {
  res.send("This will be the root url");
});

app.listen(5050, () => {
  console.log("Stream BE server started...\nListening @ Port: 5000");
});
