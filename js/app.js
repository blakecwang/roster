
// init global arrays
var dataArr = [],
	teacherArr = [],
	studentArr = [],
	rosterArr = [];


// define replaceAll function
function replaceAll(str, find, replace) {

	return str.replace(new RegExp(find, 'g'), replace);

}


// define 'add student' function
var newStudentElem = $("#table-body").html();
var n = 1;
function addStudent() {
	
	n++;
	var oneStr = 1 + ""; // convert 1 to string
	var studentsStr = n + ""; // convert students to string
	var newStudentElemMod = replaceAll(newStudentElem, oneStr, studentsStr); // replace first string with second

	$("#table-body").append(newStudentElemMod);

}


// define 'add teacher' function
var newTeacherElem = $("#teacher-row").html();
var m = 1;
function addTeacher() {

	m++;
	var oneStr = 1 + ""; // convert 1 to string
	var teachersStr = m + ""; // convert teachers to string
	var newTeacherElemMod = replaceAll(newTeacherElem, oneStr, teachersStr); // replace first string with second

	$("#teacher-row").append(newTeacherElemMod);

}


// define function to get all the data from inputs
function getDataArr() {

	// get student data
    $(".student-input").each(function() {

    	if (this.type === "radio") {
    		if (this.checked === true) {
    			dataArr.push(true);
    		} else {
    			dataArr.push(false);
    		}
    	} else {
    		if ($(this).val() === "") {
    			dataArr.push(undefined);
    		} else {
    			dataArr.push($(this).val());
    		}
    	}

	});


    // get teacher data
	$(".teacher-input").each(function() {

		if ($(this).val() === "") {
			teacherArr.push(undefined);
		} else {
			teacherArr.push($(this).val());
		}

	});

}


// build individual rowArrs to be placed in studentArr
function rowObjBuilder(arr, startIndex) {

	var rowObj = {};


	// define function to set data from text inputs
	function setTextInput(param, index) {

		if (arr[index] != "") {

			rowObj[param] = arr[index];
		
		} else {
		
			rowObj[param] = undefined;
		
		}
	
	}


	// define function to set data from two choice radio groups
	function setTwoChoiceInput(param, index1, index2) {

		if (arr[index1]) {

			rowObj[param] = true;

		} else if (arr[index2]) {

			rowObj[param] = false;

		} else {

			rowObj[param] = undefined;

		}

	}


	// define function to set data from three choice radio groups
	function setThreeChoiceInput(param1, param2, index1, index2, index3) {

		if (arr[index1]) {

			rowObj[param1] = true;
			rowObj[param2] = false;

		} else if (arr[index2]) {

			rowObj[param1] = false;
			rowObj[param2] = true;

		} else if (arr[index3]) {

			rowObj[param1] = false;
			rowObj[param2] = false;

		} else {

			rowObj[param1] = undefined;
			rowObj[param2] = undefined;

		}

	}


	// set text inputs
	setTextInput("name", startIndex);
	setTextInput("separate", startIndex + 1);
	setTextInput("request", startIndex + 2);


	// set two choice inputs
	setTwoChoiceInput("male", startIndex + 3, startIndex + 4);
	setTwoChoiceInput("redDot", startIndex + 5, startIndex + 6);
	setTwoChoiceInput("celdt", startIndex + 7, startIndex + 8);
	setTwoChoiceInput("iep", startIndex + 9, startIndex + 10);
	setTwoChoiceInput("health", startIndex + 11, startIndex + 12);
	setTwoChoiceInput("tk", startIndex + 13, startIndex + 14);


	// set three choice inputs
	setThreeChoiceInput("readingHigh", "readingMid",
		startIndex + 15, startIndex + 16, startIndex + 17);
	setThreeChoiceInput("writingHigh", "writingMid",
		startIndex + 18, startIndex + 19, startIndex + 20);
	setThreeChoiceInput("mathHigh", "mathMid",
		startIndex + 21, startIndex + 22, startIndex + 23);


	return rowObj;

}


// add all individual rowArrs to studentArr
function studentArrBuilder() {

	// get number of rows
	var rows = (dataArr.length - 1) / 22;

	// iterate through rows and add them to studentArr
	for (var i = 0; i < rows; i ++) {

		studentArr.push(rowObjBuilder(dataArr, i * 22));

	}

}


