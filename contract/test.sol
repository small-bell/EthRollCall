// SPDX-License-Identifier: GPL-3.0

pragma experimental ABIEncoderV2;
pragma solidity >=0.7.0 <0.9.0;

/**
 * 点名合约
 */
contract RollCallContract {
	// student
	struct Student {
		uint id;
		string name;
		string classes;
		string teacher;
	}

	mapping (uint => Student) private students;
	mapping (uint => bool) private contains_student;
	mapping (uint => uint) private uint_to_id;
	uint private students_index = 0;

    function addStudent (
    	uint id,
		string memory name,
		string memory classes,
		string memory teacher) public returns(bool res) {
    	assert (!contains_student[id]);
    	Student memory student = Student({
    		id: id,
			name: name,
			classes: classes,
			teacher: teacher
		});
    	students[id] = student;
    	contains_student[id] = true;
    	uint_to_id[students_index] = id;
    	students_index++;
    	return true;
    }

    function deleteStudent (
    	uint id) public returns(bool res) {
    	assert (contains_student[id]);
    	contains_student[id] = false;
    	return true;
    }

    function updateStudent (
    	uint id,
		string memory name,
		string memory classes,
		string memory teacher) public returns(bool res) {
    	assert (contains_student[id]);
    	Student memory student = Student({
    		id: id,
			name: name,
			classes: classes,
			teacher: teacher
		});
    	students[id] = student;
    	return true;
    }

    function selectOneStudentName (uint id) 
    	public view returns(string memory) {
		assert (contains_student[id]);
    	return students[id].name;
    }

	string private all_student; 

	function setAllStudents (string memory content) public 
			returns(bool res) {
    	all_student = content;
    	return true;
    }

	function selectAllStudents () public view 
			returns(string memory) {
    	return all_student;
    }






    mapping (uint => string) private in_records;
    mapping (uint => string) private absence_records;


    function addInStudent (
    	uint date,
		string memory content) public returns(bool res) {
    	in_records[date] = content;
    	return true;
    }

 	function addAbsStudent (
    	uint date,
		string memory content) public returns(bool res) {
    	absence_records[date] = content;
    	return true;
    }

    function selectInStudent (
    	uint date) public view returns(string memory res) {
    	return in_records[date];
    }

 	function selectAbsStudent (
    	uint date) public view returns(string memory res) {
    	return absence_records[date];
    }

    function strConcat(string memory _a, string memory _b) 
    	internal pure returns (string memory){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        string memory ret = new string(_ba.length + _bb.length );
        bytes memory bret = bytes(ret);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++)bret[k++] = _ba[i];
        for (uint i = 0; i < _bb.length; i++) bret[k++] = _bb[i];
        return string(ret);
   } 

   	function uintToBytes(uint256 x) internal pure returns (bytes memory b) {
        b = new bytes(32);
        assembly { mstore(add(b, 32), x) }
    }

    function getStr(uint content) internal pure returns (string memory s) {
        bytes memory c = uintToBytes(content);
        return string(c);
    }
}