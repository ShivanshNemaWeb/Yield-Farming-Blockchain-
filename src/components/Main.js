import React, { useState } from "react";
import NavBar from "./NavBar";
import "./Main.css";
import tetherImg from '../tether.png';
const Main=(props)=>{
  const [amount,setAmount]=useState("");
  const setAmountValue=(e)=>{
    e.preventDefault();
    setAmount(e.target.value);
  }
    return(
     <div>
        <div style={{width:"100%"}}>
        <NavBar account={props.account}/>
        </div>
        <div className="d-flex align-item-center justify-content-center flex-direction-column">
        <div className="main">
        <table className="table ">
  <thead>
    <tr className="text-center ml-5 d-flex justify-content-center">
<div className="text-center d-flex justify-content-center ml-5">
<p className="text-white text-center ml-5 d-flex justify-content-center">
  Available Balance: {window.web3.utils.fromWei(props.tetherBalance, 'Ether')}
  </p>
                            
</div>
   
    </tr>
    <tr>
      <th scope="col"className="text-white">Staking Balance</th>
      <th scope="col"className="text-white">Reward Balance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="text-white">{props.stackingBalance} Tether</td>
      <td className="text-white">{props.rwdBalance} RWD</td>
    </tr>
  </tbody>
</table>
<div className=' mb-2 text-center d-flex justify-content-center ml-5'style={{opacity:'.9'}} >
                    <form 
                    className='mb-3'>
                        <div style={{borderSpacing:'0 1em'}} className="ml-5">
                            <label className='float-left text-white' style={{marginLeft:'15px'}}><b>Stake Tokens</b></label>
                            {/* <span className='float-right text-white' style={{marginRight:'90px'}}>
                                Balance: {window.web3.utils.fromWei(props.tetherBalance, 'Ether')}
                            </span>  */}
                            <div className='input-group mb-4'>
                                <input
                                type='text'
                                value={amount}
                                onChange={setAmountValue}
                                name="amount"
                                placeholder='0'
                                required />
                                <div className='input-group-open text-white'>
                                    <div className='input-group-text'>
                                        <img src={tetherImg} alt='tether' height='32' />
                                        &nbsp;&nbsp;&nbsp; USDT
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="buttons d-flex justify-content-center">
                          <button type="submit"className="btn btn-success mr-3" onClick={(e)=>{
                            e.preventDefault();
                            props.stake(amount);
                          }}>DEPOSIT</button>
                          <button type="submit"className="btn btn-primary" onClick={(e)=>{
                            e.preventDefault();
                            props.unStacking();
                          }}>WITHDRAW</button>
                        </div>
                    </form>
                </div>
        </div>
        </div>
     </div>
    );
}
export default Main;