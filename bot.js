const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content === "!ping") {
    message.channel.send("pong");
  }
  if (message.content === "!bonjour"){
	message.reply("Bonjour "+message.author.username);
  }
  if (message.content.startsWith('!salut')){
	 if(message.mentions.users.size){
	  const taggedUser = message.mentions.users.first();
	  message.channel.send('Tu salues '+taggedUser.username);
	  message.channel.send('Salut <@'+taggedUser.id+'> !');
	 }
	 else{
		 message.reply('Faut quelqu\'un à saluer !');
	 }
	  
  }
  
});