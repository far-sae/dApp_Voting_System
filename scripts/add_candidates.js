const Voting = artifacts.require("Voting");

module.exports = async function(callback) {
  try {
    const voting = await Voting.deployed();
    
    // Add candidates
    await voting.addCandidate("Google");
    await voting.addCandidate("Bing");
    await voting.addCandidate("DuckDuckGo");
    await voting.addCandidate("Yahoo");
    await voting.addCandidate("Baidu");
    await voting.addCandidate("Yandex");

    console.log("Candidates added successfully");
    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};