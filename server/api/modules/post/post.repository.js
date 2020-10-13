const mongoose = require("mongoose");
mongoose.set("debug", true);

const PostModel = require("./post.model");
const UserModel = require("../user/user.model");

const find = async function (query) {
  return await PostModel.find(query);
};

const count = async function (query) {
  return await PostModel.count(query);
};

const findById = async function (id) {
  return await PostModel.findById(id);
};

const create = async function (data) {
  const a = new PostModel(data);
  return await a.save();
};

const update = async function (id, data) {
  console.log(id, data);
  return await PostModel.findOneAndUpdate(
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

const deleteOne = async function (id, options) {
  return await PostModel.findByIdAndDelete(id, options);
};

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  delete: deleteOne,
  count: count,
};
