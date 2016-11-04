// 服务器端代码

let http = require('http');
let express = require('express');
let sio = require('socket.io');
let app = express();
let server = http.createServer(app);

app.get('/',(req,res) => {
	res.sendfile(__dirname + '/index.html');
});

server.listen(80);

let io = sio.listen(server);
let names = [];		// 存放所有登录聊天室的用户名

io.sockets.on('connection', (socket) => {
	socket.on('login', (name) => {				// login事件
		for(let i = 0;i < names.length; i++){
			if(names[i] == name){
				socket.emit('duplicate');		// 用户名被占用
				return;
			}
		}
		names.push(name);
		io.sockets.emit('login',name);			// 向所有客户端发送login事件，以便消息区域显示用户登录消息
		io.sockets.emit('sendClients',names);	// 向所有客户端发送sendClients事件，以便更新用户列表
	});
	socket.on('chat', (data) => {		// 服务器端接收到客户端发送的chat事件
		io.sockets.emit('chat',data);	// 向所有客户端发送chat事件
	});
	socket.on('logout',(name) => { 	// 服务器端接收到客户端发送的logout事件
		for(let i = 0 ;i < names.length; i++){
			if(names[i] == name){
				names.splice(i,1);
				break;
			}
		}
		socket.broadcast.emit('logout',name);	// 向所有客户端发送logout事件，以便消息区域显示用户退出消息
		io.sockets.emit('sendClients',names);	// 向所有客户端发送sendClients事件，以便更新用户列表
	});
});