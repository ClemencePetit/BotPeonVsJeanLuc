module.exports = {
	name: 'ping',
	description: 'Ping !',
	execute(DemiurgeBot, message, arguments){
		message.channel.send("pong");
	},
};