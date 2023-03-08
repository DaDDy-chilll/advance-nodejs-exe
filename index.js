//? I'm a child, i'm going to act like a server
//? and do nothing else
const express = require("express");
// const crypto = require("crypto");
const Worker = require("worker_threads").Worker;
const app = express();

// app.get("/", (req, res) => {
//   crypto.pbkdf2("a", "b", 10000, 512, "sha512", () => {
//     res.send("Hi there");
//   });
// });

app.get("/", (req, res) => {
  const worker = new Worker(function () {
    this.onmessage = function () {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }
      postMessage(counter);
    };
  });
  worker.onmessage = function (myCounter) {
    console.log(myCounter);
  };
  worker.postMessage();
});

app.get("/fast", (req, res) => {
  res.send("This was fast!");
});

app.listen(3000);
