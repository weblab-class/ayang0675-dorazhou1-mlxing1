/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.post("/nextMove", (req, res) => {
  socketManager.getIo().to(req.body.room).emit('nextMove', req.body.move);
  res.send({})
})

router.post("/updateBoard", (req, res) => {
  console.log("sent to "+req.body.socketid);
  socketManager.getIo().to(req.body.socketid).emit('incomingBoard', req.body.board);
  res.send({})
})

router.post("/lose", (req, res) => {
  console.log("lose "+req.body.loser)
  console.log(req.body.room)
  socketManager.getIo().to(req.body.room).emit('loser', req.body.loser);
})

router.post("/win", (req, res) => {
  console.log("win "+req.body.winner)
  console.log(req.body.room)
  socketManager.getIo().to(req.body.room).emit('winner', req.body.winner);
})

router.post("/addwin", async (req, res) => {
  console.log("add win for "+req.body.userId);
  const user = await User.findById(req.body.userId);
  if (user) {
    const wins = user.get("wins")
    console.log(wins+1)
    const output = await user.updateOne({ wins : (wins+1) })
    console.log(output)
  }
})

router.post("/addloss", async (req, res) => {
  console.log("add loss for "+req.body.userId);
  const user = await User.findById(req.body.userId);
  if (user) {
    const losses = user.get("losses")
    console.log(losses+1)
    const output = await user.updateOne({ losses : (losses+1) })
    console.log(output)
  }
})

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
