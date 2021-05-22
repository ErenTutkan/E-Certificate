const DigitalCertificate = artifacts.require("DigitalCertificate");

module.exports = function (deployer) {
  deployer.deploy(DigitalCertificate);
};
