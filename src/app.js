const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//PROCESAR VIEWS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(morgan("dev"));
// DEFINE A ROUTE TO SERVE THE STATIC FILES FROM THE '/PDF' FOLDER
app.use("/pdf", express.static(path.join(__dirname, "pdf")));

//STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
app.use(require("./controllers/userController"));
app.use(require("./controllers/minuteController"));
app.use(require("./controllers/agreementController"));
app.use(require("./controllers/follow_meController"));

app.use(require("./controllers/authController"));
app.use(require("./routes/authRoute"));

//EMAIL ROUTE
app.use(require("./controllers/mailController"));
app.use(require("./routes/mailRoute"));

app.use((req, res) => {
  res.status(404).end("404 not found");
});

module.exports = app;
