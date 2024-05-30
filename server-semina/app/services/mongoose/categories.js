const Categories = require('../../api/v1/categories/model');
const {
  NotFoundError,
  BadRequestError
} = require('../../error');
const BadRequest = require('../../error/bad-request');

const getAllCategories = async (req) => {
  const result = await Categories.find({
    organizer: req.user.organizer
  });

  return result;
};

const createCategories = async (req) => {
  const {
    name
  } = req.body;

  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer
  });

  if (check) throw new BadRequest('Category already exists');

  const result = await Categories.create({
    name,
    organizer: req.user.organizer
  });

  return result;
};

const getOneCategories = async (req) => {
  const {
    id
  } = req.params;

  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer
  });

  if (!result) throw new NotFoundError('Categories not found');

  return result;
}

const updateCategories = async (req) => {
  const {
    id
  } = req.params;
  const {
    name
  } = req.body;

  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
    _id: {
      $ne: id
    },
  });

  if (check) throw new BadRequestError('Category already exists');

  const result = await Categories.findOneAndUpdate({
    _id: id
  }, {
    name
  }, {
    new: true,
    runValidators: true
  });

  if (!result) throw new NotFoundError(`Categories not found :  ${id}`);

  return result;
};

const deleteCategories = async (req) => {
  const {
    id
  } = req.params;

  const result = await Categories.findOneAndDelete({
    _id: id,
    organizer: req.user.organizer
  });

  if (!result) throw new NotFoundError(`Categories not found :  ${id}`); // NOT FOUND

  return result;
}

const checkingTalents = async (id) => {
  const result = await Talents.findOne({
    _id: id,
  });

  if (!result)
    throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({
    _id: id
  });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingTalents,
  checkingCategories
};