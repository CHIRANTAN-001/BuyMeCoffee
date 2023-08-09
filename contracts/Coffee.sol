// SPDX-License-Identifier: KIT
// ^ The SPDX-License-Identifier specifies the license under which the code is released. In this case, it's a placeholder "KIT" license.

pragma solidity ^0.8.0;
// ^ The pragma statement indicates the version of the Solidity compiler that should be used for compilation.


/**
 * @title Coffee Memo Contract
 * @dev This contract allows users to submit coffee-related memos along with payments to the contract owner.
 */
contract coffee {
     // ^ This contract facilitates the creation and retrieval of coffee-related memos.

    /**
     * @dev Structure to store memo information.
     */
    struct Memo {
        string name;       // Name of the memo sender.
        string message;    // Content of the memo.
        uint timestamp;    // Timestamp when the memo was created.
        address from;      // Address of the sender.
    }

    /**
     * @dev Array to store memo records.
     */
    Memo[] memos;
    // ^ A dynamic array that will hold instances of the "Memo" struct.

    address payable owner;
    // ^ Address of the contract owner.

    /**
     * @dev Contract constructor.
     * Initializes the contract owner with the address of the deployer.
     */
    constructor() {
        owner = payable (msg.sender);
    }

    /**
     * @dev Function to purchase coffee and submit a memo.
     * @param name The name of the sender submitting the memo.
     * @param message The content of the memo.
     * @notice Users must send a payment greater than 0 ether along with the memo.
     */
    function buyCoffee(string memory name, string memory message) public payable {
        
        require(msg.value > 0, "Please pay greater than 0 ether");
        // ^ Ensures users send a payment greater than 0 ether along with the memo.
        
        owner.transfer(msg.value);
        // ^ Transfers the received payment to the contract owner.
        
        memos.push(Memo(name, message, block.timestamp, msg.sender));
        // ^ Adds the submitted memo to the "memos" array.
    }

    /**
     * @dev Function to retrieve all submitted memos.
     * @return An array of memo structures containing name, message, timestamp, and sender address.
     */
    function getMemos() public view returns(Memo[] memory) {
        return memos;
        // ^ Returns the array of submitted memos.
    }

}