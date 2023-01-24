const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userid: {
      type: String,
    },
    name: {
      type: String,
    },
    status:{
        type:String
    }, 
    image:{
      type:String
  }
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("User", schema);

module.exports = UserModel;
