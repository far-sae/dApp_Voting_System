import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import VotingContract from "./Voting.json"; // Make sure this path is correct

const Voting = ({ user }) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    fetchCandidates();
    initializeWeb3();
  }, []);

  const initializeWeb3 = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);

        // Get the contract instance
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];
        const instance = new web3Instance.eth.Contract(
          VotingContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        setContract(instance);

      } catch (error) {
        console.error("Error initializing Web3:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/candidates");
      setCandidates(response.data.candidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const handleVote = async (candidateId) => {
    if (!web3 || !contract || !account) {
      alert("Web3 is not initialized. Please make sure MetaMask is connected.");
      return;
    }

    try {
      // First, register the user if not already registered
      await contract.methods.registerUser().send({ from: account });

      // Then, vote
      await contract.methods.vote(candidateId).send({ from: account });

      // Update backend
      await axios.post("http://localhost:5000/api/vote", {
        userId: user.user_id,
        candidateId,
      });

      alert("Vote submitted successfully!");
      setSelectedCandidate(candidateId);
      user.hasVoted = true;

      // Optionally, refresh candidates to show updated vote counts
      fetchCandidates();
    } catch (error) {
      console.error("Error voting:", error);
      alert("Error submitting vote. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Vote for Your Preferred Candidate</h2>
      {user.hasVoted ? (
        <div className="alert alert-success text-center" role="alert">
          You have already voted. Thank you!
        </div>
      ) : (
        <div className="row justify-content-center">
          {candidates.map((candidate) => (
            <div key={candidate.candidate_id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{candidate.name}</h5>
                  <p className="card-text">{candidate.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleVote(candidate.candidate_id)}
                    disabled={selectedCandidate === candidate.candidate_id || user.hasVoted}
                  >
                    {selectedCandidate === candidate.candidate_id
                      ? "Voted"
                      : "Vote"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Voting;