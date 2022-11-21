

( async () => {
  const providerUrl = "https://goerli.infura.io/v3/17ed6dde97064fa0a4cb79e2835a7a29";

  // Connect a the web3 provider
  if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
  } else {
      web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
  }

  const senderAccount = '0xc04BD57837EA6Ed483c911923D8bE55041657178'; // accounts[0]

  const accounts = await ethereum.request({
    method: 'eth_requestAccounts',
  });

  console.log(accounts);

  // Set a default account
  web3.eth.defaultAccount = senderAccount;
  console.log(senderAccount);

  const abi_value = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "x",
          "type": "string"
        }
      ],
      "name": "setMessage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMessage",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  // Deployed to Integrated Metamask
  const contract_address = '0xB13ABe41c34540a68e8f6BB35db841411883fa8B';

  // Get the contract abi
  var RemixContract = new web3.eth.Contract(abi_value, contract_address);

  console.log(RemixContract);

  document.getElementById("setMessageButton").onclick = () => {
    let message = document.getElementById("userInput").value.toString();
    console.log(`Input message = ${message}`)

    RemixContract.methods.setMessage(message).send({ from: senderAccount });
    
  };

})

        