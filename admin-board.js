const http = require("http");
const express = require('express');
const {adduser , removeUser  } = require("./user");
const url = require('url');
const querystring = require('querystring');



const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });


app.get('/manage' , (req , res) => {

    // res.send('id: ' + req.query.id);
    console.log('id: ' + req.query.id)
})

io.on("connection" , (socket) => {
 

     
    socket.on("disconnect", () => {
      
      const user = removeUser(socket.id);
      
        if(user){
        io.to(user.room).emit("message", {
         
          user: "Admin",
          text: `${user.name} ออกจากห้องแชทแล้ว`,
        });
  
      }
        console.log("A disconnection has been made");
 
  

   

    });


})

