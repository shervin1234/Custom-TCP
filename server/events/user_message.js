const SendMessageToAll = require('../util/SendMessageToAll');

module.exports = function (Clients,Client,username,message) {
    SendMessageToAll(
        Client,
        Clients.filter((client) => client != Client),
        `[${username}]: ${message}`
    )
}