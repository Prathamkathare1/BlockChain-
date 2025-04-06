module.exports = {
  networks: {

    development: {
      host: "127.0.0.1",    
      port: 7545,            
      network_id: "5777",   
    },


    sepolia: {
      network_id: 11155111,     
      dashboard: {
        port: 24012,
      },
      confirmations: 2,        
      timeoutBlocks: 200,       
      skipDryRun: true          
    },
  },

  mocha: {
    timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.21",       
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "london"
      }
    }
  },


};
