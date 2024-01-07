const { Client, GatewayIntentBits, Partials, REST, Routes, ActivityType, MessageActionRow, MessageButton, Collection } = require('discord.js');
const { token, botID } = require('./settings.json');
const ytdl = require('ytdl-core');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, // Sunucu verilerini çekmek içindir
    GatewayIntentBits.GuildBans, // Sunucu Ban verilerini çekmek içindir
    GatewayIntentBits.GuildEmojisAndStickers, // Sunucu Emoji ve Sticker verisini çekmek içindir
    GatewayIntentBits.GuildIntegrations, // Sunucu Entagrasyon verisini çekmek içindir 
    GatewayIntentBits.GuildInvites, // Sunucu Davet verisini çekmek içindir
    GatewayIntentBits.GuildMembers, // Sunucu Üye verisini çekmek içindir
    GatewayIntentBits.GuildMessageReactions, // Sunucu Mesaj Tepki verisini çekmek içindir
    GatewayIntentBits.GuildMessageTyping, // Sunucu Mesaj Yazma verisini çekmek içindir
    GatewayIntentBits.GuildMessages, // Sunucu Mesaj verilerini çekmek içindir
    GatewayIntentBits.GuildPresences, // Sunucu Durum verisini çekmek içindir
    GatewayIntentBits.GuildScheduledEvents, // Sunucu Etkinlikler verisini çekmek içindir
    GatewayIntentBits.GuildVoiceStates, // Sunucu Ses verilerini çekmek içindir
    GatewayIntentBits.GuildWebhooks, // Sunucu webhook verilerini çekmek içindir
    GatewayIntentBits.DirectMessages, // DM Mesaj verilerini çekmek içindir
    GatewayIntentBits.DirectMessageTyping, // DM Mesaj Yazma verisini çekmek içindir
    GatewayIntentBits.DirectMessageReactions, // DM Mesaj Tepki verisini çekmek içindir
    GatewayIntentBits.MessageContent, // Mesaj verisini çekmek içindir
],
  partials: [
    Partials.User, // Üye verisini çekmek içindir
    Partials.Message, // Mesaj verisini çekmek içindir
    Partials.GuildMember, // Sunucu üye verisini çekmek içindir
    Partials.ThreadMember, // Altbaşlık verisini çekmek içindir 
],
});

client.events = new Collection();

const { loadEvents } = require('./Handlers/eventHandler.js');
loadEvents(client);

client.login(token).then(() => {
});

const rest = new REST({ version: '10' }).setToken(token);

client.once('ready', () => {
  console.log('Anna is online');

  (async () => {
    try {
      console.log('Started refreshing application (/) commands.');
  
      await rest.put(
        Routes.applicationGuildCommands(botID, '732194717797711954'), //server id
        { body: commands },
      );
  
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();
});

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'count',
    description: 'Replies with Server Member Count!',
  }
];

//Command Handler
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
  
  if(interaction.commandName === 'count') {
    await interaction.reply(`Server Member Count: ${interaction.guild.memberCount}`);
  }
});

//Messages & Replies
client.on('messageCreate', (message) => {
  //console.log(`Received message: ${message.content}`);
  if(message.content.toLowerCase() === 'hi' || message.content.toLowerCase() === 'hello' || message.content.toLowerCase() === 'hey') {
    message.reply('Heyyy!');
  }
  if(message.content.toLowerCase() === 'lol') {
    message.react('💀');
  }
});