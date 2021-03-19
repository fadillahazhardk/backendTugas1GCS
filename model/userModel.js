const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your email"],
    lowercase: true, //ini bukan validator, hanya membuat data yang masuk menjadi lowercase
    validate: [validator.isEmail, "Please provide a valid email"], //custom validation
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlenght: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm password"],
    validate: {
      //VALIDATE HANYA BISA BEKERJA PADA SAVE() ATAU CREATE()
      validator: function (val) {
        return val === this.password;
      },
      message: "Password are not the same",
    },
  },
});

//Encrypt Password
// Password Management Security
userSchema.pre('save', async function (next) {
  //Check if the password is changed or not (to reduce unnessecary hashing password)
  if (!this.isModified('password')) return next()

  //Hashing the password
  this.password = await bcrypt.hash(this.password, 12)

  //delete passwordConfirm field
  this.passwordConfirm = undefined

  next()
})

//Check incoming password
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model("User", userSchema);

module.exports = User;
