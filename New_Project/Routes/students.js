const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Joi = require("joi");

const studentSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 30 },
  isEnrolled: { type: Boolean, default: false },
  Phone: { type: String, required: true, minLength: 10, maxLength: 20 },
});

const Student = mongoose.model("Student", studentSchema);

router.get("/api/students", async (req, res) => {
  let students = await Student.find();
  res.send(students);
});

router.post("/", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  const student = new Student({
    name: req.body.name,
    isEnrolled: req.body.isEnrolled,
    Phone: req.body.Phone,
  });
  await student.save();
  res.send(student);
});

router.put("/:id", async (req, res) => {
  const { error } = validateData(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { Phone: req.body.Phone },
    { isEnrolled: req.body.isEnrolled },
    { new: true }
  );
  if (!student)
    return res.status(404).send("The student with the given ID was not found");

  student.name = req.body.name;
  res.send(student);
});

router.delete("/:id", async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student)
    return res.status(404).send("The student with the given ID was not found");
  res.send(student);
});

router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student)
    return res.status(404).send("The student with the given ID was not found");
  res.send(student);
});

function validateData(student) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    Phone:Joi.string().min(10).max(50).required(),
    isEnrolled: Joi.boolean(),
  };
  return Joi.validate(student, schema);
}

module.exports = router;
