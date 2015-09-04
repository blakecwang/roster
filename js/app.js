var initApp = function() {

	var self = this;

	// init arrays in app level scope
	var dataArr = [];
	var masterArr = [];

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


	// define function to get all the data from inputs
	this.getDataArr = function() {

	    $("input").each(function() {

	    	if (this.type === "radio") {
	    		if (this.checked === true) {
	    			dataArr.push("checked");
	    		} else {
	    			dataArr.push("unchecked");
	    		}
	    	} else {
	    		dataArr.push($(this).val());
	    	}

		});
	};


	// build individual rowArrs to be placed in masterArr
	this.rowArrBuilder = function(arr, startIndex) {

		var rowArr = [];

		// push name
		rowArr.push(arr[startIndex]);

		// push gender
		if (arr[startIndex + 1] === "checked") {
			rowArr.push("male");
		} else if (arr[startIndex + 2] === "checked"){
			rowArr.push("female");
		} else {
			rowArr.push("");
		}

		// push reading
		if (arr[startIndex + 3] === "checked") {
			rowArr.push("high");
		} else if (arr[startIndex + 4] === "checked") {
			rowArr.push("mid");
		} else if (arr[startIndex + 5] === "checked") {
			rowArr.push("low");
		} else {
			rowArr.push("");
		}

		// push writing
		if (arr[startIndex + 6] === "checked") {
			rowArr.push("high");
		} else if (arr[startIndex + 7] === "checked") {
			rowArr.push("mid");
		} else if (arr[startIndex + 8] === "checked") {
			rowArr.push("low");
		} else {
			rowArr.push("");
		}

		// push math
		if (arr[startIndex + 9] === "checked") {
			rowArr.push("high");
		} else if (arr[startIndex + 10] === "checked") {
			rowArr.push("mid");
		} else if (arr[startIndex + 11] === "checked") {
			rowArr.push("low");
		} else {
			rowArr.push("");
		}

		// push red dot
		if (arr[startIndex + 12] === "checked") {
			rowArr.push("yes");
		} else if (arr[startIndex + 13] === "checked"){
			rowArr.push("no");
		} else {
			rowArr.push("");
		}

		// push IEP
		if (arr[startIndex + 14] === "checked") {
			rowArr.push("yes");
		} else if (arr[startIndex + 15] === "checked"){
			rowArr.push("no");
		} else {
			rowArr.push("");
		}

		// push health concerns
		if (arr[startIndex + 16] === "checked") {
			rowArr.push("yes");
		} else if (arr[startIndex + 17] === "checked"){
			rowArr.push("no");
		} else {
			rowArr.push("");
		}

		// push TK
		if (arr[startIndex + 18] === "checked") {
			rowArr.push("yes");
		} else if (arr[startIndex + 19] === "checked"){
			rowArr.push("no");
		} else {
			rowArr.push("");
		}

		// push teacher requests
		rowArr.push(arr[startIndex + 20]);

		// push separate from
		rowArr.push(arr[startIndex + 21]);

		return rowArr;
	};


	// add all individual rowArrs to masterArr
	this.masterArrBuilder = function() {

		// get number of rows
		var rows = (dataArr.length - 1) / 22;

		// iterate through rows and add them to masterArr
		for (var i = 0; i < rows; i ++) {

			masterArr.push(rowArrBuilder(dataArr, i * 22));

		}
	};


	// organize students into balanced rosters
	this.makeRosters = function() {

		// get data from input fields
		self.getDataArr();

		// organize that data into masterArr
		self.masterArrBuilder();

		// get number of rosters and students
		var rosters = dataArr[dataArr.length - 1];
		var students = masterArr.length;

		// get number of male students
		var males = 0;
		for (var i = 0; i < students; i++) {
			if (masterArr[i][1] === "male") {
				males++;
			}
		}

		console.log(males);

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