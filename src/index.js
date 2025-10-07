import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { CreateUserModel } from "./db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.post("/api/v1/createUser", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const gender = req.body.gender;
  const status = req.body.status;
  const profilePic = req.body.profilePic;
  const location = req.body.location;

  await CreateUserModel.create({
    firstName,
    lastName,
    email,
    mobile,
    gender,
    status,
    profilePic,
    location,
  });

  res.json({
    message: "User created successfully",
  });
});

app.put("/api/v1/updateUser/:id", async (req, res) => {
  const id = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const gender = req.body.gender;
  const status = req.body.status;
  const profilePic = req.body.profilePic;
  const location = req.body.location;

  await CreateUserModel.findByIdAndUpdate(id, {
    firstName,
    lastName,
    email,
    mobile,
    gender,
    status,
    profilePic,
    location,
  });

  res.json({
    message: "User updated successfully",
  });
});

app.delete("/api/v1/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  await CreateUserModel.findByIdAndDelete(id);

  res.json({
    message: "User deleted successfully",
  });
});

app.get("/api/v1/getUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await CreateUserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
});

app.get("/api/v1/getUser", async (req, res) => {
  try {
    const users = await CreateUserModel.find();
    res.json(users); 
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

