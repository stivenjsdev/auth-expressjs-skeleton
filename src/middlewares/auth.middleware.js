import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  let token =
    req.headers["x-access-token"] || req.headers["authorization"] || "";

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(401).json({
      ok: false,
      error: "There is no token in the request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = uid;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }

  next();
};

export { checkToken };

