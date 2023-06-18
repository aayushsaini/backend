import Express from "express";
import cors from "cors";
import { readdirSync } from "fs";

import { PORT } from "./server.config.js";
import { originControl } from "./server.utility.js";

const app = Express();

app.use(cors(originControl));

readdirSync("./Routes/").map((route) =>
  import(`../Routes/${route}`).then((importedRoute) =>
    app.use("/api", importedRoute.default)
  )
);

app.listen(PORT, () => {
  console.log(`Stream BE server started...\nListening @ Port: ${PORT}`);
});

export default app;
