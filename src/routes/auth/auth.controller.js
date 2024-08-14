import bcrypt from "bcrypt";
import { findEmail, saveUser } from "../../model/auth.model.js";

async function signup(req, res) {
  try {
    const { email, password } = req.body;

    //initial validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    //if email already exists
    const existingEmail = await findEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //if password is less than 6 charactersd
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 2);

    //save user to database
    await saveUser(email, hashedPassword);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    //initial validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    //if email does not exist
    const existingEmail = await findEmail(email);
    if (!existingEmail) {
      return res.status(400).json({ message: "User does not exist" });
    }

    //if password is incorrect
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingEmail.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //login user
    res.status(200).json({
      message: "User logged in Sucessfully",
      user: {
        email: existingEmail.email,
        id: existingEmail.userid,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { signup, login };
