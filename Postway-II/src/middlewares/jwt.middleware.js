import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const token = req.headers["authorization"];

  console.log(token);

  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userID;
    
  } catch (err) {
    console.log(err);
    return res.status(401).send("Unauthorized");
  }
  next();
};

export default jwtAuth;
