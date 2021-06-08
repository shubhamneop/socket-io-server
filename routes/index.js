const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.send({ response: "I am alive" }).status(200);
});

module.exports = router;
