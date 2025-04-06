const DataStore = artifacts.require("DataStore");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(DataStore);
};
