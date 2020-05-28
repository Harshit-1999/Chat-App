const express= require('express');
const app=express();
const server=require('http').createServer(app);
const io=require('socket.io').listen(server);


users=[];
connections=[];


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

// app.listen(3000,(req,res)=>{

//     console.log("Server on ort 3000 is active!!");
// });

server.listen(process.env.port||3000,()=>{

    console.log("Server on port 3000 is active");
});
 io.sockets.on('connection',(socket)=>{
    connections.push(socket);
    console.log('connected : %s sockets connected',connections.length);
    
    // disconnection
    socket.on('disconnect',()=>{
        connections.splice(connections.indexOf(socket),1);
    console.log("Disconnected: %s sockets connected",connections.length);
 });

    //send message
    socket.on('send message',(data)=>{
        console.log(data);
     io.sockets.emit('new message',{msg:data});

    })
    });
    
