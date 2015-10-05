/*----------------------------------------

DEFINE FUNCTIONS THAT MANIPULATE THE DOM

----------------------------------------*/



// define 'add student' function
var newStudentElem = $("#table-body").html();
var addStudentIndex = 1;
function addStudent() {
	
	addStudentIndex++;
	var oneStr = 1 + ""; // convert 1 to string
	var studentsStr = addStudentIndex + ""; // convert students to string
	var newStudentElemMod = replaceAll(newStudentElem, oneStr, studentsStr); // replace first string with second

	$("#table-body").append(newStudentElemMod);

}


// define 'add teacher' function
var newTeacherElem = $("#teacher-row").html();
var addTeacherIndex = 1;
function addTeacher() {

	addTeacherIndex++;
	var oneStr = 1 + ""; // convert 1 to string
	var teachersStr = addTeacherIndex + ""; // convert teachers to string
	var newTeacherElemMod = replaceAll(newTeacherElem, oneStr, teachersStr); // replace first string with second

	$("#teacher-row").append(newTeacherElemMod);

}


// add rosters to DOM
function displayRosters() {

	// determine number of rows to display rosters
	var rows  = Math.ceil(ROSTER_ARR.length / 3);


	// append rows to DOM
	for (var i = 0; i < rows; i++) {

		var rowElem = "<div class='row' id='r" + i + "'></div>";
		$(".container").append(rowElem);

	}


	// append ROSTER_ARR.length to rows
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		var row = Math.floor(i / 3);

		var rowId = "#r" + row;
		var colElem = "<div class='col-md-4' id='c" + i +"'></div>";
		$(rowId).append(colElem);

	}


	// append headers to ROSTER_ARR.length
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		var tn = ROSTER_ARR[i].teacher.teacherName;
		var headerElem = "<h3>" + tn + "'s Class:</h3>";
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

	}


	// append parameters to ROSTER_ARR.length
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		// count params
		var boys = 0,
			girls = 0,
			reddots = 0,
			celdts = 0,
			ieps = 0,
			healths = 0,
			tks = 0,
			readingHighs = 0, readingMids = 0, readingLows = 0,
			writingHighs = 0, writingMids = 0, writingLows = 0,
			mathHighs = 0, mathMids = 0, mathLows = 0;
			

		for (var j = 0; j < ROSTER_ARR[i].students.length; j++) {

			var currentStudent = ROSTER_ARR[i].students[j];

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

		

		// append boys and girls
		var boyGirlElem = "<h4>" + boys + " boys, " + girls + " girls</h4>";
		var redDotElem = "<h4>" + reddots + " red dots";
		var celdtElem = "<h4>" + celdts + " students at CELDT level 1 or 2";
		var iepElem = "<h4>" + ieps + " students with IEP's";
		var healthElem = "<h4>" + healths + " students with health concerns";
		var tkElem = "<h4>" + tks + " students who attended TK";
		var readingElem = "<h4>" + readingHighs + " high-level readers, "
							+ readingMids + " mid-level readers, "
							+ readingLows + " low-level readers</h4>";
		var writingElem = "<h4>" + writingHighs + " high-level writers, "
							+ writingMids + " mid-level writers, "
							+ writingLows + " low-level writers</h4>";
		var mathElem = "<h4>" + mathHighs + " high-level math students, "
							+ mathMids + " mid-level math students, "
							+ mathLows + " low-level math students</h4>";




		var colId = "#c" + i;
		var paramElem = boyGirlElem
						+ redDotElem
						+ celdtElem
						+ iepElem
						+ healthElem
						+ tkElem
						+ readingElem
						+ writingElem
						+ mathElem;
		$(colId).append(paramElem);

	}

}


// add click listeners to buttons
$("#student-button").click(addStudent);
$("#teacher-button").click(addTeacher);
$("#roster-button").click(initApp);