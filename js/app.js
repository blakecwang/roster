// ---------- MODEL ---------- //

// priorities
// 1 = absolutely must be true
// 2 = important
// 3 = nice to have

var headers = [
	{
		"header": "Gender",
		"id": "gender",
		"priority": 2
	},
	{
		"header": "Reading",
		"id": "reading",
		"priority": 2
	},
	{
		"header": "Writing",
		"id": "writing",
		"priority": 2
	},
	{
		"header": "Math",
		"id": "math",
		"priority": 2
	},
	{
		"header": "Red Dot",
		"id": "red-dot",
		"priority": 2
	},
	{
		"header": "IEP",
		"id": "iep",
		"priority": 2
	},
	{
		"header": "Teacher Requested",
		"id": "teacher",
		"priority": 2
	},
	{
		"header": "Health Concerns",
		"id": "health",
		"priority": 2
	},
	{
		"header": "Attended TK",
		"id": "tk",
		"priority": 2
	},
	{
		"header": "Separate From",
		"id": "separate",
		"priority": 2
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

	for (var i = 0; i < headers.length; i++) {

		// newStudentElem += "<td><input type='text'></td>"
		newStudentElem += "<td>5</td>";
		
	}

	newStudentElem += "</tr>";

	$("#headers").append(newStudentElem);
};


initHeaders();
addStudent();