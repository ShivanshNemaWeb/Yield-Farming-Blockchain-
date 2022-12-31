const assert = require('assert');

const Tether=artifacts.require('Tether');
const RWD=artifacts.require('RWD');
const DecentralBank=artifacts.require('DecentralBank');
require('chai')
.use(require('chai-as-promised'))
.should();
contract(DecentralBank,([owner,customer])=>{
    let tether,rwd,decentralBank;
    before(async()=>{
         tether=await Tether.new();
         rwd=await RWD.new();
         decentralBank=await DecentralBank.new(rwd.address,tether.address);
        await rwd.transfer(decentralBank.address,'1000000000000000000000000');
        await tether.transfer(customer,'1000000000000000000',{from:owner});
    })
describe('Tether Deployment',async()=>{
    it('Tether Deployed Successfully',async ()=>{
        const name=await tether.name();
        assert.equal(name,'Tether')
    })
})

describe("RWD Deployment",async()=>{
    it("RWD Deployed successfully",async()=>{
        const name=await rwd.name();
        assert.equal(name,"Reward Token");
    })
})
describe("Decentral Bank deployment",async()=>{
    it("Decentral Bank deployed successfully",async()=>{
        const name=await decentralBank.name();
        assert.equal(name,"Decentral Bank");
    })
    it("Decentral Bank has token",async()=>{
        const balance=await rwd.balances(decentralBank.address);
        assert.equal(balance,'1000000000000000000000000');
    })
})
describe('checking customers balance befor stacking',async()=>{
    it("balance has fetched",async()=>{
        const balance = await tether.balances(customer);
        assert.equal(balance,'1000000000000000000');
    })
})
describe("Depositing and checking balance",async()=>{
    it("Deposited successfully",async()=>{
        await tether.approve(decentralBank.address,'1000000000000000000',{from :customer});
        await decentralBank.depositTokens('1000000000000000000',{from:customer});
        const balance = await tether.balances(customer);
        assert.equal(balance,'0');   
        //checking decentral balance
        const bankBalance=await decentralBank.stackingBalance(customer);
        assert.equal(bankBalance,'1000000000000000000');
        const bal=await tether.balances(decentralBank.address);
        assert.equal(bal,'1000000000000000000');
     })
})
describe("Reward issueing",async()=>{
    it("rewards issued successfully",async()=>{
        await decentralBank.rewardTokens({from:owner});
        await decentralBank.rewardTokens({from:customer}).should.be.rejected;
    })
})
describe("unstacking amount",async()=>{
    it("withdrawing amount",async()=>{
        await decentralBank.unStacking({from:customer});
    })
    it("balance of customer",async()=>{
        const balance=await tether.balances(customer);
        assert.equal(balance,'1000000000000000000');
    })
    it("balance of decentral bank",async()=>{
        const balance=await tether.balances(decentralBank.address);
        assert.equal(balance,'0');
    })
})
});

