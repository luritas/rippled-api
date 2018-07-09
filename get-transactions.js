'use stric';
const { RippleAPI } = require('ripple-lib');
let express = require('express');
let app = express();


const RIPPLE_K_ADDRESS = 'rBTjeJu1Rvnbq476Y7PDnvnXUeERV9CxEQ';
const RIPPLE_A_ADDRESS = 'rnXevhMvyewef7CdkaDXJ5erqfKQwJYtDv';
const RIPPLE_B_ADDRESS = 'rsZRJ9aJc2HSrkVqz2EFSp8aszEfHKFfGJ';

const api = new RippleAPI({
    //server: 'ws://127.0.0.1:6006'
    server: 'wss://s2.ripple.com'
});

//run().catch(error => console.error(error.stack));



async function run() {
    await api.connect();
    const serverInfo = await api.getServerInfo();
    const ledgers = serverInfo.completeLedgers.split('-');
    const minLedgerVersion = Number(ledgers[0]);
    const maxLedgerVersion = Number(ledgers[1]);

    const transactions = await api.getTransactions(RIPPLE_A_ADDRESS, {
    //const transactions = await api.getTransactions(RIPPLE_KOBIT_ADDRESS, {
      minLedgerVersion,
      maxLedgerVersion,
    });
    console.info('transactions', transactions);
    api.disconnect();

    return transactions;
}

app.get('/transactions/:address', async (req, res) => {
    await api.connect();
    const serverInfo = await api.getServerInfo();
    const ledgers = serverInfo.completeLedgers.split('-');
    const minLedgerVersion = Number(ledgers[0]);
    const maxLedgerVersion = Number(ledgers[1]);

    const transactions = await api.getTransactions(req.params.address, {
    //const transactions = await api.getTransactions(RIPPLE_KOBIT_ADDRESS, {
      minLedgerVersion,
      maxLedgerVersion,
    });
    console.info('transactions', transactions);
    api.disconnect();

    res.send(transactions);
});


app.listen(8080, function () {
    console.log('Listening...');
});


