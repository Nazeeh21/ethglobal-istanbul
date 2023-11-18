// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

/**
 * @title Challenge Contract
 */

contract ChallengeContract {
    address public factory; // Address of the factory that created the challenge contract
    address public owner; // Owner of the challenge contract

    // Challenge data structure
    struct Challenge {
        address factory;
        address owner;
        uint256 wagerAmount;
        address[] participants;
        address[] judges;
        string activity;
        string completionTimeUnit;
        uint256 activityPerTimeUnit;
        uint256 duration;
        mapping(address => uint256) deposits;
        ChallengeState state;
    }

    // State of the challenge
    enum ChallengeState { Open, Active, Finished }

    // Challenge instance
    Challenge private challenge;

    // Events
    event ChallengeContractCreated(address challengeAddress, address owner);
    event Deposit(address indexed participant, uint256 amount);
    event ChallengeStarted();
    event ChallengeFinished(address indexed winner);
    
    // Constructor
    constructor(
        address _factory,
        address _owner,
        uint256 _wagerAmount,
        address[] memory _participants,
        address[] memory _judges,
        string memory _activity,
        string memory _completionTimeUnit,
        uint256 _activityPerTimeUnit,
        uint256 _duration
    ) {
        require(_participants.length > 0, "At least one participant required");
        require(_judges.length > 0, "At least one judge required");
        challenge.factory = _factory;
        challenge.owner = _owner;
        challenge.wagerAmount = _wagerAmount;
        challenge.participants = _participants;
        challenge.judges = _judges;
        challenge.activity = _activity;
        challenge.completionTimeUnit = _completionTimeUnit;
        challenge.activityPerTimeUnit = _activityPerTimeUnit;
        challenge.duration = _duration;
        challenge.state = ChallengeState.Open;
        
        emit ChallengeContractCreated(address(this), _owner);
    }
    
    // Modifiers
    modifier onlyParticipant() {
        require(isParticipant(msg.sender), "Caller is not a participant");
        _;
    }

    modifier onlyJudge() {
        require(isJudge(msg.sender), "Caller is not a judge");
        _;
    }

    modifier inState(ChallengeState _state) {
        require(challenge.state == _state, "Challenge in wrong state");
        _;
    }
    
    // Deposit the wager amount
    function depositWager() external payable onlyParticipant inState(ChallengeState.Open) {
        require(msg.value == challenge.wagerAmount, "Incorrect wager amount");

        challenge.deposits[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);

        // Check if all participants have deposited and change the state to Active.
        if (allParticipantsDeposited()) {
            challenge.state = ChallengeState.Active;
            emit ChallengeStarted();
        }
    }
    
    // Check whether the caller is a participant
    function isParticipant(address _addr) public view returns (bool) {
        return contains(challenge.participants, _addr);
    }
    
    // Check whether the caller is a judge
    function isJudge(address _addr) public view returns (bool) {
        return contains(challenge.judges, _addr);
    }
    
    // Function to declare the winner
    function declareWinner(address _winner) external onlyJudge inState(ChallengeState.Active) {
        require(isParticipant(_winner), "Winner must be a participant");

        challenge.state = ChallengeState.Finished;
        uint256 prizePool = address(this).balance;
        
        // Transfer the prize pool to the winner
        (bool success, ) = _winner.call{ value: prizePool }("");
        require(success, "Transfer to winner failed");

        emit ChallengeFinished(_winner);
    }
    
    // Utility function to check if an address is in an array of addresses
    function contains(address[] memory array, address _addr) internal pure returns (bool) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == _addr) {
                return true;
            }
        }
        return false;
    }

    // Checks if all participants have deposited the wager amount
    function allParticipantsDeposited() internal view returns (bool) {
        for (uint256 i = 0; i < challenge.participants.length; i++) {
            if (challenge.deposits[challenge.participants[i]] < challenge.wagerAmount) {
                return false;
            }
        }
        return true;
    }

    // Allow users to recover their wagers in case of a challenge cancellation or abnormal condition
    function recoverWager() external onlyParticipant inState(ChallengeState.Open) {
        uint256 depositedAmount = challenge.deposits[msg.sender];
        require(depositedAmount > 0, "No deposit to recover");

        challenge.deposits[msg.sender] = 0;
        (bool success, ) = msg.sender.call{ value: depositedAmount }("");
        require(success, "Transfer failed");
    }

    // Fallback function to prevent sending Ether directly to the contract
    receive() external payable {
        revert("Cannot send ETH directly");
    }
}

