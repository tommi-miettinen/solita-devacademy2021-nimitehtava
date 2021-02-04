require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

app.get("/names", async (req, res) => {
  try {
    const data = await db.getDb().db().collection("Nimet").findOne();
    if (data) return res.send(data);
    res.status(500).send({ error: "kävi kehnosti" });
  } catch (err) {
    res.status(500).send({ error: "kävi kehnosti" });
  }
});

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => console.log(`Server started on port ${port}`));
  }
});
