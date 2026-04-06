import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) return res.status(401).json({ msg: "No token provided" });

  const token = bearerToken.split(" ").pop();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth error", err);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};