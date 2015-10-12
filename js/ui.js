/*----------------------------------------

DEFINE FUNCTIONS THAT MANIPULATE THE DOM

----------------------------------------*/



// define 'add student' function
var newStudentElem = $("#table-body").html();
var addStudentIndex = 0;
var oneStr = 1 + "";
function addStudent() {
	
	addStudentIndex++;
	
	var studentsStr = (addStudentIndex + 1) + "";
	var newID = "scr" + addStudentIndex;
	newStudentElem = newStudentElem.replace("-scrl-", newID);
	var newStudentElemMod = replaceAll(newStudentElem, oneStr, studentsStr);

	if (addStudentIndex % 2 === 1) {

		var r = newStudentElemMod.replace("-x-", "light-green");
		newStudentElemMod = r;

	}


	$("#table-body").append(newStudentElemMod);


	if (addStudentIndex > 4) {

		var selectID = "#" + newID;
		$(".table-container").scrollTo(selectID);
		$("#table-body").find("tr:last").find("input:first").focus();

	}

}


// define 'add teacher' function
var teacherRowElem = $("#teacher-section").html();
var teacherColElem = $(".teacher-row").html();
var teacherColIndex = 0;
var teacherRowIndex = 0;
var toReplace = " A ";
function addTeacher() {

	teacherColIndex++;
	var newTeacherRowIndex = Math.floor(teacherColIndex / 4 );
	var letter = " " + String.fromCharCode(97 + teacherColIndex).toUpperCase() + " ";
	var colMod = replaceAll(teacherColElem, toReplace, letter);
	var rowMod = replaceAll(teacherRowElem, toReplace, letter);

	// if new rows is higher than old rows...
	if (newTeacherRowIndex > teacherRowIndex) {

		// add a row (including a column)
		$("#teacher-section").append(rowMod);

		teacherRowIndex = newTeacherRowIndex;

	// else, add a column
	} else {

		$(".teacher-row").last().append(colMod);

	}

	if (teacherColIndex > 1) {

		$("#teacher-section").find("input:last").focus();

	}

}


// add rosters to DOM
function displayRosters() {

	// change roster button text
	$("#roster-button").html("Recalculate");


	// append table to DOM
	var tableElem = "<table><tbody id='roster-body'></tbody></table>";
	$("#output-section").append(tableElem);


	// determine number of rows to display rosters
	var colsPerRow = 6;
	var rows  = Math.ceil(ROSTER_ARR.length / colsPerRow);


	// append rows to DOM
	for (var i = 0; i < rows; i++) {

		var rowElem = "<tr id='r" + i + "'></tr>";
		$("#roster-body").append(rowElem);

	}


	// append columns (td's) to rows (tr's)
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		var row = Math.floor(i / colsPerRow);

		var rowId = "#r" + row;
		var colElem = "<td class='roster-col' id='c" + i +"'></td>";
		$(rowId).append(colElem);

	}


	// append headers to columns
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		var tn = ROSTER_ARR[i].teacher.teacherName;
		var letter = String.fromCharCode(97 + i).toUpperCase();
		var headerElem = "<h3 class='roster-header'>(" + letter + ") " + tn + "'s Class</h3>";
		var colId = "#c" + i;
		$(colId).append(headerElem);

	}


	// append lists to ROSTER_ARR.length
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		var ulElem = "<ul id=u" + i + "></ul>";
		var colId = "#c" + i;
		$(colId).append(ulElem);

		for (var j = 0; j < ROSTER_ARR[i].students.length; j++) {

			var ulId = "#u" + i;
			var sn = ROSTER_ARR[i].students[j].studentName;
			var liElem = "<li>" + sn + "</li>";
			$(ulId).append(liElem);

		}

		$(ulId).append("<br>");

	}

	$("#output-section").append("<br><br>");

}


