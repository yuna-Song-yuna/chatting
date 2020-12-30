var express = require('express');
var ejs = require('ejs')
var socketio = require('socket.io')(app);
var cors = require('cors');     //클라이언트에서 ajax로 요청하면 CORS지원
var app = express();

app.use(cors())
//app.engine('html', require('ejs'.renderFile))
app.use(express.static(__dirname))
app.set('view engine', 'ejs')
//app.set('views','./views')

var router = require('./router')(app);

var server = app.listen(2000, console.log('start server'));

//socket.io 서버 시작
var io = socketio.listen(server);
console.log('socket.io 준비 완료')

//클라이언트가 연결했을 때 이벤트 처리
io.sockets.on('connection', function(socket){
    console.log('connection info:', socket.request.connection._peername);

    //소켓 객체에 클라이언트 Host, Port 정보 속성으로 추가
    socket.remoteAddress = socket.request.connection._peername.address;
    socket.remotePort = socket.request.connection._peername.port;
    console.log('socket info:', socket)

    //message 이벤트를 받았을 때 처리
    socket.on('message', function(message){
        console.log('message 이벤트를 받았습니다.');
        console.dir(message);

        if(message.recepient == 'ALL'){
            console.dir('나를 포함한 모든 클라이언트에게 message 이벤트를 전송')
            io.sockets.emit('message', message);
        }
    })
})