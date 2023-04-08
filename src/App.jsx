import React, { useEffect , useState } from "react";
import "./App.css";

const getEthereumObject = () => window.ethereum;

const findMetamaskAccount = async () => {

  try
  {const ethereum = getEthereumObject();
 

  if(!ethereum){
    console.log("Make sure you have metamask");
    return null;
  }

  console.log("We have ethereum object" , ethereum)
  const accounts = await ethereum.request({method: "eth_accounts"})

  if(accounts.length !== 0){
    const account = accounts[0];
    console.log("Found an authorized account" , account);
    return account;
  }else{
    console.error("No authorized account found")
    return null;
  }
} catch(error){
  console.log(error);
  return null;}
}

const App = () => {
 
const[currentAccount , SetCurrentAcount] = useState("")


const connectWallet = async () => {
   try{
    const ethereum = getEthereumObject();
    if (!ethereum){
      alert("Get metamask");
      return;
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Connected" , accounts[0])

   }catch(error){
    console.error(error)
   }
}



  useEffect(() => {
  findMetamaskAccount().then((account) =>{
    if (account !== null) {
      SetCurrentAcount(account);
    }
  })
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          Lets goooo 🔥!
        </div>

        <div className="bio">
          I am Farza and I worked on self-driving cars so that's pretty cool
          right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={null}>
          Wave at Me
        </button>




        {!currentAccount && 
        <button className="waveButton" onClick={connectWallet}>
          Connect Wallet
        </button>
        }


      </div>
    </div>
  );
};

export default App;