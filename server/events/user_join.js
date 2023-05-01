const Server_Message = require('../../messages/server');
const SendMessageToAll = require('../util/SendMessageToAll');

module.exports = function (Clients, socket, username) {
    SendMessageToAll(
        socket,
        Clients,
        `[SERVER]: ${username} ${Server_Message.user_join}`
    )
}