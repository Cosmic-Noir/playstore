const express = require("express");
const morgan = require("morgan");

const app = express();

app.get("/apps", (req, res) => {
  // code goes here
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
