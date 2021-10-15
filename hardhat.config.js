require("@nomiclabs/hardhat-waffle");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
const {ROPSTEN_RPC_URL, MNEMONIC } = process.env;
module.exports = {
  solidity: "0.8.7",
  defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: ROPSTEN_RPC_URL,
         accounts: {
           mnemonic: MNEMONIC
         }
        }    
      }
};
