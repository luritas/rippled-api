const { RippleAPI } = require('ripple-lib');

const api = new RippleAPI({
  server: 'ws://127.0.0.1:6006'
});

run().catch(error => console.error(error.stack));

async function run() {
  await api.connect();
  const address = api.generateAddress();
  console.log('address', address);
  process.exit(0);
}



