// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataStore {
    struct Data {
        uint id;
        string name;
        string info;
    }

    mapping(uint => Data) public dataRecords;
    uint public dataCount;

    function storeData(uint _id, string memory _name, string memory _info) public {
        dataRecords[dataCount] = Data(_id, _name, _info);
        dataCount++;
    }

    function getData(uint _index) public view returns (uint, string memory, string memory) {
        Data memory record = dataRecords[_index];
        return (record.id, record.name, record.info);
    }
}
