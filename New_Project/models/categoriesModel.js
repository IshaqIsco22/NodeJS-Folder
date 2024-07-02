const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
  });
  
  const Category = mongoose.model("Category", categorySchema);

  function validateData(category) {
    const schema = {
      name: Joi.string().min(3).required(),
    };
    return Joi.validate(category, schema);
  }