import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log("cosole from veryfyToken", error);
    return null; // Token is invalid or expired
  }
};
