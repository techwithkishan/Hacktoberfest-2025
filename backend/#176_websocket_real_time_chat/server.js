const express=require('express')
const http=require('http')
const {Server}=require('socket.io')
const handleSocket = require('./socket');


const PORT=8000
const app = express()
const server = http.createServer(app)

server.listen(PORT,()=>{
    console.log(`🚀 Server is running at http://localhost:${PORT}`);    
})

const io = new Server(server, {
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
}) 


handleSocket(io); // Wire up socket events