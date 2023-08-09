// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
// const { ethers } = require("hardhat")

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance: `, await getBalance(address));
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const address = memo.address;
    const message = memo.message;

    console.log(`At ${timestamp}, name: ${name}, address: ${address}, message: ${message}`);
  }
}

async function main() {
  await hre.ethers.provider.send("evm_setAutomine", [false]);

  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const coffee = await hre.ethers.getContractFactory("coffee");
  // const contract = await coffee.deploy();


  console.log("Deploying contract...");
  const contract = await coffee.deploy();
  
  console.log("Contract deployed at address:", contract.address);


  const addresses = [owner.address, from1.address];
  console.log("Balances before transfer:");
  await consoleBalances(addresses);

  const amount = { value: hre.ethers.utils.parseEther("1") }
  await contract.connect(from1).buyCoffee("from1", "good luck from 1", amount);
  await contract.connect(from2).buyCoffee("from2", "good luck from 2", amount);
  await contract.connect(from3).buyCoffee("from3", "good luck from 3", amount);

  console.log("Balances after transfer:");
  await consoleBalances(addresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
