import express from "express";
import bodyParser from "body-parser";
import http from "http";
import socketIo from "socket.io";
import cors from "cors";
import admin from "./firebase.config";
import { routes, protectRoute } from "./routes";
import {
  db,
  getCanUserAccessConversation,
  getConversation,
  addMessageToConversation,
} from "./db";

const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.get('/hello', (req, res) => {
//   res.send("Hey there!");
// })

routes.forEach((route) => {
  app[route.method](route.path, protectRoute, route.handler);
});

// create an HTTP server wrapping our app
const server = http.createServer(app);

// Wrapping express server in a socket IO instance that can make socket connections with clients
// think the io as the server itself
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.use(async (socket, next) => {
  console.log("Verifying user auth token");
  if (!socket.handshake.query.token) {
    socket.emit("error", "You need to include an auth token");
  }

  const userToken = socket.handshake.query.token;
  const user = await admin.auth().verifyIdToken(userToken);
  socket.user = user;
  next();
});

// when "connection" event occurs, the callback
io.on("connection", async (socket) => {
  console.log("A new client has connected to socket.io!");
  const conversationId = socket.handshake.query.conversationId;

  const conversation = await getConversation(conversationId);
  socket.emit("heresYourConversation", conversation);

  socket.on("postMessage", async ({ text, conversationId }) => {
    // make sure the user is member
    // add their message to the conversation in db
    // get the updated conversation
    // emit an event notifying everyone that there's a new message
    const { user_id: userId } = socket.user;
    const isMember = await getCanUserAccessConversation(userId, conversationId);
    if (isMember) {
      await addMessageToConversation(text, userId, conversationId);
      const updatedConversation = await getConversation(conversationId);
      io.emit("messageUpdated", updatedConversation.messages);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected!");
  });
});

const start = async () => {
  await db.connect("mongodb://localhost:27017");
  server.listen(8080, () => {
    console.log("Server is listening on port 8080");
  });
};

start();
