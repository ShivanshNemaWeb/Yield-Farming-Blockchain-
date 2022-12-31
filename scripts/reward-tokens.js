const DecentralBank=artifacts.require('DecentralBank');
module.exports=async function issueRewards(callback){
const decentralBank=await DecentralBank.deployed();
await decentralBank.rewardTokens();
console.log("Tokens has been rewarded");
callback();
}