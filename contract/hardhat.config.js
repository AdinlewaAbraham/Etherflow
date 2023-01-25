require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/fTNPemna1uNKbWTBBSjLpARvXtrpS2MY',
      accounts: [process.env.REACT_APP_ACCOUNT_KEY],
    },
  },
};