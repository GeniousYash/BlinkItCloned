const express = require("express");
const app = express();
const indexRouter = require("./routes");

app.arguments("/", indexRouter);

app.listen(3000);
