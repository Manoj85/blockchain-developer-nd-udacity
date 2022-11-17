/*#########################
###    CONFIGURATION    ###
##########################*/

// Step 1: Set up the appropriate configuration 
var Web3 = require("web3")
// var EthereumTransaction = require("ethereumjs-tx") 
const EthereumTx = require('ethereumjs-tx').Transaction
var web3 = new Web3('HTTP://127.0.0.1:7545')

// -- Step 2: Set the sending and receiving addresses for the transaction. 
var sendingAddress = '0x5831Df61304E5E4a17E110E3B1a220f21eB700EF' 
var receivingAddress = '0x32F64DBA6951Da7cCf6e89d075af26a2a79d0936'

// -- Step 3: Check the balances of each address 
web3.eth.getBalance(sendingAddress).then(console.log) 
web3.eth.getBalance(receivingAddress).then(console.log)

/*##########################
    CREATE A TRANSACTION
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown 
// var rawTransaction = {
//   nonce: 0,
//   to: receivingAddress,
//   gasPrice: 20000000,
//   gasLimit: 30000,
//   value: 100,
//   data: ""
// }

var rawTransaction ={
  nonce: web3.utils.toHex(0),
  to: receivingAddress,
  gasPrice: web3.utils.toHex(20000000),
  gasLimit: web3.utils.toHex(30000),
  value: web3.utils.toHex(100),
  data: web3.utils.toHex("")
}

// -- Step 5: View the raw transaction 
rawTransaction


// -- Step 7: Sign the transaction with the Hex value of the private key of the sender 
var senderPrivateKey = '01a9518830994bcbc737b92b3844cb48380ff8a1c5dc843dc39b4975f69e59ef' 
// var privateKeySenderHex = new Buffer(senderPrivateKey, 'hex') 
// var transaction = new EthereumTransaction(rawTransaction) 

var senderPrivateKeyHex = new Buffer.from(senderPrivateKey,'hex')
var transaction = new EthereumTx(rawTransaction)

transaction.sign(senderPrivateKeyHex)

/*#########################################
Send the transaction to the network

#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network. 
var serializedTransaction = transaction.serialize(); 
web3.eth.sendSignedTransaction(serializedTransaction);