module.exports = {
	name: 'salut',
	description: 'Saluer quelqu\'un d\'autre.',
	execute(message, arguments){
		if(message.mentions.users.size){
			const taggedUser = message.mentions.users.first();
			message.channel.send('Tu salues '+taggedUser.username);
			message.channel.send('Salut <@'+taggedUser.id+'> !');
			taggedUser.send('Petit coucou en privé !');
		}
		else{
			message.reply('Faut quelqu\'un à saluer !');
		}
	},
};