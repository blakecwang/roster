
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


// function to count number of students with a given parameter
function getTarget(arr, rstrs, param) {

	var counter = 0;
	for (var i = 0; i < arr.length; i++) {

		if (arr[i][param]) {
			counter++;
		}

	}

	var target = Math.round(counter / rstrs);

	if (target === undefined) {
		return 0;
	} else {
		return target;
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


// organize students into balanced rosters
function makeRosters() {

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
	var currentRoster = [];
	var remainingArr = studentArr;
	var fixedParams = ["male"];
	var students = studentArr.length;
	var classSize = Math.round(students / rosters);
	var tradePairs;


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


	// get target number of students of each param
	// and add them to targets
	var targets = {};
	for (var i = 0; i < targetParams.length; i++) {

		var t = getTarget(studentArr, rosters, targetParams[i]);

		targets[targetParams[i]] = t;

	}


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


	// create initial gender-balanced roster from remainingArr
	function initNewRoster() {

		var newRoster = [];
		var maleCount = 0,
			femaleCount = 0;


		// add males until male target is reached
		while (newRoster.length < targets.male) {

			if (remainingArr[maleCount].male) {

				newRoster.push(remainingArr[maleCount]);

			}

			maleCount++;

		}


		// add females until classSize is reached
		while (newRoster.length < classSize) {

			if (!remainingArr[femaleCount].male) {

				newRoster.push(remainingArr[femaleCount]);

			}

			femaleCount++;

		}


		return newRoster;

	}


	// remove given roster from remainingArr
	function removeRoster() {

		var newRemainingArr = [];
		for (var i = 0; i < remainingArr.length; i++) {

			var contains = false;
			for (var j = 0; j < currentRoster.length; j++) {

				if (remainingArr[i].studentID === currentRoster[j].studentID) {

					contains = true;

				}

			}

			if (contains === false) {

				newRemainingArr.push(remainingArr[i]);

			}


		}

		remainingArr = newRemainingArr;

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


	// find trades that get paramCount closer to its target
	// without compromising fixed params
	// - returns an array of arrays of form [studentID1, index1, studentID2, index2]
	function getTradePairs(param, dir) {

		// find all student ID tradePairs that would bring paramCount closer to target
		var idPairs = [],
			passedIDPairs = [];

		for (var i = 0; i < currentRoster.length; i++) {

			for (var j = 0; j < remainingArr.length; j++) {

				var pair = [];

				if (dir === "H") {

					if (currentRoster[i][param] && !remainingArr[j][param]) {

						pair.push(currentRoster[i].studentID);
						// pair.push(i);
						pair.push(remainingArr[j].studentID);
						// pair.push(j);

						idPairs.push(pair);

					}



				} else if (dir === "L") {

					if (!currentRoster[i][param] && remainingArr[j][param]) {

						pair.push(currentRoster[i].studentID);
						// pair.push(i);
						pair.push(remainingArr[j].studentID);
						// pair.push(j);

						idPairs.push(pair);

					}

				}

			}

		}


		// filter out trades that would compromise fixed params
		for (var j = 0; j < idPairs.length; j++) {

			var paramsPassed = 0;
			for (var i = 0; i < fixedParams.length; i++) {

				var p = fixedParams[i];

				var x = idPairs[j][0];
				var y = idPairs[j][1];
				// console.log(x + " " + y);
				var studentX = getStudentByID(currentRoster, x);
				var studentY = getStudentByID(remainingArr, y);
				// var studentX = currentRoster[x];
				// var studentY = currentRoster[y];

				if (studentX[p] === studentY[p]) {

					paramsPassed++;

				}

			}

			if (paramsPassed === fixedParams.length) {

				passedIDPairs.push(idPairs[j]);

			}

		}

		return passedIDPairs;

	}


	// given a pair of studentIDs, trade students between
	// currentRoster and remainingArr
	function trade(pairArr) {

		// get the student objects to be traded and their indices
		// within current arrays
		var studentX = getStudentByID(currentRoster, pairArr[0]);

		var indexX = 0;
		while (currentRoster[indexX].studentID != studentX.studentID) {

			indexX++;
		
		}

		var studentY = getStudentByID(remainingArr, pairArr[1]);
		
		var indexY = 0;
		while (remainingArr[indexY].studentID != studentY.studentID) {

			indexY++;
		
		}


		// remove student objects from their current arrays
		currentRoster.splice(indexX, 1);
		remainingArr.splice(indexY, 1);


		// add student objects to opposite arrays
		currentRoster.push(studentY);
		remainingArr.push(studentX);

		// remove all trades involving those students from tradePairs
		var newTradePairs = [];
		for (var i = 0; i < tradePairs.length; i++) {

			if (tradePairs[i][0] != studentX.studentID
				&& tradePairs[i][0] != studentY.studentID
				&& tradePairs[i][1] != studentX.studentID
				&& tradePairs[i][1] != studentY.studentID) {

				newTradePairs.push(tradePairs[i]);

			}

		}

		tradePairs = newTradePairs;

	}
	

	// balance the current roster on param to as close to
	// target as possible
	function balanceCurrentRoster(param) {

		// test whether the new roster is balanced
		var dirCode = testRosterParam(param, 0);


		// if currentRoster is not balanced on parameter, 
		// trade until it's balanced
		if (dirCode != "N") {

			// create array of tradePairs that would improve given param
			// by moving it in direction indicated by dirCode
			tradePairs = getTradePairs(param, dirCode);
			

			// make trades until balanced
			// var tradePairsIndex = 0;
			var balanced = false;
			var tolerance = 0;
			while (!balanced) {

				// if there are still possible trades with current tolerance...
				if (tradePairs.length > 0) {

					// trade student from currentRoster for student
					// from remainingArr
					trade(tradePairs[tolerance]);


					// test whether currentRoster is balanced on param
					var dirCode = testRosterParam(param, 0);


					// if currentRoster is still not balanced, keep trading...
					if (dirCode === "N") {

						balanced = true;

					} 

				} else {

					// increase tolerance
					tolerance++;

				}

			}

		}

		// console.log(countParams(currentRoster, param));
		// console.log("target: " + targets[param]);

	}


	// create all but the last balanced roster and
	// push them to rosterArr
	for (var i = 0; i < rosters - 1; i++) {

		// set currentRoster to new roster made from remainingArr
		// then remove it from remainingArr
		currentRoster = initNewRoster();
		removeRoster();

		for (var j = targetParams.length - 1; j >= 0; j--) {

			balanceCurrentRoster(targetParams[j]);

		}

		rosterArr.push(currentRoster);

	}


	// push the remaining students to rosterArr
	rosterArr.push(remainingArr);

	displayRosters();

}





// add click listeners to buttons
$("#student-button").click(addStudent);
$("#teacher-button").click(addTeacher);
$("#roster-button").click(makeRosters);











// test how long it takes to do something
// function doSomething() {
	
// }

// var t0 = performance.now();
// doSomething();
// var t1 = performance.now();
// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");



