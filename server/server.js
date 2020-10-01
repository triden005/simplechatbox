const express = require("express");

const path = require("path");
const app= express();

const server = require('http').createServer(app);

const options = { /* ... */ };


const io = require('socket.io')(server, options);
var users=[];

// app.use(express.static(path.join(__dirname,'build')));
// // console.log(users);

// app.get("/*",(req,res)=>{
//     res.sendFile(path.join(__dirname,"build",'index.html'));
// })

var arr=[];

io.on('connection', socket => {
    
    console.log("new user connected");
    // console.log(users.length);
    // users++;
    // io.emit("update",{users});
    socket.on("chat message",(msg)=>{
        io.emit("chat message",msg);
    })

    socket.on("login",(data)=>{
        users.push({...data,rank:null,score:0});
        io.emit("userslist",(users.map(user=>(user.name))));
        console.log(users);
    });

    socket.on("start",()=>{
        if(users.length>=4){
            io.emit("resetrank");
            const N = 4;
            arr=[];
            arr = Array.from({length: N}, (_, index) => index + 1);
            shuffleArray(arr);
    
            console.log(arr);
        }
    });

    socket.on("getrank",(usernamesecret)=>{
        console.log(usernamesecret);
        if(usernamesecret)
        for(var i=0;i<4;i++){
            if(users[i].name===usernamesecret.name && users[i].secret===usernamesecret.secret){
                if(users[i].rank===null){
                    users[i].rank=arr.pop();
                    // console.log(users);
                    console.log(`rank${users[i].name}${users[i].secret}`);
                    io.emit(`rank${users[i].name}${users[i].secret}`,users[i].rank);
                }
                else{
                    io.emit(`rank${users[i].name}${users[i].secret}`,users[i].rank);
                }
            }
            
        }
        console.log(users)
    })


    socket.on("decision",(data)=>{
        if(!arr.length)
        for(var i=0 ;i<4;i++){
            if(users[i].name==data.name && users[i].secret===data.secret  && users[i].rank===2){
                if(data.find<4 && users[data.find-1].rank===4){
                    users.map(user=>{
                        user.score+=(4-user.rank)*100;
                        user.rank=null;
                        return user;
                    })
                }
                else{
                    users.map(user=>{
                        if(user.rank===2){
                            user.rank=4;
                        }
                        else if(user.rank===4){
                            user.rank=2;
                        }
                        user.score+=(4-user.rank)*100;
                        user.rank=null;
                        return user;
                    });
    
                }
            }
    
        }
        console.log(users);
        io.emit("updatedscore",(users.map(user=>({name:user.name,score:user.score}))));
    });

    socket.on("disconnect",()=>{
        console.log("user disconnected");
        users=[];
        io.emit("userslist",(users));
        io.emit("reauthenticate");
        console.log(users);
        // io.emit("userslist",(users));
    });

});
    
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const port = process.env.PORT || 4001;

server.listen(port,()=>("backend server started at"+port));