const createError = require("http-errors");
const User = require("./../model/userModel");

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    numberPhone: req.body.numberPhone,
    address: req.body.address
  });

  res.status(201).json({
    status: "sucess",
    data: {
      newUser,
    },
  });
};

exports.login = async (req, res, next) => {
  //Cek apakah field password dan email terisi
  if (!req.body.email && !req.body.password) {
    return next(createError(400, 'Tolong isi email dan password nya!', { isOperationalError: true }));
  }

  //Cek apakah kombinasi email dan passwordnya benar ada di database
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user || !(await user.correctPassword(req.body.password, user.password))) {
    return next(createError(401, 'Email atau password salah!', { isOperationalError: true }));
  }

  res.status(200).json({
    status: "success",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email
    },
  });
};
