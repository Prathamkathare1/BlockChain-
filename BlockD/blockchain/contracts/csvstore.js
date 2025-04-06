const Web3 = require("web3");
const fs = require("fs");
const csv = require("csv-parser");

const contractABI = [
  {
    "inputs": [],
    "name": "dataCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "dataRecords",
    "outputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "info", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" },
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_info", "type": "string" }
    ],
    "name": "storeData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }],
    "name": "getData",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const contractAddress = "0x39ba9A2953a5f31Cf0dce5026c2B5Ba31b003E25";
const ganacheURL = "http://127.0.0.1:7545";
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheURL));

async function storeCSVData() {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const [account] = await web3.eth.getAccounts();
  
  fs.createReadStream("ps.csv")
    .pipe(csv())
    .on("data", async (row) => {
      try {
        await contract.methods.storeData(row.id, row.name, row.info).send({
          from: account,
          gas: 100000
        });
        console.log("✅ Data stored successfully:", row);
      } catch (error) {
        console.error("❌ Error storing data:", error);
      }
    })
    .on("end", () => {
      console.log("🚀 CSV file processing complete.");
    });
}

storeCSVData();
