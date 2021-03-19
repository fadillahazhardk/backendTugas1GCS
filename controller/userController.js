const User = require("./../model/userModel");
const catchAsync = require("../utils/catchAsync");

exports.findAllUser = catchAsync(async (req, res, next) => {
  const doc = await User.find();

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.findUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.deleteOne({ _id: req.params.id });

  res.status(204).json({
    status: "success deleted",
    data: null,
  });
});

exports.checkIdentifier = catchAsync(async (req, res, next) => {
  let type = req.query.type;
  let user;

  if (type === "email") {
    user = await User.find({ email: req.body.email });
  } else if (type === "username") {
    user = await User.find({ username: req.body.username });
  }

  res.status(200).json({
    status: "success",
    message: `${type} is available.`,
  });
});
