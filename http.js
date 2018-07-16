'use stric';
const { RippleAPI } = require('ripple-lib');
let prettyHtml = require('json-pretty-html').default;
let fs = require('fs');
let express = require('express');
let app = express();


const RIPPLE_K_ADDRESS = 'rBTjeJu1Rvnbq476Y7PDnvnXUeERV9CxEQ';
const RIPPLE_A_ADDRESS = 'rnXevhMvyewef7CdkaDXJ5erqfKQwJYtDv';
const RIPPLE_B_ADDRESS = 'rsZRJ9aJc2HSrkVqz2EFSp8aszEfHKFfGJ';
async function getServerInfo(api) {
	const serverInfo = await api.getServerInfo();
	const ledgers = serverInfo.completeLedgers.split('-');
	const minLedgerVersion = Number(ledgers[0]);
	const maxLedgerVersion = Number(ledgers[1]);
	return {
		serverinfo: serverInfo,
		ledgers: ledgers,
		minLedgerVersion: minLedgerVersion,
		maxLedgerVersion: maxLedgerVersion
	};
}

const api = new RippleAPI({
    // server: 'ws://127.0.0.1:6006'
    server: 'wss://s2.ripple.com'
});
// api.on('ledger', ledger => {
  // console.log(JSON.stringify(ledger, null, 2));
// });
// api.on('error', (errorCode, errorMessage, data) => {
  // console.log(errorCode + ': ' + errorMessage);

// });

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
	await api.connect();
	let serverInfo = await getServerInfo(api);
	console.log(serverInfo);
	let minLedgerVersion = serverInfo['minLedgerVersion'];
    let maxLedgerVersion = serverInfo['maxLedgerVersion'];
	let html = prettyHtml(serverInfo, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);
	api.disconnect();

	res.render('index', { title: 'Ripple Api', message: 'api test', serverInfo: html});
});

app.get('/fee', async (req, res) => {
	await api.connect();
	let fee = await api.getFee();
	let html = prettyHtml({'fee': fee}, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);
	
	res.send(html);
});

app.get('/ledger-version', async (req, res) => {
	await api.connect();
	let getLedgerVersion = await api.getLedgerVersion();
	console.log(getLedgerVersion);
	api.disconnect();
	let html = prettyHtml({'ledger-version': getLedgerVersion}, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);
	
	res.send(html);
});


app.get('/transactions/:address', async (req, res) => {
	await api.connect();
	let serverInfo = await getServerInfo(api);
	let minLedgerVersion = serverInfo['minLedgerVersion'];
    let maxLedgerVersion = serverInfo['maxLedgerVersion'];
	console.log(minLedgerVersion, maxLedgerVersion);
	const transactions = await api.getTransactions(req.params.address, {
      minLedgerVersion,
      maxLedgerVersion,
    });
	
    console.info('transactions', transactions);
	fs.writeFile('transactions.txt', JSON.stringify(transactions), 'utf8', function(err) {
		console.log('비동기적 파일 쓰기 완료');
	});
	api.disconnect();
	let html = prettyHtml(transactions, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);
    
    res.send(html);
});

app.get('/transaction/:id', async (req, res) => {
    await api.connect();   
	let serverInfo = await getServerInfo(api);
	let minLedgerVersion = serverInfo['minLedgerVersion'];
    let maxLedgerVersion = serverInfo['maxLedgerVersion'];
	console.log(minLedgerVersion, maxLedgerVersion);
    const transaction = await api.getTransaction(req.params.id, {
      minLedgerVersion,
      maxLedgerVersion,
    });
    console.info('transaction', transaction);
    api.disconnect();
	let html = prettyHtml(transaction, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);

    res.send(html);
});

app.get('/trustlines/:address', async (req, res) => {
    await api.connect();   
	// let serverInfo = await getServerInfo(api);
	// let minLedgerVersion = serverInfo['minLedgerVersion'];
    // let maxLedgerVersion = serverInfo['maxLedgerVersion'];
	// console.log(minLedgerVersion, maxLedgerVersion);
    const trustlines = await api.getTrustlines(req.params.address);
    api.disconnect();
	let html = prettyHtml(trustlines, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);

    res.send(html);
});

app.get('/balance/:address', async (req, res) => {
    await api.connect();   
    const balance = await api.getBalances(req.params.address);
    api.disconnect();
	let html = prettyHtml(balance, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);

    res.send(html);
});

app.get('/balancesheet/:address', async (req, res) => {
    await api.connect();   
    const balancesheet = await api.getBalanceSheet(req.params.address);
    api.disconnect();
	let html = prettyHtml(balancesheet, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);

    res.send(html);
});

app.get('/paths/:address', async (req, res) => {
    await api.connect();   
    const paths = await api.getPaths(req.params.address);
    api.disconnect();
	let html = prettyHtml(paths, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);

    res.send(html);
});

app.get('/orders/:address', async (req, res) => {
    await api.connect();   
    const orders = await api.getOrders(req.params.address);
    api.disconnect();
	let html = prettyHtml(orders, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);

    res.send(html);
});

app.get('/orderbook/:address', async (req, res) => {
    await api.connect();   
    const orderbook = await api.getOrderbook(req.params.address);
    api.disconnect();
	let html = prettyHtml(orderbook, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);

    res.send(html);
});


app.get('/settings/:address', async (req, res) => {
    await api.connect();   
    const settings = await api.getSettings(req.params.address);
    api.disconnect();
	let html = prettyHtml(settings, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);

    res.send(html);
});

app.get('/accountinfo/:address', async (req, res) => {
    await api.connect();   
    const settings = await api.getAccountInfo(req.params.address);
    api.disconnect();
	let html = prettyHtml(settings, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);

    res.send(html);
});

app.get('/accountobjects/:address', async (req, res) => {
    await api.connect();   
    const accountobjects = await api.getAccountObjects(req.params.address);
    api.disconnect();
	let html = prettyHtml(accountobjects, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);

    res.send(html);
});


app.get('/paymentchannel/:id', async (req, res) => {
    await api.connect();   
    const paymentchannel = await api.getPaymentChannel(req.params.id);
    api.disconnect();
	let html = prettyHtml(paymentchannel, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);		

    res.send(html);
});

app.get('/ledger/:id', async (req, res) => {
    await api.connect();  
	

	console.log(req.params.id);
	console.log({
		ledgerVersion: req['params']['id'],
		includeAllData: true,
		// includeState: true,
		includeTransactions: true,
	});
	const ledger = await api.getLedger({
		ledgerVersion: Number(req['params']['id']),
		includeAllData: true,
		// includeState: true,
		includeTransactions: true,
	});
	console.info('transactions', ledger['transactions']);

    api.disconnect();
	let html = prettyHtml(ledger, {
		"length": 7.0,
		"width": 12.0,
		"height": 9.5
	},);

    res.send(html);
});


app.get('/all', async (req, res) => {
	await api.connect();
	let serverInfo = await getServerInfo(api);
	let minLedgerVersion = serverInfo['minLedgerVersion'];
    let maxLedgerVersion = serverInfo['maxLedgerVersion'];
	
	let length = 10;
	let start = 0;
	// let start = 32570;
	let end = 39976240;
	for (let i = end; i > 550000; i--) {
		console.info('i', i);
		const ledger = await api.getLedger({
			ledgerVersion: i,
			includeAllData: true,
			// includeState: true,
			includeTransactions: true,
		});
		// console.log(ledger);
		start = end - length;
		end = start;
	}
	

	
	api.disconnect();
});





app.listen(80, function () {
    console.log('Listening...');
});


