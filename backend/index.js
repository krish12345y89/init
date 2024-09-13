import mongoose from "mongoose";
import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import https from "https";
import fs from "fs";
import { Server } from "socket.io";
import http from "http";

import * as dotenv from "dotenv";
dotenv.config();

//  routes
import main from "./routes/main.js";
import Admin from "./routes/admin.js";
import { errorHandle } from "./middleware/error.js";

const DB = process.env.DATABASE_KEY;

const app = Express();
// app.use(Express.static("build"));
// app.use(history());
// app.use(Express.static("build"));

const PORT = process.env.PORT || 5000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json({ extended: true, limit: "50mb" }));

app.use(Express.json());

app.use(cors());

// --------------------------deployment------------------------------

// const __dirname1 = path.resolve();

// app.use(Express.static(path.join(__dirname1, "/client/build")));

// app.get("/", (req, res) =>
//   res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
// );
// --------------------------deployment------------------------------

if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(req.body);
    next();
  });
}

app.get("/", (req, res) => {
  res.send("gbn server");
});
//  routes
app.use(main);
app.use("/admins", Admin);

mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then(() => {
    if (process.env.NODE_ENV === "production") {
      const fullchainPath = "/etc/letsencrypt/live/almanilokheri.in/fullchain.pem";
      const privkeyPath = "/etc/letsencrypt/live/almanilokheri.in/privkey.pem";

      const httpsServer = https
        .createServer(
          {
            cert: fs.readFileSync(fullchainPath),
            key: fs.readFileSync(privkeyPath),
          },
          app
        );

      const io = new Server(httpsServer);
      httpsServer.listen(PORT, () => console.info(`[Server] > Listening on port ${PORT}`));
    } else {
      const httpServer = http.createServer(app);
      const io = new Server(httpServer);
      httpServer.listen(PORT, () => console.info(`[Server] > Listening on port ${PORT}`));

      io.on("connection", (socket) => {
        console.log("New client connected");
        socket.on("message", (message) => {
          console.log(`Received message: ${message}`);
          io.emit("message", message);
        });
        socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
      });
    }
  })
  .catch((e) => {
    console.log(e.message);
  });
  app.use(errorHandle);