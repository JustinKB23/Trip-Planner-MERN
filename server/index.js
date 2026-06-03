const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const { routeNotFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/trips", require("./routes/tripRoutes"));

app.use(routeNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
