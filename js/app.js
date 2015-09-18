
// init global arrays
var dataArr = [],
	masterArr = [],
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
var newTeacherElem = $("#teacher-input").html();
var m = 1;
function addTeacher() {

	m++;
	var oneStr = 1 + ""; // convert 1 to string
	var teachersStr = m + ""; // convert teachers to string
	var newTeacherElemMod = replaceAll(newTeacherElem, oneStr, teachersStr); // replace first string with second

	$("#teacher-input").append(newTeacherElemMod);

}


// define function to get all the data from inputs
function getDataArr() {

    $("input").each(function() {

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

}


// build individual rowArrs to be placed in masterArr
function rowObjBuilder(arr, startIndex) {

	var rowObj = {};

	// push name
	rowObj.name = arr[startIndex];

	// push gender
	if (arr[startIndex + 1]) {
		rowObj.gender = "male";
	} else if (arr[startIndex + 2]){
		rowObj.gender = "female";
	} else {
		rowObj.gender = undefined;
	}

	// push reading
	if (arr[startIndex + 3]) {
		rowObj.reading = "high";
	} else if (arr[startIndex + 4]) {
		rowObj.reading = "mid";
	} else if (arr[startIndex + 5]) {
		rowObj.reading = "low";
	} else {
		rowObj.reading = undefined;
	}

	// push writing
	if (arr[startIndex + 6]) {
		rowObj.writing = "high";
	} else if (arr[startIndex + 7]) {
		rowObj.writing = "mid";
	} else if (arr[startIndex + 8]) {
		rowObj.writing = "low";
	} else {
		rowObj.writing = undefined;
	}

	// push math
	if (arr[startIndex + 9]) {
		rowObj.math = "high";
	} else if (arr[startIndex + 10]) {
		rowObj.math = "mid";
	} else if (arr[startIndex + 11]) {
		rowObj.math = "low";
	} else {
		rowObj.math = undefined;
	}

	// push red dot
	if (arr[startIndex + 12]) {
		rowObj.redDot = true;
	} else if (arr[startIndex + 13]){
		rowObj.redDot = false;
	} else {
		rowObj.redDot = undefined;
	}

	// push IEP
	if (arr[startIndex + 14]) {
		rowObj.iep = true;
	} else if (arr[startIndex + 15]){
		rowObj.iep = false;
	} else {
		rowObj.iep = undefined;
	}

	// push health concerns
	if (arr[startIndex + 16]) {
		rowObj.health = true;
	} else if (arr[startIndex + 17]){
		rowObj.health = false;
	} else {
		rowObj.health = undefined;
	}

	// push TK
	if (arr[startIndex + 18]) {
		rowObj.tk = true;
	} else if (arr[startIndex + 19]){
		rowObj.tk = false;
	} else {
		rowObj.tk = undefined;
	}

	// push teacher requests
	rowObj.teacher = arr[startIndex + 20];

	// push separate from
	rowObj.separate = arr[startIndex + 21];

	return rowObj;

}


// add all individual rowArrs to masterArr
function masterArrBuilder() {

	// get number of rows
	var rows = (dataArr.length - 1) / 22;

	// iterate through rows and add them to masterArr
	for (var i = 0; i < rows; i ++) {

		masterArr.push(rowObjBuilder(dataArr, i * 22));

	}

}


// create first roster with balanced gender
function initRoster(inputArr, inputRosters) {

	// create outputArr
	var outputArr = [];

	// get number of students in inputArr
	var students = inputArr.length;

	// get number of males in inputArr
	var males = 0;
	for (var i = 0; i < students; i++) {

		if (inputArr[i].gender = "male") {
			males++;
		}

	}

	// calculate number of students per gender per roster
	var studentsPerRoster = Math.floor(students / inputRosters);
	var malesPerRoster = Math.floor(males / inputRosters);
	var femalesPerRoster = studentsPerRoster - malesPerRoster;

	// add males to outputArr
	var maleCounter = 0;
	for (var j = 0; j < students; j++) {

		if (inputArr[j].gender === "male" &&
			maleCounter < malesPerRoster) {

			outputArr.push(inputArr[j]);

		}

	}

	// add females to outputArr
	var femaleCounter = 0;
	for (var k = 0; k < students; k++) {

		if (inputArr[k].gender === "female" &&
			femaleCounter < femalesPerRoster) {

			outputArr.push(inputArr[k]);

		}

	}

	return outputArr;

}


// function to count number of students with a given parameter
function paramTargetCounter(arr, rstrs, param, val) {

	var counter = 0;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i][param] === val) {
			counter++;
		}

	}

	// var target = Math.round(counter / rstrs);

	return counter;

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
	but for now, we'll just use testData

	// get data from input fields
	getDataArr();

	// organize that data into masterArr
	masterArrBuilder();

	// get number of rosters and students
	var rosters = dataArr[dataArr.length - 1];

*/

	// use testData to test functionality
	// masterArr = testData;
	// rosters = testRosters;


	// // get total nnumber of students
	// var students = masterArr.length;

	// // get target number of students of each param per roster
	// var maleTarget = paramTargetCounter(masterArr, rosters, "gender", "male");
	// var readingHighTarget = paramTargetCounter(masterArr, rosters, "reading", "high");
	// var readingMidTarget = paramTargetCounter(masterArr, rosters, "reading", "mid");
	// var writingHighTarget = paramTargetCounter(masterArr, rosters, "writing", "high");
	// var writingMidTarget = paramTargetCounter(masterArr, rosters, "writing", "mid");
	// var mathHighTarget = paramTargetCounter(masterArr, rosters, "math", "high");
	// var mathMidTarget = paramTargetCounter(masterArr, rosters, "math", "mid");
	// var mathMidTarget = paramTargetCounter(masterArr, rosters, "math", "mid");
	// var redDotTarget = paramTargetCounter(masterArr, rosters, "redDot", true);
	// var iepTarget = paramTargetCounter(masterArr, rosters, "iep", true);
	// var healthTarget = paramTargetCounter(masterArr, rosters, "health", true);
	// var tkTarget = paramTargetCounter(masterArr, rosters, "tk", true);

	// console.log(maleTarget);
	// console.log(readingHighTarget);
	// console.log(readingMidTarget);
	// console.log(writingHighTarget);
	// console.log(writingMidTarget);
	// console.log(mathHighTarget);
	// console

	// // add empty rosters to rosterArr
	// for (var i = 0; i < rosters; i++) {

	// 	var r = [];
	// 	rosterArr.push(r);

	// }


	// displayRosters();


}





// add click listeners to buttons
$("#student-button").click(addStudent);
$("#teacher-button").click(addTeacher);
$("#roster-button").click(makeRosters);















// STRATEGY
// create one roster with balanced gender
// test for parameter x
// if x is low, switch out students with x=false for
//		those with x=true until x is balanced
// if x is high, do the opposite
// test for parameter y
// if y is low, switch out students with y=false for
//		those with y=true that don't change x until y is balanced
// if y is high, do the opposite

// balanced-tolerance can be a function of 






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
		
// 		if (masterArr[j].gender === sex) {

// 			rosterArr[rosterPicker].push(masterArr[j]);

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