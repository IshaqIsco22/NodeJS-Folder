const express = require("express");
const app = express();
const morgan = require("morgan");
const myMiddleware = require("./middlewares/middle");

app.use(express.json());

app.use(myMiddleware);

app.use(morgan("tiny"));

const courses = [
  { id: 1, name: "Javascript" },
  { id: 2, name: "Typescript" },
  { id: 3, name: "NodeJS" },
  { id: 4, name: "DBMS" },
];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/about", (req, res) => {
  res.send("We create impact");
});

app.get("/courses", (req, res) => {
  // console.log(courses);
  res.send(courses);
});

app.post("/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/courses/:coursename", (req, res) => {
  let course = courses.find((course) => course.name === req.params.coursename);
  if (!course)
    res.status(404).send("the course u r looking for does not exist");
  course.name = req.body.name;
  res.send(course);
});

app.get("/courses/:coursename", (req, res) => {
  //   console.log(req.params.id);
  let course = courses.find((course) => course.name === req.params.coursename);
  if (!course)
    res.status(404).send("the course u r looking for does not exist");
  res.send(course);
});

app.delete("/courses/:coursename", (req, res) => {
  let updtdCourse = courses.filter(
    (course) => course.name !== req.params.coursename
  );
  courses = updtdCourse;
  res.send(courses);
});

// app.delete("/courses/:id", (req, res) => {
//   let course = courses.find((course) => course.id === req.params.id);
//   if (!course)
//     res.status(404).send("the course u r looking for does not exist");
//   const index = courses.indexOf(course);
//   courses.splice(index, 1);
//   res.send(courses);
// });

app.listen(3000, () => console.log("port running"));
