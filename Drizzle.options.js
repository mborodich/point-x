const PointX = require('./build/contracts/PointX');



const options = {
  syncAlways: true,
  contracts: [
    PointX
  ],
  polls: {
    accounts: 10000,
    blocks: 10000,
  },
  web3: {
    fallback: {
      type: 'ws',
      url: 'wss://rinkeby.infura.io/ws/v3/ef6dbfec06ab41f1a07e1dc1faa208d0',
      // url: 'ws://127.0.0.1:7545'
    },
  },
};

export default options;
