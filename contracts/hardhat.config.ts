import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const PRIVATE_KEY = process.env.DURBAN_POISON_PRIVATE_KEY || ''
const ALCHEMY_KEY_RINKEBY = process.env.ALCHEMY_KEY_RINKEBY || ''

const config: HardhatUserConfig = {
  solidity: "0.8.1",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY_RINKEBY}`,
      accounts: [PRIVATE_KEY]
    },
  }
};

export default config;