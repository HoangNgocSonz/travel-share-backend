const repository = require("./user.repository");

const find = async function (query) {
  return await repository.find(query);
};

const findById = async function (id) {
  return await repository.findById(id);
};

const create = async function (data) {
  return await repository.create(data);
};

const update = async function (id, data) {
  const existed = await repository.findById(id);
  if (!existed) {
    throw new Error("entity not found");
  }
  return await repository.update(id, data);
};

const deleteOne = async function (id) {
  const existed = await repository.findById(id);
  if (!existed) {
    throw new Error("entity not found");
  }
  return await repository.delete(id);
};

const updateFollow = async (id, { target, unfollow = false }) => {
  console.log(target, unfollow);
  const user = await repository.findById(id);
  if (!user) {
    throw new Error("entity not found");
  }
  if (target) {
    const targetUser = await repository.findById(target);
    if (!targetUser) {
      throw new Error("target follow user not found");
    }
    // decide to add follow or remove follow based on option unfollow
    if (unfollow) {
      user.follows.pull(targetUser._id);
      targetUser.followers.pull(id);
    } else {
      if (!user.follows.includes(targetUser._id)) {
        user.follows.push(targetUser._id);
      }
      if (!targetUser.followers.includes(id)) {
        targetUser.followers.push(id);
      }
    }
    await user.save();
    await targetUser.save();
  }
  return user;
};

module.exports = {
  find,
  findById,
  create,
  update,
  delete: deleteOne,
  updateFollow,
};
