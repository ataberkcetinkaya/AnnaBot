const { loadFiles } = require("../Functions/fileLoader.js");

async function loadEvents(client) {
    client.events = new Map();
    const events = new Array();

    const files = await loadFiles("Events");
    for(const file of files) {
        try {
            const event = require(file);
            const execute = (...args) => event.execute(...args, client);
            const target = event.rest ? client.rest : client;

            target[event.once ? "once" : "on"](event.name, execute);
            client.events.set(event.name, execute);
            
            events.push({ Event: event.name, Status: 'OK'});
        } catch (err) {
            console.error(err);
            events.push({ Event: file.split("\\").pop(), Status: 'ERROR'});
        }
}
    console.table(events);
    console.info('Events Loaded.');
}

module.exports = { loadEvents };