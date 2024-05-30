const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/organizers/model');
const {
  BadRequestError
} = require('../../error');
const {
  StatusCodes
} = require('http-status-codes');
const BadRequest = require('../../error/bad-request');

const createOrganizer = async (req) => {
  const {
    organizer,
    email,
    role,
    password,
    confirmPassword,
    name
  } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan confirmation password tidak cocok');
  }

  const check = await Organizers.findOne({
    organizer
  });

  if (check) throw new BadRequest('Organizer already exists');

  const result = await Organizers.create({
    organizer
  });

  const users = await Users.create({
    email,
    name,
    password,
    role,
    organizer: result._id
  });

  delete users._doc.password;

  return users;
};

const createUsers = async (req, res) => {
  const {
    name,
    password,
    role,
    confirmPassword,
    email
  } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan confirmation password tidak cocok');
  }

  const check = await Users.findOne({
    email
  });

  if (check) throw new BadRequest('User already exists');

  const result = await Users.create({
    name,
    password,
    role,
    email,
    organizer: req.user.organizer,
  });

  return result;
}

const getAllUsers = async (req) => {
  const result = await Users.find();

  return result;
}

module.exports = {
  createOrganizer,
  createUsers,
  getAllUsers
};