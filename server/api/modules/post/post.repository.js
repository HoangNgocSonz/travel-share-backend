const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    date:Date,
    userName:String,
    userId:String,
    cap:String,
    comments:[{
        userIdComment:String,
        message:String
    }],
    images:[{
        type:String,
    }],

});

const PostModel = mongoose.model('Post',PostSchema);

const find = async function (query) {
    return await PostModel.find(query);
  }
  
const count = async function (query) {
    return await PostModel.count(query);
}

const findById = async function(id){
    return await PostModel.findById(id);
}

const create = async function(data){
    const a = new PostModel(data);
    return await a.save();
}

const update = async function(id,data){
    if(data.chapters){
        return await PostModel.findByIdAndUpdate(id,{$addToSet:data},{new:true});
        // return await PostModel.findByIdAndUpdate(id,{$set:data},{new:true});
    }else if(!data.chapters){
        return await PostModel.findByIdAndUpdate(id,{$set:data},{new:true});
    }
    else{
        throw new Error("chỉ dùng để thêm chap mới, err tại post.repo");
    }
    
}
const  deleteOne = async function(id){
    return await PostModel.findByIdAndDelete(id);
}

module.exports = {
    find:find,
    findById:findById,
    create:create,
    update:update,
    delete:deleteOne,
    count: count,
}