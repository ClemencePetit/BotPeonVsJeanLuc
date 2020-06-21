// Game entry point
module.exports = {
    name: 'clean',
    description: 'Clean the messages from the different channels',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        if (!PVSJL || !PVSJL.running) 
        {
            let channels = [];
            channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'jean-luc'));
            channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-jean-luc'));
            channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'peon'));
            channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-peon'));

            channels.forEach( channel => 
            {
                channel.clone();
                channel.delete();
			})
        } 
        else 
        {
            message.channel.send("Une partie est en cours, vous ne pouvez pas supprimer les messages.");
        }

    },
};
