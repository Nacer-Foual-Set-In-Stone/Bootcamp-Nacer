var ZombieFactory = artifacts.require("ZombieFactory");
var ZombieAttack = artifacts.require("ZombieBattle");
var ZombeFeeding = artifacts.require("ZombieFeeding");
var ZombieOwnership = artifacts.require("ZombieOwnership");
var ZombieHelper = artifacts.require("ZombieHelper");

module.exports = function(deployer) {
  deployer.deploy(ZombieFactory);
  deployer.deploy(ZombieAttack);
  deployer.deploy(ZombeFeeding);
  deployer.deploy(ZombieOwnership);
  deployer.deploy(ZombieHelper);
};