// add rosters to DOM
function displayRosters() {

	// determine number of rows and columns
	var columns = rosterArr.length;
	var rows  = Math.ceil(columns / 3);


	// append rows to DOM
	for (var i = 0; i < rows; i++) {

		var rowElem = "<div class='row' id='r" + i + "'></div>";
		$(".container").append(rowElem);

	}


	// append columns to rows
	for (var j = 0; j < columns; j++) {

		var row = Math.floor(j / 3);

		var rowId = "#r" + row;
		var colElem = "<div class='col-md-4' id='c" + j +"'></div>";
		$(rowId).append(colElem);

	}


	// append headers to columns
	for (var k = 0; k < columns; k++) {

		var letter = String.fromCharCode(k + 97).toUpperCase();
		var headerElem = "<h3>Roster " + letter + "</h3>";
		var colId = "#c" + k;
		$(colId).append(headerElem);

	}


	// append lists to columns
	for (var m = 0; m < columns; m++) {

		var ulElem = "<ul id=u" + m + "></ul>";
		var colId = "#c" + m;
		$(colId).append(ulElem);

		for (var n = 0; n < rosterArr[m].length; n++) {

			var ulId = "#u" + m;
			var studentName = rosterArr[m][n].name;
			var liElem = "<li>" + studentName + "</li>";
			$(ulId).append(liElem);

		}

	}


	// append parameters to columns
	for (var x = 0; x < columns; x++) {

		var boys = 0, girls = 0;
		for (var y = 0; y < rosterArr[x].length; y++) {

			if (rosterArr[x][y].male === true) {
				boys++;
			} else {
				girls++;
			}

		}

		var boyElem = "<h4>Boys: " + boys + "</h4>";
		var girlElem = "<h4>Girls: " + girls + "</h4>";
		var boyGirlElem = boyElem + girlElem;

		var colId = "#c" + x;
		$(colId).append(boyGirlElem);

	}

}


function initRosters(stdntArr, rstrs) {
	
	// function to push students of given param to
	// rosters of rosterArr one at a time (moncola style)
	var rstrIndex = 0;
	function pushStudents(param, bool) {
		
		var i = 0;
		while (i < stdntArr.length) {

			if ((bool && stdntArr[i][param])
				|| (!bool && !stdntArr[i][param])) {

				rosterArr[rstrIndex].push(stdntArr[i]);

				if (rstrIndex < rstrs - 1) {

					rstrIndex++;

				} else {

					rstrIndex = 0;

				}

			}

			i++;

		}

	}


	// init empty rosters
	for (var i = 0; i < rstrs; i++) {

		var emptyArr = [];
		rosterArr.push(emptyArr);

	}


	// push males then females one by one
	pushStudents("male", true);
	pushStudents("male", false);

}

initRosters(testData, testTeacherArr.length);

for (var i = 0; i < rosterArr.length; i++) {
	console.log(rosterArr[i].length);
}



// organize students into balanced rosters
function balanceRosters() {

	// Use these functions to get inputs from table when ready
	// but for now, well just use testData

	// get data from input fields
	// getDataArr();

	// organize that data into studentArr
	// studentArrBuilder();

	// get number of rosters and students
	// var rosters = rosterArr.length;



	// use testData to test functionality
	// DELETE THESE LINES WHEN DONE TESTING APP
	studentArr = testData;
	rosters = testTeacherArr.length;


	// declare some makeRosters level variables
	var fixedParams = ["male"];
	var students = studentArr.length;


	// list parameters to find targets for
	var targetParams = [

		"male",
		"redDot",
		"celdt",
		"iep",
		"health",
		"tk",
		"readingHigh",
		"readingMid",
		"writingHigh",
		"writingMid",
		"mathHigh",
		"mathMid"

	];


	// count students with given param in given array
	function countParams(arr, param) {

		var count = 0;
		for (var i = 0; i < arr.length; i++) {

			if (arr[i][param]) {count++;}

		}

		return count;

	}


	// given a studentID and array of students, return a student object
	function getStudentByID(arr, id) {

		var s = undefined;

		for (var i = 0; i < arr.length; i++) {

			if (arr[i].studentID === id) {

				s = arr[i];

			}
		}

		return s;

	}


	// test whether roster has target number of students
	// for given param
	function testRosterParam(param, tol) {

		var paramCount = 0;

		// count how many students have param = true
		for (var i = 0; i < currentRoster.length; i++) {

			if (currentRoster[i][param]) {

				paramCount++;
			
			}

		}


		// calculate difference and absolute difference
		var diff = paramCount - targets[param];
		var absDiff = Math.abs(diff);

		var low = "L",		// paramCount is lower than target
			high = "H",		// paramCount is higher than target
			nailedIt = "N"; // paramCount is within tolerance to target

		if (absDiff <= tol) {

			return nailedIt;

		} else {

			if (diff > 0) {return high;}
			else {return low;}

		}

	}



}





// add click listeners to buttons
$("#student-button").click(addStudent);
$("#teacher-button").click(addTeacher);
$("#roster-button").click(balanceRosters);











// test how long it takes to do something
// function doSomething() {
	
// }

// var t0 = performance.now();
// doSomething();
// var t1 = performance.now();
// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");



