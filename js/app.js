/*----------------------------------------

CREATE BALANCED ROSTERS

----------------------------------------*/


// function to count students with given param in given array
function countParams(arr, param) {

	var count = 0;
	for (var i = 0; i < arr.length; i++) {

		if (arr[i][param]) {count++;}

	}

	return count;

}


// function to return student object, given studentID
function getStudentByID(id) {

	var s = undefined;

	for (var i = 0; i < STUDENT_ARR.length; i++) {

		if (STUDENT_ARR[i].studentID === id) {

			s = STUDENT_ARR[i];

		}
	}

	return s;

}


// function to return student object, given studentName
function getStudentByName(name) {

	var s = undefined;

	for (var i = 0; i < STUDENT_ARR.length; i++) {

		if (isEquiv(STUDENT_ARR[i].studentName, name)) {

			s = STUDENT_ARR[i];

		}

	}

	return s;

}


// function to return teacher object, given teacherID
function getTeacherByID(id) {

	var t = undefined;

	for (var i = 0; i < TEACHER_ARR.length; i++) {

		if (TEACHER_ARR[i].teacherID === id) {

			t = TEACHER_ARR[i];

		}
	}

	return t;

}


// function to return teacher object, given teacherName
function getStudentByName(name) {

	var t = undefined;

	for (var i = 0; i < TEACHER_ARR.length; i++) {

		if (isEquiv(TEACHER_ARR[i].teacherName, name)) {

			t = TEACHER_ARR[i];

		}

	}

	return t;

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


// function to push males and females to rosters
// in ROSTER_ARR moncola style
function initRosterObj() {

	// init rosters with teachers set but no students
	for (var i = 0; i < TEACHER_ARR.length; i++) {

		var newRoster = {};
		newRoster.teacher = TEACHER_ARR[i];
		newRoster.students = [];
		// newRoster.rosterID = i;

		ROSTER_ARR.push(newRoster);

	}


	// declare local array of students to be
	// placed into rosters
	var unassigned = STUDENT_ARR;


	// get students with teacher requests, place them
	// into an array and remove them from unassigned
	var studentsWithRequests = [];
	for (var i = 0; i < unassigned.length; i++) {

		if (unassigned[i].request != undefined) {

			studentsWithRequests.push(unassigned[i]);
			unassigned.splice(i, 1);

		}

	}


	// place students from studentsWithRequests into
	// appropriate rosters
	for (var i = 0; i < studentsWithRequests.length; i++) {

		// get the name of each students requested teacher
		var requestedTeacher = studentsWithRequests[i].request;
		
		// loop through all the rosters
		for (var j = 0; j < ROSTER_ARR.length; j++) {

			// get the name of the teacher assigned to roster
			var rosterTeacher = ROSTER_ARR[j].teacher.teacherName;
			
			// if the rquested teacher matches the roster teacher...
			if (isEquiv(requestedTeacher, rosterTeacher)) {

				// add student to roster
				ROSTER_ARR[j].students.push(studentsWithRequests[i]);

			}

		}

	}


	// fill the rest of the students into rosters
	// such that the are gender balanced

	// count how many students in each roster and add those
	// counts to studentCounts array
	var studentCounts = [];
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		var s = ROSTER_ARR[i].students.length;
		studentCounts.push(s);

	}


	// count how many males in each roster and add those
	// counts to maleCounts array
	var maleCounts = [];
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		var c = countParams(ROSTER_ARR[i].students, "male");
		maleCounts.push(c);

	}

	// console.log(studentCounts);
	// console.log(maleCounts);

	// add males until all rosters have the same
	// number of males

	var malesEqualized = false;
	function equalizehMales() {

		// find the the highest number of males in any roster
		var highestMaleCount = findHighest(maleCounts);

		var e = true;

		// loop through maleCounts
		for (var i = 0; i < maleCounts.length; i++) {

			if (maleCounts[i] < highestMaleCount) {

				e = false;

				// get the index of the next male in unassigned
				var nextMaleIndex = 0;
				// console.log(unassigned[nextMaleIndex]);

				while (!unassigned[nextMaleIndex].male) {
					
					nextMaleIndex++;

				}

				// push that student to the roster and remove
				// it from unassigned
				ROSTER_ARR[i].students.push(unassigned[nextMaleIndex]);

				unassigned.splice(nextMaleIndex, 1);
				maleCounts[i] = maleCounts[i] + 1;


			}

		}

		if (e) {
		
			malesEqualized = true;

		}

	}


	// execute equalizeMales until males are equalized
	while (!malesEqualized) {

		equalizehMales();

	}


	// add females until all rosters have the same
	// number of students


	// add males moncola style


	// add females moncola style




	// function to push students of given param to
	// rosters of ROSTER_ARR one at a time (moncola style)
	var rstrIndex = 0;
	function pushMaleStudents(bool) {
		
		var i = 0;
		while (i < STUDENT_ARR.length) {

			if ((bool && STUDENT_ARR[i]["male"])
				|| (!bool && !STUDENT_ARR[i]["male"])) {

				ROSTER_ARR[rstrIndex]["students"].push(STUDENT_ARR[i]);

				if (rstrIndex < TEACHER_ARR.length - 1) {

					rstrIndex++;

				} else {

					rstrIndex = 0;

				}

			}

			i++;

		}

	}


	// push males then females one by one
	// pushMaleStudents(true);
	// pushMaleStudents(false);

}


// function to organize students into balanced rosters
function balanceRosters() {

}


// function to get the whole thing started
function initApp() {

	// FOR TESTING ONLY!! - hook up app to testData
	TEACHER_ARR = testTeacherArr;
	STUDENT_ARR = testStudentArr;


	// create initial rosters with separates, requests,
	// and balanced gender
	initRosterObj();

	// console.log(ROSTER_ARR);
	var counts = [];
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		var count = countParams(ROSTER_ARR[i].students, "male");
		counts.push(count);

	}

	console.log(counts);

}
















// test how long it takes to do something
// function doSomething() {
	
// }

// var t0 = performance.now();
// doSomething();
// var t1 = performance.now();
// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");



