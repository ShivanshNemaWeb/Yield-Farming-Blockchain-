import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import Loader from "./Loader";
import Main from "./Main";
import ParticleSettings from './ParticleSettings'

const App=()=>{
    const [account,setAccount]=useState("");
    const [tether,setTether]=useState({});
    const [rwd,setRwd]=useState({});
    const [decentralBank,setDecentralBank]=useState({});
    const [tetherBalance,setTetherBal]=useState("");
    const [rwdBalance,setRwdBal]=useState("");
    const [stackingBalance,setStackingBal]=useState("");
    const [loading,setLoading]=useState(true);
    const [owner,setOwner]=useState("");
        const loadWeb3=async()=>{
        if(window.ethereum){
            window.web3= new Web3(window.ethereum);
            await window.ethereum.enable();
           }
           else if(window.web3){
             window.web3=new Web3(window.web3.currentProvider);
           }
           else{
             window.alert("System has no MetaMask");
           }
    }
    const getAccount=async()=>{

        const web3=window.web3;
        const acc=await web3.eth.getAccounts();
        console.log(acc);
        setAccount(acc[0]);
        setOwner(acc[1]);
         console.log(acc);
        const networkId=await web3.eth.net.getId();
        // Loading Tether
        const tetherData= Tether.networks[networkId];
        if(tetherData){
            const teth=new web3.eth.Contract(Tether.abi,tetherData.address); 
            setTether(teth);
            let tetherBal=await teth.methods.balances(acc[0]).call();
            setTetherBal(tetherBal);
        }
        else{
            window.alert("contract not deployed");
        }
        //Loading RWD
        const rwdData=RWD.networks[networkId];
        if(rwdData){
            const rwd=new web3.eth.Contract(RWD.abi,rwdData.address);
            setRwd(rwd);
            let rwdBal=await rwd.methods.balances(acc[0]).call();
            setRwdBal(rwdBal);
            console.log(rwdBal.toString());
        }
        else{
            window.alert("RWD not deployed");
        }
        //Loading DecentralBank
        const DecentralBankData=DecentralBank.networks[networkId];
        if(DecentralBankData){
            const decentralBank=new web3.eth.Contract(DecentralBank.abi,DecentralBankData.address);
            console.log(decentralBank);
            setDecentralBank(decentralBank);
            let stackingBal=await decentralBank.methods.stackingBalance(acc[0]).call();
            setStackingBal(stackingBal);
            console.log(stackingBal);
        }
        else{
            window.alert("DecentralBank not deployed");
        }
    }
    useEffect(async()=>{
      await loadWeb3();
      await getAccount();
      setTimeout(function() {
          setLoading(false);
      }, 5000);
   
    },[])
    const stake=async(amount)=>{
      setLoading(true);
   await tether.methods.approve(decentralBank._address,amount).send({from:account}).on('transactionHash',async(hash)=>{
    await decentralBank.methods.depositTokens(amount).send({from:account}).on('transactionHash',async(hash)=>{
      setLoading(false);
    })
   })
    }

    const unStacking=async(amount)=>{
      setLoading(true);
    await decentralBank.methods.unStacking().send({from:account}).on('transactionHash',(hash)=>{
      setLoading(false);
    })
  
    }
return(
    <div>
      {loading?(<Loader/>):(<>
        <div  className="App" style={{ position: 'relative'}}>
        <div style={{ position: 'absolute'}}>
        <ParticleSettings />
        </div>
        <main role="main" style={{ maxWidth: '100%',minHeight: '100vm'}}>
              <div>
                <Main account={account} stackingBalance={stackingBalance} rwdBalance={rwdBalance} tetherBalance={tetherBalance} stake={stake} unStacking={unStacking}/>
              </div>
            </main>
        </div>
      </>)}
    </div>
)
}
export default App;
