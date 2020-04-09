const path = require("path");

module.exports = {
  networks: {
    develop: {
      port: 7545,
      network_id: "5777", // Match any network id
      from: "0x77cBFd20156d5a3dA59aF105853B3279abf84fb8",
      gas: 999999999
    },
  },
};
