'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'ws://127.0.0.1:6006'
});
api.connect().then(() => {
  /* begin custom code ------------------------------------ */
  const myAddress = 'rLinV6oik3ueB5jJhdcAStXv27bgwKxiaH';

  console.log('getting account info for', myAddress);
  return api.getAccountInfo(myAddress);

}).then(info => {
  console.log(info);
  console.log('getAccountInfo done');

  /* end custom code -------------------------------------- */
}).then(() => {
  return api.disconnect();
}).then(() => {
  console.log('done and disconnected.');
}).catch(console.error);
