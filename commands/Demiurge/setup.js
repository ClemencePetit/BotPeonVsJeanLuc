const MessageEmbed = require('discord.js').MessageEmbed;
const fs = require('fs');

// Prepare les channels avec les infos nécessaires
module.exports = {
    name: 'setup',
    description: 'Envoie les messages d\'aide dans chaque channel joueur + les pin (+ rappelle qui est qui)',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        if (!PVSJL || !PVSJL.running) 
        {
            let channelJL = DemiurgeBot.channels.cache.find(ch => ch.name === 'jean-luc');
            let channelP = DemiurgeBot.channels.cache.find(ch => ch.name === 'peon');
			let helpMsgJL = new MessageEmbed()
            .setColor([210,210,210])
            .setImage(DemiurgeBot.user.avatarURL())
            .setTitle("Guide pour jouer en tant que Humain-Jean-Luc");
			let helpMsgP = new MessageEmbed()
            .setColor([210,210,210])
            .setImage(DemiurgeBot.user.avatarURL())
            .setTitle("Guide pour jouer en tant que Humain-Peon");
			
			for (const file of fs.readdirSync('./commands')) {
				console.log(file);
				if(file.endsWith('.js')){
					console.log('../../'+file);
					let path="../"+file;
					const command = require(path);
					//console.log('./'+file);
					helpMsgJL.addField(command.name, command.description);
					helpMsgP.addField(command.name, command.description);
				} else if (fs.statSync('./commands/'+file).isDirectory() && file==="Humain")
				{
					for (const sfile of fs.readdirSync('./commands/'+file)) {
						console.log(file);
						if(sfile.endsWith('.js')){
							console.log('./'+file);
							const command = require(`../${file}/${sfile}`);
							helpMsgJL.addField(command.name, command.description)
							helpMsgP.addField(command.name, command.description);
						}

					}
				}

			}
			channelJL.send(helpMsgJL).then(sent => { // 'sent' is that message you just sent
							sent.pin();
							});
			channelP.send(helpMsgP).then(sent => { // 'sent' is that message you just sent
							sent.pin();
							});
							
			let channelDJL = DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-jean-luc');
            let channelDP = DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-peon');
			let helpMsgDJL = new MessageEmbed()
            .setColor([210,210,210])
            .setImage(DemiurgeBot.user.avatarURL())
            .setTitle("Guide pour jouer en tant que Dieu-Jean-Luc");
			let helpMsgDP = new MessageEmbed()
            .setColor([210,210,210])
            .setImage(DemiurgeBot.user.avatarURL())
            .setTitle("Guide pour jouer en tant que Dieu-Peon");
			
			for (const file of fs.readdirSync('./commands')) {
				console.log(file);
				if(file.endsWith('.js')){
					console.log('../../'+file);
					let path="../"+file;
					const command = require(path);
					//console.log('./'+file);
					helpMsgDJL.addField(command.name, command.description);
					helpMsgDP.addField(command.name, command.description);
				} else if (fs.statSync('./commands/'+file).isDirectory() && file==="Dieu")
				{
					for (const sfile of fs.readdirSync('./commands/'+file)) {
						console.log(file);
						if(sfile.endsWith('.js')){
							console.log('./'+file);
							const command = require(`../${file}/${sfile}`);
							helpMsgDJL.addField(command.name, command.description)
							helpMsgDP.addField(command.name, command.description);
						}

					}
				}

			}
			channelDJL.send(helpMsgDJL).then(sent => { // 'sent' is that message you just sent
							sent.pin();
							});
			channelDP.send(helpMsgDP).then(sent => { // 'sent' is that message you just sent
							sent.pin();
							});
							
							
			
			/*let channels = [];
            channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'jean-luc'));
            channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-jean-luc'));
            channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'peon'));
            channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-peon'));

            channels.forEach( channel => 
            {
                channel.clone();
                channel.delete();
			})*/
        } 
        else 
        {
            message.channel.send("Une partie est en cours, vous ne pouvez pas setup une partie.");
        }

    },
};