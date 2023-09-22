import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

export { generateToken };

