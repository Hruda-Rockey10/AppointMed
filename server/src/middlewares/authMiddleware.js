const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        message: "Auth Failed - No token provided",
        success: false,
      });
    }
    const token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return res.status(401).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.userId = decode.id;
        
        // Check if user is blocked
        try {
          const userModel = require("../models/userModels");
          const user = await userModel.findById(req.userId);
          if (user && user.isBlocked) {
            return res.status(401).send({
              message: "Your account has been blocked",
              success: false,
            });
          }
          next();
        } catch (error) {
          console.log(error);
          return res.status(401).send({
            message: "Auth Failed",
            success: false,
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};
