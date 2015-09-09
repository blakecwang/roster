
// init arrays in app level scope
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
		rowObj.reddot = true;
	} else if (arr[startIndex + 13]){
		rowObj.reddot = false;
	} else {
		rowObj.reddot = undefined;
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



// organize students into balanced rosters
function makeRosters() {

	// get data from input fields
	getDataArr();

	// organize that data into masterArr
	masterArrBuilder();

	// get number of rosters and students
	var rosters = dataArr[dataArr.length - 1];
	var students = masterArr.length;

	// add empty rosters to rosterArr
	for (var i = 0; i < rosters; i++) {

		var r = [];
		rosterArr.push(r);

	}

	// add one male student to each array repeatedly
	// until all male students are accounted for
	var rosterPicker = 0;
	for (var j = 0; j < students; j++) {

		if (masterArr[j].gender === "male") {
			rosterArr[rosterPicker].push(masterArr[j]);
		}

		if (rosterPicker < rosters) {
			rosterPicker++;
		} else {
			rosterPicker = 0;
		}

	}





	// console.log(masterArr);






}


// add click listeners to buttons
$("#student-button").click(self.addStudent);
$("#roster-button").click(self.makeRosters);




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