require("@nomiclabs/hardhat-waffle");

console.log('#### process.env.ALCHEMY_KEY_RINKEBY: ', process.env.ALCHEMY_KEY_RINKEBY)

module.exports = {
  solidity: "0.8.1",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY_MUMBAI}`,
      accounts: [process.env.DURBAN_POISON_PRIVATE_KEY],
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_KEY_RINKEBY}`,
      accounts: [process.env.DURBAN_POISON_PRIVATE_KEY]
    },
  }
};