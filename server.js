const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");

require("./config/db"); // connect to DB

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
