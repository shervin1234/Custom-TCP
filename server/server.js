const Network = require('net');
const start = new Date();
const fs = require('fs');
const USER_OPERATIONS = require('../types/operations');

const Clients = [];
const OPERATIONS = {};
const CWD = process.cwd()

console.log("Starting Registering Events ...")
Object.keys(USER_OPERATIONS).forEach((OPERATION) => {
  const PATH = `${CWD}\\events\\${OPERATION}.js`;
  if (fs.existsSync(PATH)) {
    OPERATIONS[OPERATION] = require(PATH);
    console.log(`Event [${OPERATION}] Registered`);
  }
})

console.log(`Count of registered events = ${Object.keys(OPERATIONS).length}`);

const Server = Network.createServer((Client) => {
  console.log('EVENT :: Client connected');
  Clients.push(Client);

  Client.on('data', (data) => {

    const OBJ = JSON.parse(data.toString());

    const Operation = OBJ.operation;

    // Wrong data type
    if (!Object.keys(OPERATIONS).includes(Operation)) 
      return console.warn(`[Warning] :: ${Operation} is not supported !`);

    // Which operation will be called
    const Callback = OPERATIONS[Operation];

    // Switch to current arguments for callback
    switch (Operation) {
      case USER_OPERATIONS.user_join:
        Callback(
          Clients,
          Client,
          OBJ.name
        );
        break

      case USER_OPERATIONS.user_left:
        Callback(
          Clients,
          Client,
          OBJ.name
        );
        break;

      case USER_OPERATIONS.user_timeout:
        break;

      case USER_OPERATIONS.user_message:
        Callback(
          Clients,
          Client,
          OBJ.name,
          OBJ.msg
        )
        break;
    }
  });

  Client.on('error', (err) => {
    console.error(`An error occurred !`)
    console.error(err);
  });

  Client.on('end', () => {
    console.log('Client disconnected');
    const index = Clients.indexOf(Client);
    if (index !== -1) {
      Clients.splice(index, 1);
    }
  });
});

Server.listen(8080, () => {
  let HERA = `
    
        ╔══════════════════════════════════════════════════════════════════════════════════════════════════════╗
        ║         ___       ___      _____________      _____________      _____________                       ║
        ║        /  /      /  /     /  _________ /     /   ______   /     /   ______   /                       ║
        ║       /  /______/  /     /  /_________      /  /______/  /     /  /______/  /                        ║
        ║      /  ______    /     /  _________ /     /   ___   ___/     /   ______   /                         ║
        ║     /  /      /  /     /  /_________      /  /   /__/__      /  /      /  /                          ║
        ║    /__/      /__/     /____________/     /__/      /__/     /__/      /__/                           ║
        ║                                                                               Power By HERA team     ║
        ╚══════════════════════════════════════════════════════════════════════════════════════════════════════╝

        `
  console.log(HERA)
  console.log('Server started on port 8080');
  const end = new Date();
  const elapsedMs = end - start;

  console.log(`Elapsed time: ${elapsedMs} ms`);
});


