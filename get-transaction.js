const { RippleAPI } = require('ripple-lib');

const ID = 'C03CFBC5B1382708542E377195EA28A71F371DFB52B82E52B5584F417AB0E912';

const api = new RippleAPI({
  server: 'ws://127.0.0.1:6006'
});

run().catch(error => console.error(error.stack));

async function run() {
  await api.connect();
  const transaction = await api.getTransaction(ID);
  console.log('transaction', transaction);
}

