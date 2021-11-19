const bcrypt = require("bcrypt");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/keys");
const jwt = require("jsonwebtoken");

//db
const { User } = require("../db/models");

exports.signup = async (req, res, next) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
    const hashedConfirmPassword = await bcrypt.hash(
      req.body.confirmPassword,
      saltRound
    );

    req.body.password = hashedPassword;
    req.body.confirmPassword = hashedConfirmPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signin = (req, res) => {
  const token = generateToken(req.user);
  res.json({ token });
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    slug: user.slug,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, "giveitasecretkey");
  return token;
};
