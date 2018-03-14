pragma solidity ^0.4.18;
contract Snipbin {
    
    mapping(address => string) private accRecords;
    address private owner;
    uint minimumPay = 10 finney;
    
    function Snipbin() public {
        owner = msg.sender;
    }
    modifier payedMinimum {
        require(msg.value >= minimumPay);
        _;
    }
    modifier ownerOnly {
        require(msg.sender == owner);
        _;
    }
    function editSnippet(string snippet) payable payedMinimum public {
        owner.transfer(msg.value);
        accRecords[msg.sender] = snippet;
    }
    function getSnippet(address addr) public returns (string) {
        return accRecords[addr];
    }
    function setMinimum(uint amtWei) ownerOnly public {
        minimumPay = amtWei;
    }
}