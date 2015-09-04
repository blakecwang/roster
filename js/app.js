
// init arrays in app level scope
var dataArr = [];
var masterArr = [];

// define replaceAll function
function replaceAll(str, find, replace) {

	return str.replace(new RegExp(find, 'g'), replace);
};


// define 'add student' function
var newStudentElem = $("#table-body").html();
var students = 1;
function addStudent() {
	
	students++;

	var oneStr = 1 + ""; // convert 1 to string
	var studentsStr = students + ""; // convert students to string
	var newStudentElemMod = self.replaceAll(newStudentElem, oneStr, studentsStr); // replace first string with second

	$("#table-body").append(newStudentElemMod);
};


// define function to get all the data from inputs
function getDataArr() {

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
function rowObjBuilder(arr, startIndex) {

	var rowObj = {};

	// push name
	rowObj.name = arr[startIndex];

	// push gender
	if (arr[startIndex + 1] === "checked") {
		rowObj.gender = "male";
	} else if (arr[startIndex + 2] === "checked"){
		rowObj.gender = "female";
	} else {
		rowObj.gender = "";
	}

	// push reading
	if (arr[startIndex + 3] === "checked") {
		rowObj.reading = "high";
	} else if (arr[startIndex + 4] === "checked") {
		rowObj.reading = "mid";
	} else if (arr[startIndex + 5] === "checked") {
		rowObj.reading = "low";
	} else {
		rowObj.reading = "";
	}

	// push writing
	if (arr[startIndex + 6] === "checked") {
		rowObj.writing = "high";
	} else if (arr[startIndex + 7] === "checked") {
		rowObj.writing = "mid";
	} else if (arr[startIndex + 8] === "checked") {
		rowObj.writing = "low";
	} else {
		rowObj.writing = "";
	}

	// push math
	if (arr[startIndex + 9] === "checked") {
		rowObj.math = "high";
	} else if (arr[startIndex + 10] === "checked") {
		rowObj.math = "mid";
	} else if (arr[startIndex + 11] === "checked") {
		rowObj.math = "low";
	} else {
		rowObj.math = "";
	}

	// push red dot
	if (arr[startIndex + 12] === "checked") {
		rowObj.reddot = "yes";
	} else if (arr[startIndex + 13] === "checked"){
		rowObj.reddot = "no";
	} else {
		rowObj.reddot = "";
	}

	// push IEP
	if (arr[startIndex + 14] === "checked") {
		rowObj.iep = "yes";
	} else if (arr[startIndex + 15] === "checked"){
		rowObj.iep = "no";
	} else {
		rowObj.iep = "";
	}

	// push health concerns
	if (arr[startIndex + 16] === "checked") {
		rowObj.health = "yes";
	} else if (arr[startIndex + 17] === "checked"){
		rowObj.health = "no";
	} else {
		rowObj.health = "";
	}

	// push TK
	if (arr[startIndex + 18] === "checked") {
		rowObj.tk = "yes";
	} else if (arr[startIndex + 19] === "checked"){
		rowObj.tk = "no";
	} else {
		rowObj.tk = "";
	}

	// push teacher requests
	rowObj.teacher = arr[startIndex + 20];

	// push separate from
	rowObj.separate = arr[startIndex + 21];

	return rowObj;
};


// add all individual rowArrs to masterArr
function masterArrBuilder() {

	// get number of rows
	var rows = (dataArr.length - 1) / 22;

	// iterate through rows and add them to masterArr
	for (var i = 0; i < rows; i ++) {

		masterArr.push(rowObjBuilder(dataArr, i * 22));

	}

};


// organize students into balanced rosters
function makeRosters() {

	// get data from input fields
	getDataArr();

	// organize that data into masterArr
	masterArrBuilder();

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

	console.log(masterArr);

};


// add click listeners to buttons
$("#student-button").click(self.addStudent);
$("#roster-button").click(self.makeRosters);




// SORTING STRATEGY

// loop through all students
// if they are male, add them to rosters one by one
// then, if they are not male, add them to rosters one by one