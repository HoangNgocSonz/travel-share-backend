const repository = require("./post.repository");
const userRepo = require("../user/user.repository");

const PostModel = require("./post.model");
const UserModel = require("../user/user.model");

const find = async function (query) {
  return await repository.find(query);
};

const findById = async function (id) {
  return await repository.findById(id);
};

const create = async function (data) {
  const createdPost = new PostModel(data);
  const user = await UserModel.findById(createdPost.author);
  if (!user) throw new Error("Provided author id not found");

  const session = await PostModel.db.startSession();
  session.startTransaction();

  const returnData = await createdPost.save({ session });
  user.posts.push(createdPost._id);
  await user.save({ session });
  await session.commitTransaction();

  return returnData;
  // return await repository.create(data);
};

const update = async function (id, data) {
  const existed = await repository.findById(id);
  if (!existed) {
    throw new Error("entity not found");
  }
  // if post author change then remove its _id in author's posts array
  if (data.author) {
    const post = await PostModel.findById(id).populate("author");
    const newAuthor = await userRepo.findById(data.author);
    if (!newAuthor) {
      throw new Error("new author not found");
    }
    // remove old _id in current author's posts
    post.author.posts.pull(post);
    await post.author.save();
    // add id to author's post list
    newAuthor.posts.push(id);
    await newAuthor.save();
    // return post;
  }
  // return { msg: "complete" };
  return await repository.update(id, data);
};

const deleteOne = async function (id) {
  const post = await PostModel.findById(id).populate("author");
  if (!post) {
    throw new Error("Cannot find post id");
  }

  const session = await PostModel.db.startSession();
  session.startTransaction();

  // await post.remove({ session });
  const returnData = await repository.delete(id, { session });
  post.author.posts.pull(post);
  await post.author.save({ session });

  await session.commitTransaction();

  // return post;
  // const existed = await repository.findById(id);
  // if (!existed) {
  //   throw new Error("entity not found");
  // }
  return returnData;
};
module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  delete: deleteOne,
};
