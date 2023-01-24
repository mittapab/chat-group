const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    roomId: { type: String },
    roomType: {
      type: String,
    },
    roomName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const RoomModel = mongoose.model("Room", schema);

module.exports = RoomModel;
