const {addUser,removeUserBySocket,getSocketId} = require('./users')

const handleSocket = (io) =>{
    try {

        io.on("connection",(socket)=>{
            console.log('New connection:', socket.id);


            // Register user
            socket.on('register' , (userName)=>{
                socket.userName = userName;
                addUser(userName,socket.id)
                console.log(`Registered: ${userName}`);
            })

            socket.on('join-room', (room) => {
                if (!socket.userName) return; // user not registered
                socket.join(room);
                socket.emit('joined-room', room);
                console.log(`${socket.userName} joined room: ${room}`);
            });


            // Send message to room
            socket.on('room-message', ({ room, message }) => {
                socket.to(room).emit('room-message', {
                    user: socket.userName,
                    message,
                });
            });

            // Private chat (1:1)
            socket.on('private-message', ({ to, message }) => {
                const targetSocketId = getSocketId(to);
                if (targetSocketId) {
                    io.to(targetSocketId).emit('private-message', {
                    from: socket.userName,
                    message,
                    });
                }
            });


            socket.on('disconnect', () => {
                console.log(`Disconnected: ${socket.userName}`);
                removeUserBySocket(socket.id);
            });

        })
        
    } catch (error) {
        console.log(error);        
    }
}


module.exports = handleSocket;