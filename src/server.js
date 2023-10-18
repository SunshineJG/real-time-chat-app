import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { routes } from "./routes";
import { db } from "./db";

const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.get('/hello', (req, res) => {
//   res.send("Hey there!");
// })

routes.forEach((route) => {
  app[route.method](route.path, protectRoute, route.handler);
});

const start = async () => {
  await db.connect("mongodb://localhost:27017");
  app.listen(8080, () => {
    console.log("Server is listening on port 8080");
  });
};

start();
