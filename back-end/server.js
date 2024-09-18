const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cron = require("node-cron");
const sendNotification = require("./notification");

const app = express();
app.use(express.json()); 

const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost/task_management', { useNewUrlParser: true, useUnifiedTopology: true });

const Task = mongoose.model('Task', new mongoose.Schema({
  name: String,
  dueDate: Date,
  assignedTo: String,
}));

const getUserFCMToken = async (userId) => {
    // Implement logic to retrieve FCM token for a given user ID
    // For example, you might query a database or use a caching layer
    const token = await retrieveFCMTokenFromDatabase(userId);
    return token;
  };

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("taskUpdated", (task) => {
    io.emit("taskUpdated", task);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.post("/api/tasks/:id/assign", (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  Task.findByIdAndUpdate(id, { assignedTo: userId }, { new: true }, (err, task) => {
    if (err) return res.status(500).send(err);

    
    const userToken = getUserFCMToken(userId);
    sendNotification(userToken, "Task Assigned", "A new task has been assigned to you.");

    res.send(task);
  });
});

cron.schedule("0 9 * * *", async () => {
    try {
      const tasks = await Task.find({ dueDate: { $lte: new Date() } });
      tasks.forEach( async (task) => {
        const userToken = await getUserFCMToken(task.assignedTo);
        sendNotification(userToken, "Task Due Reminder", `The task ${task.name} is due soon.`);
      });
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  });

app.get("/", (req, res) => {
    res.send("Welcome to the Task Management App!");
  });

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
