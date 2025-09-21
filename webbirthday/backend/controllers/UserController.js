// controllers/UserController.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserController = {
  // [POST] /api/users/createUser
  createUser: async (req, res) => {
    try {
      const { username, password, userID } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
        userID,
      });

      await newUser.save();
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          userID: newUser.userID,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // [POST] /api/users/login
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // so sánh password với hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // tạo token
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // [GET] /api/users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find(
        {},
        "username isAdmin isActive createdAt userID cards"
      );
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // [GET] /api/users/:id
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate(
        "cards",
        "cardName imgURL lastEdit"
      );
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  // [PUT] /api/users/:id
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });

      res.json({ message: "User updated", user: updatedUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default UserController;
