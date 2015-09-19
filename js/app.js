
// init global arrays
var dataArr = [],
	teacherArr = [],
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


// build individual rowArrs to be placed in masterArr
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
function getTarget(arr, rstrs, param) {

	var counter = 0;
	for (var i = 0; i < arr.length; i++) {

		if (arr[i][param]) {
			counter++;
		}

	}

	var target = Math.round(counter / rstrs);
	console.log(target);
	return target;

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

	// // get total nnumber of students
	// var students = masterArr.length;

	// use testData to test functionality
	masterArr = testData;
	rosters = testRosters;


	// get target number of students of each param per roster
	var maleTarget = getTarget(masterArr, rosters, "male");
	var redDotTarget = getTarget(masterArr, rosters, "redDot");
	var celdtTarget = getTarget(masterArr, rosters, "celdt");
	var iepTarget = getTarget(masterArr, rosters, "iep");
	var healthTarget = getTarget(masterArr, rosters, "health");
	var tkTarget = getTarget(masterArr, rosters, "tk");
	var readingHighTarget = getTarget(masterArr, rosters, "readingHigh");
	var readingMidTarget = getTarget(masterArr, rosters, "readingMid");
	var writingHighTarget = getTarget(masterArr, rosters, "writingHigh");
	var writingMidTarget = getTarget(masterArr, rosters, "writingMid");
	var mathHighTarget = getTarget(masterArr, rosters, "mathHigh");
	var mathMidTarget = getTarget(masterArr, rosters, "mathMid");


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