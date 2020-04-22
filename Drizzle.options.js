
const PointX = require('./build/contracts/PointX');

const options = {
  contracts: [PointX],
  polls: {
    accounts: 10000,
    blocks: 10000,
  },
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7545',
    },
  },
};

export default options;
