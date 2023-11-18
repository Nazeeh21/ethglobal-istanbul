// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./ChallengeContract.sol";

/**
 * @title Factory Contract
 * @dev Contract that creates and keeps track of challenge contracts
 */
contract Factory {
    // List to keep track of all deployed child contract
    address[] public challengeContracts;

    // Event to notify when a new challenge contract is created
    event NewChallengeContract(
        address indexed challengeAddress,
        address indexed creator
    );

    /**
     * @dev Function to create a new challenge contract
     * @return The address of the newly created challenge contract
     */
    function createChallengeContract(
        address _owner,
        uint256 _wagerAmount,
        address[] memory _participants,
        address[] memory _judges,
        string memory _activity,
        string memory _completionTimeUnit,
        uint256 _activityPerTimeUnit,
        uint256 _duration
    ) public returns (address) {
        ChallengeContract challenge = new ChallengeContract(
            address(this),
            _owner,
            _wagerAmount,
            _participants,
            _judges,
            _activity,
            _completionTimeUnit,
            _activityPerTimeUnit,
            _duration
        );

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