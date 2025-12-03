const userSchema = require("../models/userSchema");
const { isValidEmail } = require("../utils/validations");

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName)
      return res.status(400).send({ message: "Full Name is required" });
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!isValidEmail(email))
      return res.status(400).send({ message: "Enter a valid email address" });
    if (!password)
      return res.status(400).send({ message: "Password is required" });
    const existingUser = await userSchema.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .send({ message: "User with this email already exist" });

    const user = new userSchema({
      fullName,
      email,
      password,
    });
    user.save();
    res.status(201).send({ message: "Registration successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!isValidEmail(email))
      return res.status(400).send({ message: "Enter a valid email address" });
    if (!password)
      return res.status(400).send({ message: "Password is required" });

    const existingUser = await userSchema.findOne({ email });
    if (!existingUser)
      return res.status(400).send({ message: "User not found" });
    const matchPass = await existingUser.comparePassword(password);
    if (!matchPass)
      return res.status(400).send({ message: "Incorrect password" });

    res.status(200).send({ message: "Login Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login };
