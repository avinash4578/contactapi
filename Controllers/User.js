import { User } from "../Models/User.js"; // Importing the User model to interact with the database.
import bcrypt from 'bcrypt'; // Importing bcrypt for password hashing and verification.
import jwt from 'jsonwebtoken' // JWT library for token generation 

// Register user
export const register = async (req, res) => {
  const { name, email, password } = req.body; // Destructuring the request body to extract user input.

  // Check if any field is empty
  if (name == " " || email == " " || password == " ")
    return res.status(400).json({ message: "All fields are required" });

  // Check if a user with the same email already exists
  let user = await User.findOne({ email });

  if (user) return res.json({ message: "User already exists...!" });

  // Hash the password before saving it to the database
  const hashPass = await bcrypt.hash(password, 10);

  // Create a new user with the hashed password
  user = await User.create({
    name,
    email,
    password: hashPass,
  });

  // Respond with a success message and the created user
  res.json({ message: "User Registered Successfully...!", user });
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body; // Destructuring the request body to extract user credentials.

  // Check if any field is empty
  if (email == " " || password == "")
    return res.status(400).json({ message: "All fields are required" });

  // Find the user in the database by email
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" }); // Return a message if the user doesn't exist.

  // Compare the provided password with the stored hashed password
  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass) return res.json({ message: "Invalid Credentials" }); // Return an error if the password doesn't match.

  // Generate a token 
  const token = jwt.sign(
    { userId:user._id },process.env.JWT_Secret,
    { expiresIn: '1d' }
  )
  // Respond with a welcome message on successful login
  res.json({ message: `Welcome back ${user.name}`,token });
};
