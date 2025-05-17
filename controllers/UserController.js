import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password, confPassword } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        error: true,
        status: "400",
        message: `username ${username} already exists`,
      });
    }

    let emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({
        error: true,
        status: "400",
        message: `email ${email} already exists`,
      });
    }

    if (password !== confPassword) {
      return res.status(400).json({
        error: true,
        status: "400",
        message: `password do not match`,
      });
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(200).json({
      error: false,
      status: "200",
      message: "user Registered",
    });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: true, status: "500", massage: "Server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        error: true,
        status: "400",
        message: "Username Invalid",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: true,
        status: "400",
        message: "Password Invalid",
      });
    }

    const payload = {
      user: { id: user.id, role: user.role },
    };
    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.json({
        error: false,
        status: "200",
        message: "Logged In Successfully",
        token,
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      status: "500",
      massage: "Server error",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    if (!token) {
      return res.status(401).json({
        error: true,
        status: 401,
        message: "Token tidak ada atau tidak valid",
      });
    }
    const users = await User.findOne({
      username: req.params.username,
    }).select("-password");

    if (!users) {
      return res.status(404).json({
        error: true,
        status: 404,
        message: "Pengguna tidak ditemukan",
      });
    }
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      status: 500,
      message: "Server error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select("-password");

    if (allUsers.length > 0) {
      return res.status(200).json({
        error: false,
        status: 200,
        data: allUsers,
      });
    } else if (allUsers.length === 0) {
      return res.status(404).json({
        error: true,
        status: 404,
        message: "Tidak ada pengguna ditemukan",
      });
    }
    res.json(allUsers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: true,
      status: 500,
      message: "Server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        error: true,
        status: "404",
        message: `user ${username} not found`,
      });
    }

    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({
          error: true,
          status: "400",
          message: `user ${username} already exist`,
        });
      }
      user.username = username;
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          error: true,
          status: "400",
          message: `mail ${email} already exists`,
        });
      }
      user.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json({
      error: false,
      status: "200",
      message: `user ${user} updated successfully`,
      user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      status: "500",
      massage: "Server error",
    });
  }
};

export const updateById = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        error: true,
        status: "404",
        message: `user ${username} not found`,
      });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;

    const updateById = await user.save();
    res.status(200).json({ error: false, status: "200", updateById });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: true,
      status: "500",
      massage: "Server error",
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    let user;

    try {
      user = await User.findById(req.user.id);
    } catch (findError) {
      return res.status(500).json({
        error: true,
        status: "500",
        massage: "Server error saat mencari user",
      });
    }

    if (!user) {
      return res.status(404).json({
        error: true,
        status: "404",
        message: `user ${username} not found`,
      });
    }

    try {
      await user.deleteOne();
    } catch (removeError) {
      return res.status(500).json({
        error: true,
        status: "500",
        massage: "Server error saat menghapus user",
      });
    }

    res.status(200).json({
      error: false,
      status: "200",
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      status: "500",
      massage: "Server error",
    });
  }
};

export const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: true,
        status: "404",
        message: `user ${username} not found`,
      });
    }

    await user.deleteOne();
    res.status(200).json({
      error: false,
      status: "200",
      data: { user },
      massage: `User Successfully Deleted`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: true,
      status: "500",
      massage: "Server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ error: false, status: "200", message: "Logout successful" });
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      status: "500",
      massage: "Server error",
    });
  }
};
