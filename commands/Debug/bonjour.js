//Welcome someone in public
module.exports = {
	name: 'bonjour',
	description: 'Dire Bonjour',
	execute(DemiurgeBot, message, arguments){
		message.channel.send("Bien le bonjour "+message.author.username);
	},
};