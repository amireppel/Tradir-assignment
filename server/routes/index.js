const express = require("express");

const cors = require("cors");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});
router.get("/getBalance/:id", (req, res) => {
  let balance;
  if(req.params.id==1){
    balance = '4M'
  }
  else{
    balance = '2M'
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(balance));

});
module.exports = router;
