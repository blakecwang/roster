/*----------------------------------------

CREATE BALANCED ROSTERS

----------------------------------------*/



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


// trade given students between given arrays
function trade(stu1, stu2) {

	// get location of students by their studentID
	var rosterIndex1, studentsIndex1,
		rosterIndex2, studentsIndex2;
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		for (var j = 0; j < ROSTER_ARR[i].students.length; j++) {

			if (ROSTER_ARR[i].students[j].studentID === stu1.studentID) {

				rosterIndex1 = i;
				studentsIndex1 = j;

			}

			if (ROSTER_ARR[i].students[j].studentID === stu2.studentID) {

				rosterIndex2 = i;
				studentsIndex2 = j;

			}

		}

	}


	// get student objects
	var studentObj1 = ROSTER_ARR[rosterIndex1].students[studentsIndex1];
	var studentObj2 = ROSTER_ARR[rosterIndex2].students[studentsIndex2];


	// splice them into opposite rosters
	ROSTER_ARR[rosterIndex1].students.splice(studentsIndex1, 1, studentObj2);
	ROSTER_ARR[rosterIndex2].students.splice(studentsIndex2, 1, studentObj1);

}


// function to create roster objects with teachers assigned
function initRosterObj() {

	// init rosters with teachers but no students
	for (var i = 0; i < TEACHER_ARR.length; i++) {

		var newRoster = {};
		newRoster.teacher = TEACHER_ARR[i];
		newRoster.students = [];
		// newRoster.rosterID = i;

		ROSTER_ARR.push(newRoster);

	}

}


// function to pupulate roster objects with students such that 
// they are gender-balanced
function populateRosters() {

	// split male and female students into separate arrays
	var maleStudents = [],
		femaleStudents = [],
		rstrSelector = 0;
	for (var i = 0; i < STUDENT_ARR.length; i++) {

		if (STUDENT_ARR[i].male) {

			maleStudents.push(STUDENT_ARR[i]);

		} else {

			femaleStudents.push(STUDENT_ARR[i]);

		}

	}


	// push male students to rosters moncola style
	for (var i = 0; i < maleStudents.length; i++) {

		// add student object to roster and remove it from unassigned
		ROSTER_ARR[rstrSelector].students.push(maleStudents[i]);
		

		// cycle rstrSelector through rosters
		if (rstrSelector < TEACHER_ARR.length - 1) {

			rstrSelector++;

		} else {

			rstrSelector = 0;

		}

	}


	// push female students to rosters moncola style
	for (var i = 0; i < femaleStudents.length; i++) {

		// add student object to roster and remove it from unassigned
		ROSTER_ARR[rstrSelector].students.push(femaleStudents[i]);
		

		// cycle rstrSelector through rosters
		if (rstrSelector < TEACHER_ARR.length - 1) {

			rstrSelector++;

		} else {

			rstrSelector = 0;

		}

	}

}


// function to trade students with teacher requests into
// requested rosters without affecting gender balance
function honorRequests() {

	// find students with and without teacher requests and
	// place them in separate arrays 
	var withRequests = [],
		rosterIndices = [];
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		for (var j = 0; j < ROSTER_ARR[i].students.length; j++) {

			if (ROSTER_ARR[i].students[j].request != undefined) {

				withRequests.push(ROSTER_ARR[i].students[j]);
				rosterIndices.push(i);

			}
		
		}

	}


	// trade students with requests into appropriate rosters
	for (var i = 0; i < withRequests.length; i++) {

		// test if the student is in the requested roster
		var requestedTeacher = withRequests[i].request;
		var rosterTeacher = ROSTER_ARR[rosterIndices[i]].teacher.teacherName;
		if (!isEquiv(requestedTeacher, rosterTeacher)) {

			// find the right roster
			var rosterIndex;
			for (var j = 0; j < ROSTER_ARR.length; j++) {

				if (ROSTER_ARR[j].teacher.teacherName === requestedTeacher) {

					rosterIndex = j;

				}

			}


			// find student to trade that is same gender and does not have request
			var studentIndex = 0,
				tradeStudent = ROSTER_ARR[rosterIndex].students[studentIndex];
			while (tradeStudent.male != withRequests[i].male
				|| tradeStudent.request != undefined) {

				studentIndex++;
				tradeStudent = ROSTER_ARR[rosterIndex].students[studentIndex];

			}


			// trade students
			trade(withRequests[i], tradeStudent);

		}

	}

}


