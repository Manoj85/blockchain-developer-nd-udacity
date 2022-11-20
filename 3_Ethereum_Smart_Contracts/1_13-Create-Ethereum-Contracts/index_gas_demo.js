/*#########################
###    CONFIGURATION    ###
##########################*/

// Configuration 
var Web3 = require("web3")
const EthereumTx = require('ethereumjs-tx').Transaction
var web3 = new Web3('HTTP://127.0.0.1:7545')

// Set Addresses
var sendingAddress = '0xc6583C44b86101EF75a8618Fe459963dbfCfaD59' 
var receivingAddress = '0x7C05b00A73E1C6B77D22053ab8452635229eb097'

// Before Transaction execution
console.log("Before Transaction execution");
web3.eth.getBalance(sendingAddress).then(console.log) 
web3.eth.getBalance(receivingAddress).then(console.log)

// Create Transaction
var rawTransaction ={
  nonce: web3.utils.toHex(0),
  to: receivingAddress,
  gasPrice: web3.utils.toHex(20000000),
  gasLimit: web3.utils.toHex(30000),
  value: web3.utils.toHex(1),
  data: web3.utils.toHex("")
}

// Sign Transaction
var senderPrivateKey = '4459392253f3633ffa8002719020d511c60b6643377a246a040d3b8e0b10a837' 
var senderPrivateKeyHex = new Buffer.from(senderPrivateKey,'hex')
var transaction = new EthereumTx(rawTransaction)
transaction.sign(senderPrivateKeyHex)

var serializedTransaction = transaction.serialize(); 
web3.eth.sendSignedTransaction(serializedTransaction);

// After transaction execution
console.log("After Transaction execution");
web3.eth.getBalance(sendingAddress).then(console.log) 
web3.eth.getBalance(receivingAddress).then(console.log)