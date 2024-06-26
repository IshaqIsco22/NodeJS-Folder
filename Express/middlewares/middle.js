function myMiddleware(req, res, next) {
  console.log("I'm custom middleware");
  next();
}

// app.use(function (req, res, next) {
//   console.log("I'm second middleware");
//   next();
// });

module.exports = myMiddleware;
