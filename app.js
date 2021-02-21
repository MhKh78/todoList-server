const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorController = require("./controllers/errorController");
const AuthRoutes = require("./routes/AuthRoutes");
const TodoRoutes = require("./routes/TodoRoutes");
const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));
app.use(cors());
app.use("/api/v1/users", AuthRoutes);
app.use("/api/v1/todos", TodoRoutes);

app.use(errorController);
module.exports = app;
