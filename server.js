const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");

const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");
const mountRoutes = require("./routes");
const { webhookCheckout } = require("./services/orderService");

dotenv.config();

dbConnection();

const app = express();

app.use(cors());
app.use(compression());
app.options("*", cors());

app.use("/", (req, res, next) => {
  if (req.path === "/") {
    res.send(
      `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Hello</title></head><body><h1>Hello, welcome to my API project!</h1></body></html>`
    );
  } else {
    next();
  }
});

app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookCheckout
);

app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`${process.env.NODE_ENV} Mode`);
}

mountRoutes(app);

app.all("*", (req, res, next) => {
  next(new ApiError(`Cant find this route : ${req.originalUrl}`, 400));
});
/// Error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
