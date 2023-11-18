import jwt from "jsonwebtoken";

export const createToken = async (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return token;
};

export const verifyToken = async (req) => {
  const { token } = req.cookies;
  if (token) {
    return new Promise((resolves, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
        if (err) reject(err);
        resolves(userData);
      });
    });
  }
};
