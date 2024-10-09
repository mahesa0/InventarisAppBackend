import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password, confPassword } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    let emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    if (password !== confPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.json({ msg: "User Registered" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: { id: user.id, role: user.role },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            username: user.username,
            email: user.email,
            role: user.role,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findById(req.user.id).select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select("-password");
    res.json(allUsers);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const updateProfile = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ msg: "Username already exists" });
      }
      user.username = username;
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ msg: "Email already exists" });
      }
      user.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ msg: "User updated successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const updateById = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).send("user Not Found");
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;

    const updateById = await user.save();
    res.status(200).json({ updateById });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const deleteProfile = async (req, res) => {
  try {
    let user;

    try {
      user = await User.findById(req.user.id);
    } catch (findError) {
      return res.status(500).send("Server error saat mencari user");
    }

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    try {
      await user.deleteOne();
    } catch (removeError) {
      return res.status(500).send("Server error saat menghapus user");
    }

    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    await user.deleteOne();
    res.status(200).send("User Successfully Deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ msg: "Logout successful" });
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
