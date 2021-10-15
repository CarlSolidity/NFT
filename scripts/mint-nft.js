require("dotenv").config()
const ROPSTEN_RPC_URL = process.env.ROPSTEN_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const PUBLIC_KEY = process.env.PUBLIC_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const { ethers } = require("hardhat")
const web3 = createAlchemyWeb3(ROPSTEN_RPC_URL)
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")

const contractAddress = "0x40958cc88cab4accc893fbe556760f4bea343572"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
    //get latest nonce
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');
    
    // the transaction
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };
    

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
    .then((signedTx) => {
        web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
                if (!err) {
                    console.log(
                        "The hash of your transaction is: ",
                        hash,
                        "\nCheck Alchemy's mempool to view the status of your transaction"
                    )
                } else {
                    console.log(
                        "Something went wrong when submitting your transaction:",
                        err
                    )
                }
            }
        )
    })
    .catch((err) => {
        console.log("Promise failed:", err)
    })
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmQd6BKMey7DtoDVDG1PwuzNXBEwnZ7URz1HmHB2E9F1v7")