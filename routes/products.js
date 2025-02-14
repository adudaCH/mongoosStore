const express = require("express");
const router = express.Router();
const joi = require("joi");
const Product = require("../models/Product");

const productSchema = joi.object({
    productId: joi.number().required(),
    name: joi.string().required(),
    price: joi.number().required(),
    category: joi.string().required(),
    description: joi.string().required(),
});

// add new product
router.post("/", async (req, res) => {
    try {
        const { error } = await productSchema.validateAsync(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let product = await Product.findOne({ productId: req.body.productId });
        if (product) return res.status(400).send("Product already exists");
        product = new Product(req.body);
        await product.save();
        res.status(201).send("Product created successfully");
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/:productId", async (req, res) => {
    try {
        const product = await product.findOne({ productId: req.params.productId });
        if (!product) return res.status(404).send("Product not found");
        res.status(200).send(product);
    } catch (error) {
        res.status(404).send("Product not found");
    }
});

router.put("/:productId", async (req, res) => {
    try {
        const { error } = await productSchema.validateAsync(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const product = Product.findOneAndUpdate(
            { productId: req.params.productId },
            req.body, {new:true});
        if (!product) return res.status(404).send("Product not found");

    } catch (error) {
        res.status(400).send(error);

    }
});


router.delete("/:email", async (req, res) => {
    try {
        const product = await product.findOneAndDelete({ email: req.params.email });
        if (!product) return res.status(404).send("Product not found");
        res.status(200).send("Product deleted successfully");
    } catch (error) {
        res.status(400).send(error);
    }
});
module.exports = router;
