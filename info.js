const { RippleAPI } = require('ripple-lib');

const RIPPLE_A_ADDRESS = 'rnXevhMvyewef7CdkaDXJ5erqfKQwJYtDv';
const RIPPLE_B_ADDRESS = 'rsZRJ9aJc2HSrkVqz2EFSp8aszEfHKFfGJ';

const api = new RippleAPI({
  server: 'ws://127.0.0.1:6006'
});

run().catch(error => console.error(error.stack));

async function run() {
  await api.connect();
  const a = await api.getAccountInfo(RIPPLE_A_ADDRESS);
  console.log('Wallet A', a);

  const b = await api.getAccountInfo(RIPPLE_B_ADDRESS);
  console.log('Wallet B', b);
  process.exit(0);
}

