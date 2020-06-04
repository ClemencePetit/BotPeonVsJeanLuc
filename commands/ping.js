module.exports = {
	name: 'ping',
	description: 'Ping !',
	execute(message, arguments){
		message.channel.send("pong AHAH");
	},
};