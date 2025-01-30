import express from "express"; // Importing Express to set up a router for handling API endpoints.
import { login, register } from "../Controllers/User.js"; // Importing the login and register controller functions to handle respective logic.

const router = express.Router(); // Creating a new router instance to define route handlers.

// Route for user registration
// Handles POST requests to the "/register" endpoint and calls the `register` function to process user registration logic.
router.post("/register", register);

// Route for user login
// Handles POST requests to the "/login" endpoint and calls the `login` function to process user login logic.
router.post("/login", login);

export default router; // Exporting the router instance so it can be imported and used in the main application (e.g., app.js).
