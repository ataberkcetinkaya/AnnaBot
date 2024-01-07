const { ActivityType } = require('discord.js');

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.info(`Logged in as ${client.user.username}!`);
        client.user.setStatus('online');
        client.user.setActivity({ name: 'Eminem', type: ActivityType.Listening });
    }
}