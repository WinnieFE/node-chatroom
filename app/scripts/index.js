let userName,socket,tbxUsername,tbxMsg,divChat;

window.onload = function(){
	divChat = document.getElementById('chat-main');
	tbxUsername = document.getElementById('username');
	tbxMsg = document.getElementById('chat-message');
	tbxUsername.focus();
	tbxUsername.select();
}