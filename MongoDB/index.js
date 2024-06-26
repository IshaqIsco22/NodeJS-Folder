const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/testDatabase")
  .then(() => {
    console.log("Connection is successful");
  })
  .catch((err) => console.error("Couldn't connect", err));

// Schema

const courseSchema = new mongoose.Schema({
  name: String,
  creator: String,
  publishedDate: { type: Date, default: Date.now },
  isPublished: Boolean,
  rating: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Ruby",
    creator: "Admin 4",
    isPublished: false,
    rating: 3.7,
  });
  const result = await course.save();

  console.log(result);
}

// comparison operators
// eq equal
// gt greater than
// gte greater than or equal to
// lt less than
// lte less than or equal to




async function getCourses() {
  const courses = await Course.find({ rating: { $in: [3.1, 3.5] } }).select({
    name: 1,
    publishedDate: 1,
  });
  console.log(courses);
}

// createCourse();
getCourses();
