pragma solidity ^0.4.19;

import "./zombiefeeding.sol";

contract ZombieHelper is ZombieFeeding {
    
     // 1. Définissez levelUpFee ici
  uint levelUpFee = 0.001 ether;

/*
Goal : un 'modifier' pour gérer les conditions du niveau des Zombies

*/
  modifier aboveLevel(uint _level, uint _zombieId) {
    require(zombies[_zombieId].level >= _level);
    _;
  }
  
  // 1. Créez une fonction withdraw ici
  function withdraw() external onlyOwner {
    owner.transfer(this.balance);
  }

  // 2. Crées une fonction setLevelUpFee ici
  function setLevelUpFee(uint _fee) external onlyOwner {
    levelUpFee == _fee;
  }

  // 2. Ajoutez la fonction levelUp ici
  function levelUp(uint _zombieId) external payable {
    require(msg.value == levelUpFee);
    zombies[_zombieId].level++;
  }
  
  /*
    Goal : changer le no, du zombie
    Step 1 : la fonction appele ownerOf pour vérifier l'appartenance du zombie
    */
  function changeName(uint _zombieId, string _newName) external aboveLevel(2, _zombieId) ownerOf(_zombieId) {
    zombies[_zombieId].name = _newName;
  }

    /*
    Goal : changer l'adn du zombie
    Step 1 : la fonction appele ownerOf pour vérifier l'appartenance du zombie
    */
  function changeDna(uint _zombieId, uint _newDna) external aboveLevel(20, _zombieId) ownerOf(_zombieId) {
   // require(msg.sender == zombieToOwner[_zombieId]);
    zombies[_zombieId].dna = _newDna;
  }
    function getZombiesByOwner(address _owner) external view returns(uint[]) {
    uint[] memory result = new uint[](ownerZombieCount[_owner]);
    // Commencez ici
    uint counter = 0;

    for(uint i = 0;i < zombies.length;i++){

      if(zombieToOwner[i] == _owner){
        result[counter] = i;
        counter++;
      }
    }

    }
    
}
