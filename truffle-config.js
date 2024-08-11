module.exports = {
  // Define your networks
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ganache port (default: none)
      network_id: "*", // Any network (default: none)
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200,
        },
        evmVersion: "istanbul",
      },
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  // The default storage location can also be overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: Truffle DB is still in beta and has not yet been tested for production environments.
  //
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  // }
};
