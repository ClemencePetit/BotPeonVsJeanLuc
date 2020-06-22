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
				
			//const attachment = new Discord.Attachment('../../images/P.png', 'Peon.png');
				
			let detailsMsgP = new MessageEmbed()
			.attachFiles(['images/P.png'])
			.setImage('attachment://P.png')
			.setTitle("Tu es Péon")
			.setDescription("Ton objectif : récupérer les reliques de ton Dieu pour en vêtir sa statue et ainsi montrer la supériorité de ta religion avec l\'aide de ce dernier. Repère-toi bien sur le terrain avant de commencer !");
			
			channelP.send(detailsMsgP).then(sent => { // 'sent' is that message you just sent
							sent.pin();
							});	
			let detailsMsgJL = new MessageEmbed()
			.attachFiles(['images/JL.png'])
			.setImage('attachment://JL.png')
			.setTitle("Tu es Jean-Luc")
			.setDescription("Ton objectif : récupérer les reliques de ton Dieu pour en vêtir sa statue et ainsi montrer la supériorité de ta religion avec l\'aide de ce dernier. Repère-toi bien sur le terrain avant de commencer !");
			
			channelJL.send(detailsMsgJL).then(sent => { // 'sent' is that message you just sent
							sent.pin();
							});	
			let detailsMsgDP = new MessageEmbed()
			.attachFiles(['images/P.png'])
			.setImage('attachment://P.png')
			.setTitle("Tu es Dieu Péon")
			.setDescription("Ton objectif : aider ton humain, Péon, à récupérer tes reliques afin d\'en vêtir ta statue et ainsi montrer la supériorité de ta religion. Repère bien ton humain sur le terrain avant de commencer !");
			
			channelDP.send(detailsMsgDP).then(sent => { // 'sent' is that message you just sent
							sent.pin();
							});	
			let detailsMsgDJL = new MessageEmbed()
			.attachFiles(['images/JL.png'])
			.setImage('attachment://JL.png')
			.setTitle("Tu es Dieu Jean-Luc")
			.setDescription("Ton objectif : aider ton humain, Jean-Luc, à récupérer tes reliques afin d\'en vêtir ta statue et ainsi montrer la supériorité de ta religion. Repère bien ton humain sur le terrain avant de commencer !");
			
			channelDJL.send(detailsMsgDJL).then(sent => { // 'sent' is that message you just sent
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