const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/testDatabase")
  .then(() => {
    console.log("Connection is successful");
  })
  .catch((err) => console.error("Couldn't connect", err));

// Schema

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  tags: {
    type: Array,
    validate: {
      validator: function (tags) {
        return tags.length > 1;
      },
    },
  },
  creator: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, required: true },
  rating: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Ruby",
    creator: "Admin 4",
    isPublished: false,
    rating: 3.7,
    tags: ["express", "mongoDB"],
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    for (field in err.errors) {
      console.error(err.errors[field]);
    }
  }
}

// comparison operators
// eq equal
// gt greater than
// gte greater than or equal to
// lt less than
// lte less than or equal to

// Logical Operators
// or
// and

async function getCourses() {
  const courses = await Course.find({
    rating: { $in: [3.3, 3.5, 3.7, 3.8] },
  })
    .select({
      name: 1,
      publishedDate: 1,
    })
    // .and([{ creator: "Ishaq" }, { rating: 4.5 }])
    .or([{ creator: "Ishaq" }, { rating: 4.5 }]);
  console.log(courses);
}

createCourse();
// getCourses();

async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.name = "PHP";
  course.creator = "Ishan";
  const updateResult = await course.save();
  console.log(updateResult);
}

// updateCourse("667ac0f577c41968b6bbc9bc");

async function deleteCourse(id) {
  const course = await Course.findByIdAndDelete(id);
  console.log(course);
}

// deleteCourse("667ac256c9ca0a6c51d3a4ad");
