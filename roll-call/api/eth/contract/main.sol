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

    /**
    function selectAllStudentItem () public view returns(
    	uint[] memory,
    	string[] memory,
    	string[] memory,
    	string[] memory
    	) {
    	Student[] memory result;
    	uint res_size = 0;
    	for (uint i = 0; i < students_index; ++i) {
    		uint student_id = uint_to_id[i];
    		if (contains_student[student_id]) {
    			result[res_size] = students[student_id];
    			res_size++;
    		}
    	}
    	uint[] memory ids;
    	string[] memory names;
		string[] memory classess;
		string[] memory teachers;

    	for (uint i = 0; i < res_size; ++i) {
    		ids[i] = result[i].id;
    		names[i] = result[i].name;
    		classess[i] = result[i].classes;
    		teachers[i] = result[i].teacher;
    	}

    	return (ids, names, classess, teachers);
    }
    */
   /**
   function makeAllStudent () public view returns(
    	string memory
    	) {
   		string memory result_str;
    	for (uint i = 0; i < students_index; ++i) {
    		uint student_id = uint_to_id[i];
    		if (contains_student[student_id]) {
    			Student memory s = students[student_id];

    			string memory s1 = strConcat(getStr(s.id), ",");
    			string memory s2 = strConcat(s.name, ",");
    			string memory s3 = strConcat(s.classes, ",");
    			string memory s4 = strConcat(s.teacher, ",");

    			string memory item_str = 
    				strConcat(strConcat(strConcat(s1, s2), s3), s4);
    			result_str = strConcat(result_str, strConcat(item_str, "\n"));
    		}
    	}

    	return result_str;
    }
    **/
    


    // record
    /**
	struct Record {
		uint id;
		uint date;
		uint number;
		uint absence;
	}
	**/


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