module.exports = function (Socket,Clients,DATA) {
    Clients.forEach((client) => {
        if (client !== Socket && !client.destroyed) {
            try {
                client.write(DATA);
            } catch (err) {
                console.error('Socket error:', err);
            }
        }
    });
}