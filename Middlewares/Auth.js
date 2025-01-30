import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";
export const Authenticate = async (req, res, next) => {
  const token = req.header("Auth");
  console.log("this is token", token);

  if (!token) return res.status(400).json({ message: "Login first" });

  //jwt verify
  const decoded = jwt.verify(token,process.env.JWT_Secret);
  const id = decoded.userId;

  //if user not find
  
  let user = await User.findById(id)

  if (!user) return res.json({ message: "user not find" });
  req.user = user;
  next();
};

