const express = require("express");
const ConnectDB = require("./model/conn");
const userModel = require("./model/schema");
const app = express();
const port = process.env.PORT || 5000;
const url = "mongodb://localhost:27017/UserComments";
ConnectDB(url);

app.use(express.json())
app.use(express.static("public"))

app.post("/api/comments",(req,res)=>{
    const comment = new userModel({
        username:req.body.username,
        comment:req.body.comment
    })
    comment.save().then(response =>{
        res.send(response)
    })
});


app.get("/api/comments",(req,res)=>{
    userModel.find().then(comment=>{
        res.send(comment)
    });
});

const server =  app.listen(port ,()=>{
    console.log(`http://localhost:${port}`);
});

let io = require("socket.io")(server);

io.on("connection",(socket)=>{
    socket.on('comment',(data)=>{
        console.log(data);
        data.time = Date();
        socket.broadcast.emit('comment', data);
    });
});
