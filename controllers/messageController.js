const MessageModel = require("../models/MessageModel");
const response = require("../lib/responseMessage");

exports.readMessageByRoomId = async (roomId) => {
  try {
    const room = await MessageModel.find().sort({_id:-1});
    return Promise.resolve(response.success("Get Room", room));
  } catch (error) {
    return Promise.reject(response.error(error));
  }
};
 
exports.createMessag = async (formData) => {
  try {
    await MessageModel.insertMany(formData);
    return Promise.resolve(response.success("Create Room Success.", []));
  } catch (error) {
    return Promise.reject(response.error(error));
  }
};
