pragma solidity ^0.8.0;
import './Tether.sol';
import './RWD.sol';
contract DecentralBank{
  string public name= 'Decentral Bank';
  address public owner;
  Tether public tether;
  RWD public rwd;
  constructor(RWD _rwd,Tether _tether)public{
   tether=_tether;
   rwd=_rwd;
   owner=msg.sender;
  }
  mapping (address=>bool)public hasStacked;
  mapping (address=>bool)public isStacking;
  mapping (address=>uint256)public stackingBalance;
   mapping (address =>bool)public rewarded;
  address[]public stackers; 
  function depositTokens(uint amount)public {
   tether.transferFrom(msg.sender,address(this), amount);
   if(!hasStacked[msg.sender]){
    stackers.push(msg.sender);
   }
   stackingBalance[msg.sender]+=amount;
   hasStacked[msg.sender]=true;
   isStacking[msg.sender]=true;
   if(stackingBalance[msg.sender]>=50 && !rewarded[msg.sender]){
      rwd.transfer(msg.sender, stackingBalance[msg.sender]/9);
      rewarded[msg.sender]=true;
    }
  }
  //  function rewardTokens(address customer)public{
  //   require(msg.sender==owner);
  //     if(stackingBalance[customer]>=50 && !rewarded[customer]){
  //     rwd.transfer(customer, stackingBalance[customer]/9);
  //     rewarded[customer]=true;
  //   }
  //  }
   function unStacking()public{
    tether.transfer(msg.sender, stackingBalance[msg.sender]);
    isStacking[msg.sender]=false;
    stackingBalance[msg.sender]=0;
   }
    }
