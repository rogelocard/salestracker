const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://rsca:admin123@cluster0.qbz06cj.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

// endpoint to all fetch salesRecords

app.get("/records", async (req, res) => {
  try {
    const records = await Records.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records" });
  }
});
