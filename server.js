var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var ExpressSession = require("express-session");
var passport = require("passport");
var mongoose = require("mongoose");
var MongoStore = require("connect-mongo")(ExpressSession);
const path=require('path')

var cors = require("cors");
var app = express();

require("dotenv").config();

mongoose.connect(`${process.env.MONGOURI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.static(path.join(__dirname,'intern/build')))

mongoose.connection.on("open", () => {
  console.log("database connected successfully");
});

app.use(express.)
app.use(logger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use(
  ExpressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    cookie: {
      maxAge: 1000 * 60 * 1000,
      secure: false,
      sameSite: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport");

app.use("/api/user", require("./routes/user"));
app.use("/api/file", require("./routes/file"));
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
