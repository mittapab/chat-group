const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    roomId: { type: String },
    userid: {
      type: String,
    },
    message: {
      type: String,
    },
    image:{
        type:String
    }, imageType:{
      type:String
  }
  },
  {
    timestamps: true,
  }
);
const MessageModel = mongoose.model("Message", schema);

module.exports = MessageModel;
