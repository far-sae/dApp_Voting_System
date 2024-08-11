
# Decentralized Voting Application using Blockchain

## Overview

This project focuses on the development and implementation of a **Decentralized Voting System** using **Blockchain technology (Ganache, MetaMask)**, **React.js**, and **MySQL**. The primary goal is to enhance the security, transparency, and accessibility of electoral processes by leveraging blockchain's decentralized nature and cryptographic security features.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technical Details](#technical-details)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

- **Backend**: 
  - Blockchain integration using Ethereum and smart contracts developed with Solidity.
  - Ganache for local blockchain development and testing.
  - MetaMask for secure user authentication and transaction authorization.
  - MySQL database for storing non-transactional data.
  
- **Frontend**:
  - Built using React.js for a responsive and dynamic user interface.
  - Components include user registration, voting interface, and results display.

## Features

- **Security and Transparency**:
  - Immutable voting records stored on the blockchain.
  - Smart contracts to enforce voting rules and tally votes accurately.
  - Cryptographic security measures, including encryption and digital signatures.

- **User-Friendly Interface**:
  - Intuitive design with React.js for ease of navigation.
  - Responsive layout accessible on various devices, including mobile and desktop.
  - Accessibility features such as text-to-speech and high-contrast modes.

- **Decentralization**:
  - Votes are recorded and verified across a distributed network of nodes, eliminating single points of failure.
  - Decentralized ledger technology ensures transparency and prevents tampering.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/far-sae/dApp_Voting_System.git
   ```
2. Navigate to the project directory:
   ```bash
   cd dApp_Voting_System
   ```
3. Install the necessary dependencies for both backend and frontend:
   ```bash
   npm install
   ```
4. Set up and start Ganache for local blockchain development:
   ```bash
   ganache-cli
   ```
5. Deploy smart contracts using Truffle:
   ```bash
   truffle migrate --network development
   ```
6. Start the development server:
   ```bash
   npm start
   ```

## Usage

- **Voting**: Users can authenticate using MetaMask, cast their votes, and view results in real-time through the user-friendly interface.
- **Admin Panel**: Administrators can monitor voting activity, manage voter registration, and review system logs.

## Technical Details

- **Blockchain Framework**: Ethereum
- **Smart Contracts**: Solidity
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MySQL for non-transactional data and IPFS for decentralized storage

## Screenshots

1. **Login Page**:
   - Secure authentication via MetaMask.
2. **Vote Casting Page**:
   - User-friendly voting interface connected to the blockchain.
3. **Vote Confirmation Page**:
   - Confirmation message after successful vote casting.

## Contributing

Contributions are welcome! Please follow the standard GitHub flow for contributing:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

