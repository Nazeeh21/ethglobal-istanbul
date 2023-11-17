// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title Challenge Contract
 */
contract ChallengeContract {
    address public factory;  // Address of the factory that created the challenge contract
    address public owner;    // Owner of the challenge contract

    // Event to notify when a challenge contract is created
    event ChallengeContractCreated(address challengeAddress, address owner);

    // Constructor to set the factory and owner addresses
    constructor(address _factory, address _owner) {
        factory = _factory;
        owner = _owner;
        emit ChallengeContractCreated(address(this), _owner);
    }

    // Example function that can be called on the challenge contract
    function doSomething() external view returns (string memory) {
        require(msg.sender == owner, "Only the owner can do something.");
        return "Did something!";
    }
}

/**
 * @title Factory Contract
 * @dev Contract that creates and keeps track of challenge contracts
 */
contract Factory {
    // List to keep track of all challenge contract addresses
    address[] public challengeContracts;

    // Event to notify when a new challenge contract is created
    event NewChallengeContract(address indexed challengeAddress, address indexed creator);

    /**
     * @dev Function to create a new challenge contract
     * @return The address of the newly created challenge contract
     */
    function createChallengeContract() public returns (address) {
        // Create a new challenge contract and pass the address of this factory and the msg.sender as the owner
        ChallengeContract challenge = new ChallengeContract(address(this), msg.sender);

        // Store the challenge contract's address
        challengeContracts.push(address(challenge));

        // Emit the contract creation event
        emit NewChallengeContract(address(challenge), msg.sender);

        // Return the address of the new challenge contract
        return address(challenge);
    }

    /**
     * @dev Function to get the number of challenge contracts created
     * @return The number of challenge contracts
     */
    function getChallengeContractCount() public view returns (uint) {
        return challengeContracts.length;
    }
}
