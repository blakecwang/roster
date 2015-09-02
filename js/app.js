// ---------- MODEL ---------- //

// priorities
// 1 = absolutely must be true
// 2 = important
// 3 = nice to have

var headers = [
	{
		"header": "Name",
		"id": "name",
		"priority": 2,
		"inputType": "text"
	},
	{
		"header": "Gender",
		"id": "gender",
		"priority": 2,
		"inputType": "binary"
	},
	{
		"header": "Reading",
		"id": "reading",
		"priority": 2,
		"inputType": "text"
	},
	{
		"header": "Writing",
		"id": "writing",
		"priority": 2,
		"inputType": "text"
	},
	{
		"header": "Math",
		"id": "math",
		"priority": 2,
		"inputType": "text"
	},
	{
		"header": "Red Dot",
		"id": "red-dot",
		"priority": 2,
		"inputType": "text"
	},
	{
		"header": "IEP",
		"id": "iep",
		"priority": 2,
		"inputType": "text"
	},
	{
		"header": "Health Concerns",
		"id": "health",
		"priority": 2,
		"inputType": "text"
	},
	{
		"header": "Attended TK",
		"id": "tk",
		"priority": 2,
		"inputType": "text"
	},
	{
		"header": "Teacher Requested",
		"id": "teacher",
		"priority": 2,
		"inputType": "text"
	},
	{
		"header": "Separate From",
		"id": "separate",
		"priority": 2,
		"inputType": "text"
	}
];

var initHeaders = function() {

	var headerElem = "<tr>";

	for (var i = 0; i < headers.length; i++) {

		var header = headers[i].header;
		var id = headers[i].id;

		headerElem += "<th id=" + id + ">" + header + "</th>";

	}

	headerElem += "</tr>";

	$("#headers").append(headerElem);
};


var addStudent = function() {

	var newStudentElem = "<tr>";

	// add name input
	newStudentElem += "<td><input type='text'></td>";

	// add gender input
	newStudentElem += 

	for (var i = 0; i < headers.length; i++) {

		newStudentElem += "<td><input type='radio'>Fart</td>";
		
	}

	newStudentElem += "</tr>";

	$("#headers").append(newStudentElem);
};


initHeaders();
addStudent();