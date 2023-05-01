const net = require('net');
const readline = require('readline');
const USER_OPERATIONS = require('../types/operations');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Socket = net.connect({ port: 8080, host: '127.0.0.1' }, () => {
  console.log('Connected to server!');

  // Prompt the user to enter their name
  rl.question('Enter your name: ', (name) => {
    // Send the name to the server
    Join_signal(name);

    // Listen for input from the user and send it to the server
    rl.on('line', (input) => {
      Message_signal(name, input);
    });
  });
});

function Message_signal(name,message) {
  const obj = {
    operation: USER_OPERATIONS.user_message,
    name: name,
    msg: message
  }
  const buf = Buffer.from(JSON.stringify(obj));
  Socket.write(buf);
}

function Join_signal(name) {
  const obj = {
    operation: USER_OPERATIONS.user_join,
    name: name
  }
  const buf = Buffer.from(JSON.stringify(obj));
  Socket.write(buf);
}

function Left_signal(name) {

}

Socket.on('data', (data) => {
  console.log(data.toString());
});

Socket.on('end', () => {
  console.log('Disconnected from server');
  rl.close();
});

Socket.on('error', (err) => {
  console.error('Socket error:', err);
  rl.close();
});

Socket.on("timeout", () => {
    console.log("Connection timeout")
})

Socket.on('close', () => {
  console.log('Connection to server closed');
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  rl.close();
  process.exit(1);
});
