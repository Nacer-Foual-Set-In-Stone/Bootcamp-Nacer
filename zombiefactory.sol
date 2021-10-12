pragma solidity ^0.8.9;

contract ZombieFactory {

    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint cooldownTime = 1 days;

    struct Zombie {
        string name;
        uint dna;
        uint32 level;
        uint32 readyTime;
        uint16 winCount;
        uint16 lossCount;
    }

    Zombie[] public zombies;

    mapping (uint => address) public zombieToOwner;
    mapping (address => uint) ownerZombieCount;
/*
Goal : 
Step 1 : récupéré l'id du nouveau zombie
Step 2 : met à jour le mappage zombieToOwner pour stocker msg.sender sous cet id.
Step 3 : Augmenter le nombre de zombie obtenue du msg,sender
Step 4 : Fonction interne afin qu'on puisse l'appeler dans zombefeeding.sol
*/

    function _createZombie(string _name, uint _dna) internal {
        uint id = zombies.push(Zombie(_name, _dna, 1, uint32(now + cooldownTime))) - 1;
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender]++;
        NewZombie(id, _name, _dna);
    }
/*    
Goal : 
Step 1 : générer un nombre aléatoire hexadécimal, 
Step 2 : le convertir en un uint
Step 3 : stocker le résultat dans un uint nommé rand.
*/
    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }
    
    
/*
Goal : 
Step 1 : vérifie si l'address ne contient pas de zombie
Step 2 : génére un nouveau zombie
Step 3 : Appel l'événement _createZombie
*/
    function createRandomZombie(string _name) public {
        require(ownerZombieCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }
    }









