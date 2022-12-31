pragma solidity ^0.8.0;
contract RWD{
    string public name='Reward Token';
    string public symbol='RwD';
    uint256 public totalSupply=1000000000000000000000000; //1 million tokens
    uint80 public decimals=18;
    event Transfer(address indexed from,address indexed to,uint256 value);
    event approval(address indexed owner,address indexed to,uint256 value);
    mapping (address=>uint256)public balances;
    mapping(address=>mapping(address=>uint256))public allowance;
    constructor()public {
        balances[msg.sender]=totalSupply;
    }
    function transfer(address to,uint256 value)public returns (bool){
        require(balances[msg.sender]>=value);
        balances[msg.sender]-=value;
        balances[to]+=value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    function approve(address spender,uint256 value)public returns(bool){
        allowance[msg.sender][spender]=value;
        emit approval(msg.sender,spender, value);
        return true;
    }
    function transferFrom(address from,address to,uint256 value)public returns (bool){
        require(balances[from]>=value);
        require(allowance[from][msg.sender]>=value);
        balances[from]-=value;
        balances[to]+=value;
        allowance[from][msg.sender]-=value;
        emit Transfer(from, to, value);
        return true;
    }
}