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







// function to remove student from given array by ID
function removeStudent(arr, stu) {

	// declare new array
	var newArr = arr;


	// find index of student within that array
	var index = 0;
	while (newArr[index].studentID != stu.studentID) {

		index++;

	}


	// remove the student from the array
	newArr.splice(index, 1);


	return newArr;

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
// requested rosters
function honorRequests() {


}


// function to separate designated students
function separateStudents() {


}


// function to get target numbers for each param and add
// them to PARAM_TARGETS
function getTargets() {

	for (var i = 0; i < ROSTER_ARR.length; i++) {

		// declare a target object for each roster
		var targetObj = {};

		for (var j = 0; j < PARAMS.length; j++) {

			// count each param for each roster
			targetObj[PARAMS[j]] = countParams(ROSTER_ARR[i].students, [PARAMS[j]]);

		}

		PARAM_TARGETS.push(targetObj);

	}
// 
}


// function to organize students into balanced rosters
function balanceRosters() {

}



// function to get the whole thing started
function initApp() {

	// FOR TESTING ONLY!! - hook up app to testData
	TEACHER_ARR = testTeacherArr;
	STUDENT_ARR = testStudentArr;


	
	initRosterObj();
	populateRosters();


	// add target numbers to PARAM_TARGETS
	// getTargets();


	console.log(ROSTER_ARR[0].students[0].studentName);
	console.log(ROSTER_ARR[1].students[0].studentName);

	// trade something
	var s1 = ROSTER_ARR[0].students[0];
	var s2 = ROSTER_ARR[1].students[0];
	trade(s1, s2);

	console.log(ROSTER_ARR[0].students[0].studentName);
	console.log(ROSTER_ARR[1].students[0].studentName);


	// log the number of males and females in each roster
	// var mCounts = [],
	// 	fCounts = [];
	// for (var i = 0; i < ROSTER_ARR.length; i++) {

	// 	var mCount = countParams(ROSTER_ARR[i].students, "male");
	// 	var fCount = ROSTER_ARR[i].students.length - mCount;
	// 	mCounts.push(mCount);
	// 	fCounts.push(fCount);

	// }

	// console.log(fCounts);
	// console.log(mCounts);

	// var sCount = 0;
	// for (var i = 0; i < ROSTER_ARR.length; i++) {
	// 	for (var j = 0; j < ROSTER_ARR[i].students.length; j++) {
	// 		sCount++;
	// 	}
	// }
	// console.log(sCount + " students are accounted for");
	// console.log(ROSTER_ARR);


}
















// test how long it takes to do something
// function doSomething() {
	
// }

// var t0 = performance.now();
// doSomething();
// var t1 = performance.now();
// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");



