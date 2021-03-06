const express = require("express");

const server = express.Router();
const News = require("../models/News.model");

const ensureAuth = require("../helpers/ensureAuth");
const isAdmin = require("../helpers/isAdmin");
// Get the list
server.get("/list", async (req, res) => {
  try {
    let newsList = await News.find({});
    res.send(newsList);
  } catch {
    throwError();
  }
});

// Get single news
server.get("/:id", async (req, res) => {
  try {
    let newsItem = await News.findById(req.params.id);
    res.send(newsItem);
  } catch {
    throwError();
  }
});

// Create a new record
server.post("/", ensureAuth, isAdmin, async (req, res) => {
  let { title, body, image, date, comments } = req.body;

  let newsItem = new News({
    title,
    body,
    date,
    image,
    comments
  });

  newsItem.save().then(record => {
    res.send(record);
  });
});

// Edit the record
server.put("/:id", ensureAuth, isAdmin, (req, res) => {
  try {
    let id = req.params.id;

    let { title, body, date, image } = req.body;

    News.findByIdAndUpdate(id, { title, body, date, image }).then(() => {
      res.sendStatus(204);
    });
  } catch {
    throwError();
  }
});

// Delete the record
server.delete("/:id", ensureAuth, isAdmin, (req, res) => {
  let id = req.params.id;
  
  News.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      throwError();
    });
});

let throwError = () => {
  throw new Error("An error occurred in the db");
};

module.exports = server;
