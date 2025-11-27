import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const authHeader =
    req.headers.authorization || req.headers.Authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
