require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors({ origin: ["http://127.0.0.1:5500", "http://localhost:5500"] }));
app.use(express.json());

app.get("/", (req, res) => res.send("IGEC server is running"));
app.use("/api", require("./routes/auth"));
app.use("/api/blogs", require("./routes/blog"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("DB connection error:", err.message));