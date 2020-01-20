const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/api/accounts", async (req, res) => {
  try {
    const accounts = await db("accounts");
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ err });
  }
});

server.get("/api/accounts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const account = await db("accounts").where({ id });
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ err });
  }
});

server.post("/api/accounts", async (req, res) => {
  console.log(req.body);
  try {
    const accounts = await db("accounts").insert(req.body);
    res.status(201).json(accounts);
  } catch (err) {
    res.status(500).json({ err });
  }
});

server.put("/api/accounts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const accounts = await db("accounts")
      .where({ id })
      .update(req.body);
    res.status(201).json(accounts);
  } catch (err) {
    res.status(500).json({ err });
  }
});

server.delete("/api/accounts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db("accounts")
      .where({ id })
      .del();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = server;
