const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");


const router = express.Router();

// const { schema } = require("joi/lib/types/object");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 30 },
});

const Category = mongoose.model("Category", categorySchema);

router.get("/", async (req, res) => {
  let categories = await Category.find();
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  const category = new Category({
    name: req.body.name,
  });
  await category.save();
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!category)
    return res.status(404).send("The category with the given ID was not found");

  category.name = req.body.name;
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category)
    return res.status(404).send("The category with the given ID was not found");
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).send("The category with the given ID was not found");
  res.send(category);
});

function validateData(category) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(category, schema);
}

module.exports = router;
