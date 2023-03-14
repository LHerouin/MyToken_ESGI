import React from "react";
import "./App.css";
import { AbiItem } from "web3-utils";
import Web3 from "web3";

function App() {
  const [admin, setAdmin] = React.useState("");
  const web3 = new Web3(Web3.givenProvider || "ws://https://matic-mumbai.chainstacklabs.com/:80001");
  const ABI = [{ "constant": false, "inputs": [{ "name": "newSellPrice", "type": "uint256" }, { "name": "newBuyPrice", "type": "uint256" }], "name": "setPrices", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "sender", "type": "address" }, { "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "sellPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newAdmin", "type": "address" }], "name": "transferAdminship", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "target", "type": "address" }, { "name": "mintedAmount", "type": "uint256" }], "name": "mintToken", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "buyPrice", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "buy", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "beneficiary", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "sell", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "target", "type": "address" }, { "name": "freeze", "type": "bool" }], "name": "freezeAccount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "initialSupply", "type": "uint256" }, { "name": "tokenName", "type": "string" }, { "name": "tokenSymbol", "type": "string" }, { "name": "decimalUnits", "type": "uint8" }, { "name": "newAdmin", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "target", "type": "address" }, { "indexed": false, "name": "frozen", "type": "bool" }], "name": "FrozenFund", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "currentAdmin", "type": "address" }, { "indexed": true, "name": "newAdmin", "type": "address" }], "name": "AdminshipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }];
  const adrContract = "0x154a58a7fF6774Fde39477ab387479EEF97e9023";
  const contract = new web3.eth.Contract(ABI as AbiItem[], adrContract);

  const handleClick = async () => {
    let accounts = await window.ethereum?.request({ method: 'eth_requestAccounts' }) as Array<string>;
    if (accounts !== null && accounts !== undefined) {
      let gasEstimate = await web3.eth.getGasPrice();
      console.log(accounts[0]);
      await contract.methods.transferAdminship(admin).send({ from: accounts[0], gasPrice: gasEstimate });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input id="admin" type="text" value={admin} placeholder="Enter the admin value" onChange={e => setAdmin(e.target.value)}></input>
        <button onClick={handleClick}>Change Admin</button>
      </header>
    </div>
  );
}

export default App;
