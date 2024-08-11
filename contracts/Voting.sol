// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct User {
        bool exists;
        bool hasVoted;
    }

    struct Candidate {
        uint id;
        string name;
        string description;
        uint voteCount;
    }

    mapping(address => User) public users;
    mapping(uint => Candidate) public candidates;
    uint public candidateCount;

    address public admin;

    event UserRegistered(address userAddress);
    event VoteCast(address voter, uint candidateId);
    event CandidateAdded(uint candidateId, string name);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function registerUser() public {
        require(!users[msg.sender].exists, "User already registered");
        users[msg.sender] = User(true, false);
        emit UserRegistered(msg.sender);
    }

    function addCandidate(string memory _name, string memory _description) public onlyAdmin {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, _description, 0);
        emit CandidateAdded(candidateCount, _name);
    }

    function vote(uint _candidateId) public {
        require(users[msg.sender].exists, "User not registered");
        require(!users[msg.sender].hasVoted, "User has already voted");
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate");

        users[msg.sender].hasVoted = true;
        candidates[_candidateId].voteCount++;

        emit VoteCast(msg.sender, _candidateId);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidateCount);
        for (uint i = 1; i <= candidateCount; i++) {
            allCandidates[i-1] = candidates[i];
        }
        return allCandidates;
    }

    function hasUserVoted(address _user) public view returns (bool) {
        return users[_user].hasVoted;
    }
}