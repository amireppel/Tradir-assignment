const express = require("express");
const http = require("http");

const cors = require("cors");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(index);
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
