const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const serviceRoutes = require("./routes/service")

dotenv.config({ path: "configs/config.env" });
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", serviceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
