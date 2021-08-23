const express = require("express");
const http = require("http");

const cors = require("cors");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);
app.use(cors());

const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const io = socketIo;

let interval;

io.on("connection", (socket) => {
  console.log("socketIo: connect");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("socketIo: disconnect");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const generatePrices = (num) => {
    const pips =
      Math.floor(Math.random() * 7) / 10 + Math.floor(Math.random() * 10) / 100;
    return { bid: num + pips, offer: num + pips - 0.5 };
  };
  const mockData = [
    {
      currencyPairName: "USD / ILS",
      prices: generatePrices(3),
    },
    {
      currencyPairName: "EUR / USD",
      prices: generatePrices(1),
    },
    {
      currencyPairName: "USD / JPY",
      prices: generatePrices(110),
    },
  ];

  socket.emit("tick", mockData);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
