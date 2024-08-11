const Voting = artifacts.require("Voting");
const mysql = require('mysql2/promise');

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Voting);
  const votingInstance = await Voting.deployed();

  // Connect to your MySQL database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'voting_app'
  });

  try {
    // Fetch candidates from the database
    const [rows, fields] = await connection.execute('SELECT * FROM vote_candidates');

    // Add each candidate to the smart contract
    for (let candidate of rows) {
      await votingInstance.addCandidate(candidate.name, candidate.description, { from: accounts[0] });
      console.log(`Added candidate: ${candidate.name}`);
    }

    console.log('All candidates added successfully');
  } catch (error) {
    console.error('Error adding candidates:', error);
  } finally {
    await connection.end();
  }
};