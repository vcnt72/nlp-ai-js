const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
const { NlpManager } = require("node-nlp");
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
require("./services/nlp");
const manager = new NlpManager();
manager.load();

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/message", (req, res) => {
  try {
    const { message } = req.body;
    io.emit("message", message);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error
    });
  }
});

app.post("/message", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await manager.process("en", message);
    let { answer } = response;

    if (answer === undefined) {
      answer = "I don't know the response from this kind of question";
    }

    io.emit("message", answer);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error
    });
  }
});

io.on("connection", function() {
  console.log("Socket.io established");
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
