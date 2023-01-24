const UserModel = require("../models/UserModel");
const response = require("../lib/responseMessage");

exports.getUserByUserId = async (userId) => {
  try {
    const data = await UserModel.findOne({userId:userId})
    return Promise.resolve(response.success("Get User By Userid", data));
  } catch (error) {
    return Promise.reject(response.error(error));
  }
};

exports.getUserById = async (id) => {
  try {
    const data = await UserModel.find().findOne({_id:id})
    return Promise.resolve(response.success("Get User By id", data));
  } catch (error) {
    return Promise.reject(response.error(error));
  }
};
 
exports.createUser = async (formData) => {
  try {
    await UserModel.insertMany(formData);
    const data = await UserModel.findOne({userId:formData})
    return Promise.resolve(response.success("Create User Success.",data));
  } catch (error) {
    return Promise.reject(response.error(error));
  }
};
