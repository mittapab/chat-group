const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { adduser, removeUser } = require("./user");
const { connectDatabase } = require("./connect");
const { create,find,findById } = require("./controllers/roomController");

const { getUserByUserId,createUser } = require("./controllers/userController");

const { createMessag,readMessageByRoomId } = require("./controllers/messageController");
const responseMessage = require("./lib/responseMessage");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONT_PATH,
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

//connection
connectDatabase();

io.on("connection", (socket) => {
 /*
  socket.on("join2", ({ name, room }, callBack) => {
    const { id, user, error } = adduser({ id: socket.id, name, room });
    if (error) return callBack(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "ห้องสนทนา",
      text: `ยินดีต้อนรับสู่ห้องสนทนา ${user.room}`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "แจ้งเตือน",
      text: `${user.name} เข้าร่วมห้องสนทนา!`,
    });

    callBack(null);
    socket.on("sendMessage", ({ message }) => {
      io.to(user.room).emit("message", {
        id: user.id,
        user: user.name,
        text: message,
      });
    });

    socket.on("kickUser", ({ id }) => {
      socket.to(id).emit("kick helper");
    });

    socket.on("kick helper", () => {
      socket.disconnect();
    });
  });



  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log(user);

    //   if(user){
    //   io.to(user.room).emit("message", {

    //     user: "Admin",
    //     text: `${user.name} ออกจากห้องแชทแล้ว`,
    //   });

    // }
    console.log("A disconnection has been made");
  });
*/

 
  //join room
  socket.on("joinRoom",async({roomId, userDetail})=>{
      console.log("room id = ",roomId)
      console.log("name = ",userDetail.c_name);

      //check user Active or Block or Kick
      let user = await getUserByUserId(userDetail.id);
       
      if(!user.data){
        console.log('Not Found User');
        const userData = {
          userid:userDetail.id,
          name:userDetail.c_name,
          status:'Active',
          image:userDetail.c_id_img
        }
        user = await createUser(userData);

      } 
      //user _id
      const room = await findById(roomId);
      if(room.status == 'ok' && room.data){
        io.emit('joinRoom-Success', roomId); 
      }else{
        //not found room 
      }

  });
  //send message
  socket.on("sendMessage",async({roomId, message,userId})=>{
    try{
      console.log("room id = ",roomId)
      console.log("message = ",message)
      
      console.log(message)

      const messageData = {
        roomId:roomId,
        message:message,
        userid:userId,
        image:'',
        imageType:''
      }
      const response = await createMessag(messageData);
      console.log(response)
      if(response.status == 'ok'){
        io.emit('sendMessage-Success', roomId);
      }
    }catch(error){
      console.log(error)
    }
});
//read message by room id
socket.on("readMessageByRoomId",async({roomId})=>{
  console.log("room id = ",roomId) 
  const message = await readMessageByRoomId(roomId);
  if(message.status == 'ok' && message.data){ 
    console.log(message.data) 
    io.emit('readMessageByRoomId-Success',message.data); 
  }else{ 
    io.emit('readMessageByRoomId-Success',[]); 
  }

});



});

app.get("/", async (req, res) => {
  try {
    const result = await findById("123");
    const formData = {
      roomId:"Live123",
      roomType: "1",
      roomName: "Live",
    };
    const response = await create(formData);
    return res.json(result);
  } catch (error) {
    console.log(error)
    return res.json(responseMessage.error("Error", error));
  }
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Start port running is : ${PORT}`);
});

/**
 *
 * block user  Active,Block,Kick
 * chat type
 * chat  message,emoji,gif
 * pined message
 * room (create-room , delete-room)
 * friend,unfriend
 * tranfer credit, dimone
 *
 *
 *
 */
