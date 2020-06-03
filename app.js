const Discord = require('discord.js');
const client = new Discord.Client();


//Toutes les actions à faire quand le bot se connecte
client.on("ready", function () {
    console.log("Mon BOT est Connecté");
})

client.login("NzE3ODUwNTk2OTQ1NjkwNjc2.XtgUkA.7HcoB1jD3zVIX238i14vw6AeO6s");