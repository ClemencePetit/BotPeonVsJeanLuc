module.exports = {
	name: 'bonjour',
	description: 'Dire Bonjour',
	execute(message, arguments){
		message.channel.send("Bonjour "+message.author.username);
	},
};