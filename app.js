const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(morgan("common"));
app.use(cors());

let apps = require("./appData/app-data");

app.get("/apps", (req, res) => {
  const { sort, genres } = req.query;

  if (sort) {
    if (!["Rating", "App"].includes(sort)) {
      return res.status(400).send("Sort must be on of rating or app");
    }
  }

  if (sort) {
    apps.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  if (genres) {
    if (!["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"]) {
      return res.status(400).send("Genre must be one of the options");
    }
    apps = apps.filter(app => app.Genres.includes(genres));
    console.log("A genre was selected");
  }

  res.json(apps);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
