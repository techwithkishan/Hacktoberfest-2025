const users = new Map(); 


const addUser=(userName,socketId)=>{
    users.set(userName,socketId)
    console.log(users);    
}


const removeUserBySocket = (socketId) =>{
    for(let [userName,id] of users.entries())
    {
        if(id === socketId)
        {
            users.delete(userName);
            break;
        }
    }
}


const getSocketId = (userName) =>{
    return users.get(userName);
}


module.exports = {
    addUser, removeUserBySocket, getSocketId
}