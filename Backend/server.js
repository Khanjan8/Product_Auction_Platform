// import app from "./app.js";
// import cloudinary from "cloudinary";

// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// app.listen(process.env.PORT, () => { 
//     console.log(`Server started on port ${process.env.PORT}`);
// });


import app from "./app.js";
import cloudinary from "cloudinary";
import http from "http";
import { Server } from "socket.io";

// 1. Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Create an HTTP server from Express app
const server = http.createServer(app);

// 3. Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // or your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// 4. Setup global access to io
global.io = io;

// 5. Handle socket connection
io.on("connection", (socket) => {
  console.log("🟢 New client connected");

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

// 6. Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
