// const mongoose = require("mongoose");
// mongoose.set("debug", true);

const UserModel = require("./user.model");

const find = async function (query) {
  return await UserModel.find(query);
};

const count = async function (query) {
  return await UserModel.count(query);
};

const findById = async function (id) {
  return await UserModel.findById(id);
};

const create = async function (data) {
  const a = new UserModel(data);
  return await a.save();
};

const update = async function (id, data) {
  return await UserModel.findOneAndUpdate(
    { _id: id },
    // { $addToSet: data },
    data,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );
};

const deleteOne = async function (id) {
  return await UserModel.findByIdAndDelete(id);
};

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  delete: deleteOne,
  count: count,
};
