const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.connect(process.env.DB_URI).then(() => {
    console.log(`Database connected successfully`);
  });
  // .catch((err) => {
  //   console.error(err);
  //   process.exit(1);
  // });
};

module.exports = dbConnection;