// function to separate designated students
function separateStudents() {

	// find all students with separate from defined
	var withSeparateFroms = [],
		rosterIndices = [];
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		for (var j = 0; j < ROSTER_ARR[i].students.length; j++) {

			var s = ROSTER_ARR[i].students[j];
			if (s.separate != undefined) {

				withSeparateFroms.push(s);
				rosterIndices.push(i);

			}

		}

	}


	// loop through all the students with separate defined
	for (var i = 0; i < withSeparateFroms.length; i++) {

		// test whether separate param has conflict
		var sep = withSeparateFroms[i].separate,
			roster = ROSTER_ARR[rosterIndices[i]].students;
			t = false;
		for (var j = 0; j < roster.length; j++) {

			if (isEquiv(sep, roster[j].studentName)) {

				t = true;

			}

		}


		// if student is in same roster as separate param, trade it out
		// without affecting gender balance or teacher requests
		if (t) {

			var tradeStudentIndex = 0;
			while (STUDENT_ARR[tradeStudentIndex].male != withSeparateFroms[i].male
				|| STUDENT_ARR[tradeStudentIndex].request != undefined) {

				tradeStudentIndex++;

			}


			trade(withSeparateFroms[i], STUDENT_ARR[tradeStudentIndex]);

		}

	}

}


// function to count how many students of
// each param are in each roster
function getParamCounts(param) {

	var countArr = [];


	// function to count students with given param in given array
	function countParams(arr) {

		var count = 0;
		for (var i = 0; i < arr.length; i++) {

			if (arr[i][param]) {count++;}

		}

		return count;

	}


	// loop through rosters and count the number of students
	// with given param
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		var c = countParams(ROSTER_ARR[i].students);
		countArr.push(c);

	}


	return countArr;

}


// function to get target numbers for each param
function getParamTargets() {

	// find number of rosters to divide by
	var rosters = TEACHER_ARR.length;


	// count students of each param
	for (var i = 0; i < PARAMS.length; i++) {

		var count = 0;
		for (var j = 0; j < STUDENT_ARR.length; j++) {

			if (STUDENT_ARR[j][PARAMS[i]]) {

				count++;

			}

		}


		// calculate targets for each param and add them to PARAM_TARGETS
		PARAM_TARGETS[PARAMS[i]] = Math.round(count / rosters);

	}

}


// function to get all trades that don't compromise
// gender balance, teacher requests, or separate froms
function getLegalTrades() {

	// get all legal trade pairs and push them to LEGAL_TRADES array
	for (var i = 0; i < STUDENT_ARR.length - 1; i++) {

		var x = STUDENT_ARR[i];

		for (var j = i + 1; j < STUDENT_ARR.length; j++) {

			var y = STUDENT_ARR[j];

			if (x.request === undefined
				&& y.request === undefined
				&& x.separate === undefined
				&& y.separate === undefined
				&& x.male === y.male) {

				var pair  = [x, y];
				LEGAL_TRADES.push(pair);

			}

		}

	}

}


// function to organize students into balanced rosters
function balanceRosters() {

	getParamTargets();
	getParamCounts();
	getLegalTrades();

	var lockedParams = ["male"];

	// loop through params and balance them
	for (var i = 0; i < PARAMS.length; i++) {

		var currentParam = PARAMS[i];

		// get an array of the counts for reach roster
		// of currentParam
		var currentCounts = getParamCounts(currentParam);




	}



}


// function to get the whole thing started
function initApp() {

	// FOR TESTING ONLY!! - hook up app to testData
	TEACHER_ARR = testTeacherArr;
	STUDENT_ARR = testStudentArr;


	// calling functions!
	initRosterObj();
	populateRosters();
	honorRequests();
	separateStudents();
	balanceRosters();
	getLegalTrades();


}
















// test how long it takes to do something
// function doSomething() {
	
// }

// var t0 = performance.now();
// doSomething();
// var t1 = performance.now();
// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");



