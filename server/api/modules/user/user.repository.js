const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    avatar:String,
    email:String,
    password:String,
    userName:String,
    postId:String
});

const UserModel = mongoose.model('User',UserSchema);

const find = async function (query) {
    return await UserModel.find(query);
  }
  
const count = async function (query) {
    return await UserModel.count(query);
}

const findById = async function(id){
    return await UserModel.findById(id);
}

const create = async function(data){
    const a = new UserModel(data);
    return await a.save();
}

const update = async function(id,data){
    if(data.chapters){
        return await UserModel.findByIdAndUpdate(id,{$addToSet:data},{new:true});
        // return await UserModel.findByIdAndUpdate(id,{$set:data},{new:true});
    }else if(!data.chapters){
        return await UserModel.findByIdAndUpdate(id,{$set:data},{new:true});
    }
    else{
        throw new Error("chỉ dùng để thêm chap mới, err tại user.repo");
    }
    
}
const  deleteOne = async function(id){
    return await UserModel.findByIdAndDelete(id);
}

module.exports = {
    find:find,
    findById:findById,
    create:create,
    update:update,
    delete:deleteOne,
    count: count,
}