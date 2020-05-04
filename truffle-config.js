require('dotenv').config();
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    develop: {
      port: 7545,
      network_id: "5777", // Match any network id
      from: "0x77cBFd20156d5a3dA59aF105853B3279abf84fb8",
      gas: 999999999
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider("dust turn excite exercise space light now divert idle include bird arrow", "https://rinkeby.infura.io/v3/" + process.env.INFURA_TOKEN);
      },
      from: '0x77cbfd20156d5a3da59af105853b3279abf84fb8',
      network_id: 4,
      gas: 999999999
    }
  },
};
