pragma solidity ^0.8.9;
// SPDX-License-Identifier: MIT
import "./zombieattack.sol";
import "./erc721.sol";
import "./safemath.sol";

contract ZombieOwnership is ZombieBattle, ERC721 {

  using SafeMath for uint256;

  mapping (uint => address) zombieApprovals;

  function balanceOf(address _owner) public override view returns (uint256 _balance) {
    return ownerZombieCount[_owner];
  }

  function ownerOf(uint256 _tokenId) public override view returns (address _owner) {
    return zombieToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerZombieCount[_to] = ownerZombieCount[_to].add(1);
    ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender].sub(1);
    zombieToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transfer(address _to, uint256 _tokenId) public override onlyOwnerOf(_tokenId) {
    _transfer(msg.sender, _to, _tokenId);
  }
      /*
  Goal : vérifie que msg.sender a bien le token et approve
  */

  function approve(address _to, uint256 _tokenId) public override onlyOwnerOf(_tokenId) {
    zombieApprovals[_tokenId] = _to;
    emit Approval(msg.sender, _to, _tokenId);
  }
  
  /*
  Goal : vérifie que msg.sender a été approuvé à prendre ce token / zombie, et appeler _transfer si c'est le cas.
  */
  function takeOwnership(uint256 _tokenId) public override {
    require(zombieApprovals[_tokenId] == msg.sender);
    address owner = ownerOf(_tokenId);
    _transfer(owner, msg.sender, _tokenId);
  }
}

