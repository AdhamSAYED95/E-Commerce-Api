const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");

const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");
const mountRoutes = require("./routes");
// const categoryRoute = require("./routes/categoryRoutes");
// const subcategoryRoute = require("./routes/subCategoryRoutes");
// const brandRoute = require("./routes/brandRoutes");
// const productRoute = require("./routes/productRoutes");
// const userRoute = require("./routes/userRoute");
// const authRoute = require("./routes/authRoute");
// const reviewRoute = require("./routes/reviewRoute");
// const wishlistRoute = require("./routes/wishListRoute");
// const addressRoute = require("./routes/addressRoute");
// const couponRoute = require("./routes/couponRoute");

dotenv.config();

dbConnection();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`${process.env.NODE_ENV} Mode`);
}

/// Routes
mountRoutes(app);
// app.use("/api/v1/categories", categoryRoute);
// app.use("/api/v1/Subcategories", subcategoryRoute);
// app.use("/api/v1/brands", brandRoute);
// app.use("/api/v1/products", productRoute);
// app.use("/api/v1/users", userRoute);
// app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/reviews", reviewRoute);
// app.use("/api/v1/wishList", wishlistRoute);
// app.use("/api/v1/addresses", addressRoute);
// app.use("/api/v1/coupons", couponRoute);

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