// function to display how many of each param are in each roster
function displayMetrics() {

	var metricsArr = [

		"Class Size",
		"Boys",
		"Girls",
		"Red Dot Students",
		"Students at CELDT Level 1 or 2",
		"Students with IEPs",
		"Students with Health Concerns",
		"Students who attended TK",
		"High-Level Reading Students",
		"Mid-Level Reading Students",
		"Low-Level Reading Students",
		"High-Level Writing Students",
		"Mid-Level Writing Students",
		"Low-Level Writing Students",
		"High-Level Math Students",
		"Mid-Level Math Students",
		"Low-Level Math Students"

	];


	// append table to DOM
	var tableElem = "<div class='row'><table id='metrics-table'>"
		+ "<tbody id='metrics-body'><tr id='first-row' class='dark-green'>"
		+ "</tr></tbody></table></div>";
	$("#output-section").append(tableElem);


	// center the table
	var tableWidth = 240 + (40 * TEACHER_ARR.length);
	var tableMargin = (1200 - tableWidth) / 2;
	$("#metrics-table").css("width", tableWidth);
	$("#metrics-table").css("margin-left", tableMargin);


	// add first (empty) column to label row
	$("#first-row").append("<td class='first-col'></td>");


	// add the rest of teh columns to label row
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		var letter = String.fromCharCode(97 + i).toUpperCase();
		var labelElem = "<td class='m-width'><p class='bolded'>" + letter + "</p></td>";

		$("#first-row").append(labelElem);

	}


	// function to convert a count into a td elem
	function elementize(count) {

		var elem = "<td class='m-width'><p>" + count + "</p></td>";
		return elem;

	}


	// append rows and metrics labels to table
	for (var i = 0; i < metricsArr.length; i++) {

		var rowElem = "<tr class='-c-' id='tr" + i + "'><td class='first-col bolded'>"
			+ metricsArr[i] + "</td></tr>";

		if (i % 2 === 1) {

			var r = rowElem.replace("-c-", "light-green");
			rowElem = r;

		}

		$("#metrics-body").append(rowElem);

	}


	// loop through rosters appending counts row by row
	for (var i = 0; i < ROSTER_ARR.length; i++) {


		// create some vars for counting
		var classSize = 0,
			boys = 0,
			girls = 0,
			reddots = 0,
			celdts = 0,
			ieps = 0,
			healths = 0,
			tks = 0,
			readingHighs = 0, readingMids = 0, readingLows = 0,
			writingHighs = 0, writingMids = 0, writingLows = 0,
			mathHighs = 0, mathMids = 0, mathLows = 0;
			

		// loop through the current roster and count params
		for (var j = 0; j < ROSTER_ARR[i].students.length; j++) {

			var currentStudent = ROSTER_ARR[i].students[j];


			// get class size
			classSize++;
 

			// count boys and girls
			if (currentStudent.male) {
				boys++;
			} else {
				girls++;
			}


			// count red dots
			if (currentStudent.redDot) {
				reddots++;
			}


			// count CELDTs
			if (currentStudent.celdt) {
				celdts++;
			}


			if (currentStudent.iep) {
				ieps++;
			}


			if (currentStudent.health) {
				healths++;
			}


			if (currentStudent.tk) {
				tks++;
			}


			if (currentStudent.readingHigh) {
				readingHighs++;
			} else if (currentStudent.readingMid) {
				readingMids++;
			} else {
				readingLows++;
			}


			if (currentStudent.writingHigh) {
				writingHighs++;
			} else if (currentStudent.writingMid) {
				writingMids++;
			} else {
				writingLows++;
			}


			if (currentStudent.mathHigh) {
				mathHighs++;
			} else if (currentStudent.mathMid) {
				mathMids++;
			} else {
				mathLows++;
			}

		}

		$("#tr0").append(elementize(classSize));
		$("#tr1").append(elementize(boys));
		$("#tr2").append(elementize(girls));
		$("#tr3").append(elementize(reddots));
		$("#tr4").append(elementize(celdts));
		$("#tr5").append(elementize(ieps));
		$("#tr6").append(elementize(healths));
		$("#tr7").append(elementize(tks));
		$("#tr8").append(elementize(readingHighs));
		$("#tr9").append(elementize(readingMids));
		$("#tr10").append(elementize(readingLows));
		$("#tr11").append(elementize(writingHighs));
		$("#tr12").append(elementize(writingMids));
		$("#tr13").append(elementize(writingLows));
		$("#tr14").append(elementize(mathHighs));
		$("#tr15").append(elementize(mathMids));
		$("#tr16").append(elementize(mathLows));

	}

    var recalcButtonDiv = "<br><div class='row centered'><button id='recalc-button' type='button' class='dark-green bolded'>"
        + "Recalculate</button></div>";
    $("#output-section").append(recalcButtonDiv);
  

	$("#output-section").append("<div style='height: 300px''></div>");


	var scrlPosition = 740 + (Math.ceil(TEACHER_ARR.length / 4) * 30);
	// var scrlPosition = 800;
	$("body").scrollTo(scrlPosition);

}


// add some teachers and student rows to start with
$("#teacher-section").find("input:last").focus();
addTeacher();
for (var i = 0; i < 4; i++) {

	addStudent();

}




// add click listeners to buttons
$("#student-button").click(addStudent);
$("#teacher-button").click(addTeacher);
$("#roster-button").click(initApp);
$("#recalc-button").click(initApp);