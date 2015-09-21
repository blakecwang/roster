
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

			if (rosterArr[x][y].gender === "male") {
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

/*	Use these functions to get inputs from table when ready
	but for now, well just use testData

	// get data from input fields
	getDataArr();

	// organize that data into studentArr
	studentArrBuilder();

	// get number of rosters and students
	var rosters = rosterArr.length;

*/


	// use testData to test functionality
	// DELETE THESE LINES WHEN DONE TESTING APP
	studentArr = testData;
	rosters = testTeacherArr.length;

	// count params - FOR TESTING
	function countParams(arr, param) {
		var count = 0;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i][param]) {count++;}
		}
		return param + ": " + count;
	}


	// declare some makeRosters level variables
	var currentRoster = [];
	var remainingArr = studentArr;
	var fixedParams = ["male"];
	var students = studentArr.length;
	var classSize = Math.round(students / rosters);


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


	// given a studentID and array of students, return a student object
	function getStudentByID(arr, index) {

		var s = undefined;

		for (var i = 0; i < arr.length; i++) {

			if (arr[i].studentID === index) {

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
	function removeRoster(rstr) {

		var newRemainingArr = [];
		for (var i = 0; i < remainingArr.length; i++) {

			var contains = false;
			for (var j = 0; j < rstr.length; j++) {

				if (remainingArr[i].studentID === rstr[j].studentID) {

					contains = true;

				}

			}

			if (contains = false) {

				newRemainingArr.push

			}


		}

		remainingArr = newRemainingArr;

	}


	// test whether roster has target number of students
	// for given param
	function testRosterParam(rstr, param, tol) {

		var paramCount = 0;

		// count how many students have param = true
		for (var i = 0; i < rstr.length; i++) {

			if (rstr[i][param]) {

				paramCount++;
			
			}

		}


		// calculate difference and absolute difference
		var diff = paramCount - targets[param];
		var absDiff = Math.abs(diff);

		var low = "L",		// paramCount is lower than target
			high = "H",		// paramCount is higher than target
			nailedIt = "N"; // paramCount is equal to target

		if (absDiff <= tol) {

			return nailedIt;

		} else {

			if (diff > 0) {return high;}
			else {return low;}

		}

	}


	// find trades that get paramCount closer to its target
	// without compromising fixed params
	// function findTradePairs(param, dir) {

	// 	// find all student ID pairs that would bring paramCount closer to target
	// 	var idPairs = [],
	// 		passedIDPairs = [];

	// 	for (var i = 0; i < currentRoster.length; i++) {

	// 		for (var j = 0; j < remainingArr.length; j++) {

	// 			var pair = [];

	// 			if (dir === "H") {

	// 				if (currentRoster[i][param] && !remainingArr[j][param]) {

	// 					pair.push(currentRoster[i].studentID);
	// 					pair.push(remainingArr[j].studentID);

	// 					idPairs.push(pair);

	// 				}



	// 			} else {

	// 				if (!currentRoster[i][param] && remainingArr[j][param]) {

	// 					pair.push(currentRoster[i].studentID);
	// 					pair.push(remainingArr[j].studentID);

	// 					idPairs.push(pair);

	// 				}

	// 			}

	// 		}

	// 	}


	// 	// filter out trades that would compromise fixed params
	// 	for (var j = 0; j < idPairs.length; j++) {

	// 		var paramsPassed = 0;
	// 		for (var i = 0; i < fixedParams.length; i++) {

	// 			var p = fixedParams[i];

	// 			var x = idPairs[j][0];
	// 			var y = idPairs[j][1];

	// 			var studentX = getStudentByID(currentRoster, x);
	// 			var studentY = getStudentByID(remainingArr, y);

	// 			if (studentX[p] === studentY[p]) {

	// 				paramsPassed++;

	// 			}

	// 		}

	// 		if (paramsPassed === fixedParams.length) {

	// 			passedIDPairs.push(idPairs[j]);

	// 		}

	// 	}

	// 	return passedIDPairs;

	// }



	function findTradePairs(param, dir) {

		//find trades tat would move param closer to target
		var idPairs = [];
		for (var i = 0; i < currentRoster.length; i++) {

			for (var j = 0; j < remainingArr.length; j++) {

				if (dir === "H") {

					if (currentRoster[i][param] === true
						&& remainingArr[j][param] === false) {

						var pair = [];
						pair.push(currentRoster[i].studentID);
						pair.push(remainingArr[j].studentID);
						idPairs.push(pair);

					}

				} else {

					if (currentRoster[i][param] === false
						&& remainingArr[j][param] === true) {

						var pair = [];
						pair.push(currentRoster[i].studentID);
						pair.push(remainingArr[j].studentID);
						idPairs.push(pair);

					}

				}

			}

		}

		return idPairs;

	}


	// given a pair of studentIDs, trade students between
	// currentRoster and remainingArr
	function trade(pairArr) {

		// find the student objects to be traded
		var studentX = getStudentByID(currentRoster, pairArr[0]);
		var studentY = getStudentByID(remainingArr, pairArr[1]);


		// find indices of those objets within their current arrays
		var indexX = 0;
		while (studentX.studentID != currentRoster[indexX].studentID) {

			indexX++;

		}

		var indexY = 0;
		while (studentY.studentID != remainingArr[indexY].studentID) {

			indexY++;

		}


		// remove student objects from their current arrays
		currentRoster.splice(indexX, 1);
		remainingArr.splice(indexY, 1);


		// add student objects to opposite arrays
		currentRoster.push(studentY);
		remainingArr.push(studentX);

	}





	// set currentRoster to new roster made from remainingArr
	currentRoster = initNewRoster();
	removeRoster(currentRoster);
	// var balanced = false;

	// var z = findTradePairs("male", "H");
	// console.log(z);

	console.log(currentRoster.length);
	console.log(remainingArr.length);


	// console.log(countParams(currentRoster, "redDot"));
	// console.log("target: " + targets["redDot"]);

	// // test whether the new roster is balanced
	// var dirCode = testRosterParam(currentRoster, "redDot", 0);

	// // depending on the dirCode, do noting or trade
	// // until balanced === true
	// if (dirCode === "N") {

	// 	balanced = true;

	// } else {

	// 	var pairs = findTradePairs(currentRoster, "redDot", dirCode);

	// 	var pairIndex = 0;
	// 	while (balanced === false) {

	// 		trade(pairs[pairIndex]);

	// 		dirCode = testRosterParam(currentRoster, "redDot", 0);

	// 		if (dirCode === "N") {

	// 			balanced = true;

	// 		}

	// 		pairIndex++;

	// 	}

	// }

	




	console.log(countParams(currentRoster, "redDot"));
	console.log("target: " + targets["redDot"]);


}





// add click listeners to buttons
$("#student-button").click(addStudent);
$("#teacher-button").click(addTeacher);
$("#roster-button").click(makeRosters);















// STRATEGY
// move in order of highest to lowest priority
// create rosters one at a time
// start with gender balanced roster
// make trades to improve params with widening tolerances




// test how long it takes to do something
// function doSomething() {
	
// }

// var t0 = performance.now();
// doSomething();
// var t1 = performance.now();
// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");






// function permutator(inputArr) {

// 	var results = [];

// 	function permute(arr, memo) {
// 	var cur, memo = memo || [];

// 		for (var i = 0; i < arr.length; i++) {

// 			cur = arr.splice(i, 1);

// 			if (arr.length === 0) {

// 				results.push(memo.concat(cur));

// 			}

// 			permute(arr.slice(), memo.concat(cur));

// 			arr.splice(i, 0, cur[0]);
// 		}

// 		return results;

// 	}

// 	return permute(inputArr);

// }





// add students to rosters by sex
// function populateRosters(sex) {
	
// 	for (var j = 0; j < students; j++) {
		
// 		if (studentArr[j].gender === sex) {

// 			rosterArr[rosterPicker].push(studentArr[j]);

// 			if (rosterPicker < rosters - 1) {
// 				rosterPicker++;
// 			} else {
// 				rosterPicker = 0;
// 			}

// 		}

// 	}

// }

// var rosterPicker = 0;
// populateRosters("male");
// populateRosters("female");