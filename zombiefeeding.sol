pragma solidity ^0.8.9;

import "./zombiefactory.sol";


 /*
Goal : Crée une interface KittyInterface afin de pouvoir appeler la fonction getKitty et récuperer les donnée d'un autre contract
Step 1 : 
*/
contract KittyInterface {
function getKitty(uint256 _id) external view returns (
    bool isGestating,
    bool isReady,
    uint256 cooldownIndex,
    uint256 nextActionAt,
    uint256 siringWithId,
    uint256 birthTime,
    uint256 matronId,
    uint256 sireId,
    uint256 generation,
    uint256 genes
);
}


contract ZombieFeeding is ZombieFactory {
    
   KittyInterface kittyContract;
   
   /*
   Goal : Condition pour vérifier le propriétaire du zombie
   */
    modifier ownerOf(uint _zombieId) {
    require(msg.sender == zombieToOwner[_zombieId]);
    _;
  }

    /*
    Goal :  fonctions qui nous permet de mettre à jour l'address des kity 
    */
   function setKittyContractAddress(address _address) external {
    kittyContract = KittyInterface(_address);
  }
  
  
  function _triggerCooldown(Zombie storage _zombie) internal {
    _zombie.readyTime = uint32(now + cooldownTime);
  }

  function _isReady(Zombie storage _zombie) internal view returns (bool) {
      return (_zombie.readyTime <= now);
  }

    
 /*
Goal : 
Step 1 : vérifie que msg.sender est égal au propriétaire du zombie
Step 2 : Crée un zombie local associé à l'index _zombieId de notre tableau Zombie 
Step 3 : vérifie que  que _targetDna n'est pas plus long que 16 chiffres grâce à dnaModulus
Step 4 : Crée un newDna qui est la moyenne entre l'adn du zombie et de la cible
Step 5 : if pour comparer le hachage keccak256 de _species et la chaîne de caractère "kitty".
Step 6 : remplace les 2 derniers chiffres de l'ADN par 99
Step 7 : Crée un zombe 'NoName' avec le nouvelle ADN
*/
  function feedAndMultiply(uint _zombieId, uint _targetDna, string _species) internal ownerOf(_zombieId) { //la fonction appelle ownerOf pour vérifier l'appartenacne du zombie
    //require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
    require(_isReady(myZombie));
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myZombie.dna + _targetDna) / 2;
    if (keccak256(_species) == keccak256("kitty")) {
      newDna = newDna - newDna % 100 + 99;
    }
    _createZombie("NoName", newDna);
    _triggerCooldown(myZombie);

  }


  /*
Goal :  fonction qui récupère les gènes d'un chaton à partir du contrat 
Step 1 : Appele la fonction kittyContract.getKitty avec _kittyId et stocke les genes dans kittyDna.
Step 2 : la fonction appele feedAndMultiply avec _zombieId et kittyDna.
*/
  
  function feedOnKitty(uint _zombieId, uint _kittyId) public {
    uint kittyDna;
    (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
    // et modifiez l'appel de la fonction ici :
    feedAndMultiply(_zombieId, kittyDna, "kitty");
  }

}


