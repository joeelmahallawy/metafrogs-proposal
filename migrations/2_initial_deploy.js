const MetaFrogsProposals = artifacts.require("MetaFrogsProposals");

module.exports = function (deployer) {
  deployer.deploy(MetaFrogsProposals);
};
