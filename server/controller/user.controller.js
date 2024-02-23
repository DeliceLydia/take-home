const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const signup = async (req, res) => {
  const { email, name, password } = req.body;
  const inopp = ["joe", "asn", "das"];
  try {
    const haspassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    for (let i = 0; i < inopp.length; i++) {
      if (name == inopp[i]) {
        res.json({
          message: "name is invalid",
        });
        return;
      }
    }

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const saveuser = await UserModel.create({
      email,
      name,
      password: haspassword,
    });
    if (saveuser) {
      res.status(201).json({
        message: "Account created successfully",
        token,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  signup,
  loginUser,
};
