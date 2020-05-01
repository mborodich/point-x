const web3 = require('web3');
const PointX = require('./build/contracts/PointX');
// const HDWalletProvider = require('@truffle/hdwallet-provider');

const {
  POINTX_ADDRESS: contractAddress = '0x498B275a77a4457223E0Dd8Db51cC8fB259c2f43',
  INFURA_TOKEN: infuraToken = '29bb7426ec9b45279ba484700144d617'
} = process.env;



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
    // customProvider:
    //   new HDWalletProvider("dust turn excite exercise space light now divert idle include bird arrow", "https://rinkeby.infura.io/v3/" + infuraToken),
    fallback: {
      type: 'ws',
      url: 'wss://rinkeby.infura.io/ws/v3/29bb7426ec9b45279ba484700144d617',
    },
  },
};

export default options;
