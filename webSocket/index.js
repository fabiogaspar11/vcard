const httpServer = require('http').createServer()
const io = require("socket.io")(httpServer, {
 allowEIO3: true,
 cors: {
 origin: "http://localhost:8081",
 methods: ["GET", "POST"],
 credentials: true
 }
})
httpServer.listen(8080, function () {
 console.log('listening on *:8080')
})
io.on('connection', function (socket) {
    console.log(`client ${socket.id} has connected`)

    socket.on('logged_in', function (username, type) {
        console.log(`Room User ${username} join`)
        socket.join(username)
        if (type) {
            socket.join('administrator')
        }
    })
    socket.on('logged_out', function (username) {
        console.log(`Room User ${username} leave`)
        socket.leave(username)
        socket.leave('administrator')
    })   
    
    socket.on('newTransaction', function (transaction, username) {
        io.to(username).emit('newTransaction', transaction, username)
    })
   })