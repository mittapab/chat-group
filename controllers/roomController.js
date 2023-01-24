const RoomModel = require("../models/RoomModel");
const response = require("../lib/responseMessage");

exports.find = async () => {
  try {
    const room = await RoomModel.find();
    return Promise.resolve(response.success("Get Room", room));
  } catch (error) {
    return Promise.reject(response.error(error));
  }
};

exports.findById = async (roomId) => {
  try {
    const room = await RoomModel.findOne({ roomId: roomId });
    return Promise.resolve(response.success("Get Room By id", room));
  } catch (error) {
    return Promise.reject(response.error(error));
  }
};


exports.create = async (formData) => {
  try {
    await RoomModel.insertMany(formData);
    return Promise.resolve(response.success("Create Room Success.", []));
  } catch (error) {
    return Promise.reject(response.error(error));
  }
};
