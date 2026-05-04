import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

import "dotenv/config";
import { createServer } from "http";

import app from "./app.js";
import connectDB from "./config/db.js";
import { verifyTransporter } from "./config/mail.js";
import { initSocket } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

let server;

const start = async () => {
  await connectDB();
  await verifyTransporter();

  server = createServer(app);
  initSocket(server);

  server.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  });
};

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err.message);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err.message);
  process.exit(1);
});

start();
