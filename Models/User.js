import mongoose from "mongoose"; // Importing Mongoose to define a schema and interact with MongoDB.

// Define the schema for the User collection
const userSchema = new mongoose.Schema({
  name: { type: String, require: true }, // Field for the user's name, required.
  email: { type: String, require: true }, // Field for the user's email, required.
  password: { type: String, require: true }, // Field for the user's password, required.
  createdAt: { type: Date, default: Date.now }, // Timestamp field, defaults to the current date and time.
});

// Create and export the User model
export const User = mongoose.model("User", userSchema); 
// 'User' will map to the 'users' collection in the MongoDB database.
