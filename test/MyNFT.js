const { expect } = require ('chai');
//const { isCallTrace } = require('hardhat/internal/hardhat-network/stack-traces/message-trace');

describe('MyNFT', function() {
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function() {
        this.MyNFT = await ethers.getContractFactory('MyNFT');
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        this.mynft = await this.MyNFT.deploy();
        await this.mynft.deployed();
    });

    //tests

    describe("Deployment", function() {
        it("Should return the name of the NFT", async function() {
            expect(await this.mynft.name()).to.equal("MyNFT")
        })
        it("Should return the symbol of the NFT", async function() {
            expect(await this.mynft.symbol()).to.equal("NFT")
        })
    })

    describe("Mint", function() {
        it("Should mint a NFT", async function() {
            
        })
    })
})