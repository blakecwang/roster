var initApp = function() {

	var self = this;

	// define replaceAll function
	this.replaceAll = function(str, find, replace) {

		return str.replace(new RegExp(find, 'g'), replace);

	};


	// define 'add student' function
	var newStudentElem = $("#table-body").html();
	var students = 1;
	this.addStudent = function() {
		
		students++;

		var oneStr = 1 + ""; // convert 1 to string
		var studentsStr = students + ""; // convert students to string
		var newStudentElemMod = self.replaceAll(newStudentElem, oneStr, studentsStr); // replace first string with second

		$("#table-body").append(newStudentElemMod);

	};


	// define 'make rosters' function

	this.makeRosters = function() {

		// put each row's information in an array
		// put each rowArray into big array

		// get number of classes to be sorted into
		var classes = $("#classes").val();


		var dataArr = [];
	    $("input").each(function() {

	    	if (this.type === "radio") {
	    		if (this.checked === true) {
	    			dataArr.push($(this).val());
	    		}
	    	} else {
	    		dataArr.push($(this).val());
	    	}

		});

		console.log(dataArr);


	};


	// add click listeners to buttons

	$("#student-button").click(self.addStudent);
	$("#roster-button").click(self.makeRosters);




};


initApp();






















// // ---------- MODEL ---------- //

// // priorities
// // 1 = absolutely must be true
// // 2 = important
// // 3 = nice to have

// var headers = [
// 	{
// 		"header": "Name",
// 		"id": "name",
// 		"priority": 2,
// 		"inputType": "text"
// 	},
// 	{
// 		"header": "Gender",
// 		"id": "gender",
// 		"priority": 2,
// 		"inputType": "binary"
// 	},
// 	{
// 		"header": "Reading",
// 		"id": "reading",
// 		"priority": 2,
// 		"inputType": "text"
// 	},
// 	{
// 		"header": "Writing",
// 		"id": "writing",
// 		"priority": 2,
// 		"inputType": "text"
// 	},
// 	{
// 		"header": "Math",
// 		"id": "math",
// 		"priority": 2,
// 		"inputType": "text"
// 	},
// 	{
// 		"header": "Red Dot",
// 		"id": "red-dot",
// 		"priority": 2,
// 		"inputType": "text"
// 	},
// 	{
// 		"header": "IEP",
// 		"id": "iep",
// 		"priority": 2,
// 		"inputType": "text"
// 	},
// 	{
// 		"header": "Health Concerns",
// 		"id": "health",
// 		"priority": 2,
// 		"inputType": "text"
// 	},
// 	{
// 		"header": "Attended TK",
// 		"id": "tk",
// 		"priority": 2,
// 		"inputType": "text"
// 	},
// 	{
// 		"header": "Teacher Requested",
// 		"id": "teacher",
// 		"priority": 2,
// 		"inputType": "text"
// 	},
// 	{
// 		"header": "Separate From",
// 		"id": "separate",
// 		"priority": 2,
// 		"inputType": "text"
// 	}
// ];

// var initHeaders = function() {

// 	var headerElem = "<tr>";

// 	for (var i = 0; i < headers.length; i++) {

// 		var header = headers[i].header;
// 		var id = headers[i].id;

// 		headerElem += "<th id=" + id + ">" + header + "</th>";

// 	}

// 	headerElem += "</tr>";

// 	$("#headers").append(headerElem);
// };


// var addStudent = function() {

// 	var newStudentElem = "<tr>";

// 	// add name input
// 	newStudentElem += "<td><input type='text'></td>";

// 	// add gender input
// 	newStudentElem += 

// 	for (var i = 0; i < headers.length; i++) {

// 		newStudentElem += "<td><input type='radio'>Fart</td>";
		
// 	}

// 	newStudentElem += "</tr>";

// 	$("#headers").append(newStudentElem);
// };


// initHeaders();
// addStudent();