const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const products = require("./routes/products");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const logger = (req, res, next) => {
    console.log(`${req.method + req.url}`);
    next();
};

mongoose
    .connect(process.env.DB)
    .then(() => console.log("Connected to MongoDB server"))
    .catch((error) => console.log(error));





app.use(logger);
app.use("/api/products", products)
app.listen(port, () => console.log("Server started on port", port));
