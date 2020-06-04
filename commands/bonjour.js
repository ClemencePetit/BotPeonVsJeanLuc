module.exports = {
	name: 'bonjour',
	description: 'Dire Bonjour',
	execute(DemiurgeBot, message, arguments){
		message.channel.send("Bonjour "+message.author.username);
	},
};