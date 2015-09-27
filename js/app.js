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
// function testRosterParam(param, tol) {

// 	var paramCount = 0;

// 	// count how many students have param = true
// 	for (var i = 0; i < currentRoster.length; i++) {

// 		if (currentRoster[i][param]) {

// 			paramCount++;
		
// 		}

// 	}


// 	// calculate difference and absolute difference
// 	var diff = paramCount - targets[param];
// 	var absDiff = Math.abs(diff);

// 	var low = "L",		// paramCount is lower than target
// 		high = "H",		// paramCount is higher than target
// 		nailedIt = "N"; // paramCount is within tolerance to target

// 	if (absDiff <= tol) {

// 		return nailedIt;

// 	} else {

// 		if (diff > 0) {return high;}
// 		else {return low;}

// 	}

// }


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
function trade(rstrIndex1, rstrIndex2, stu1, stu2) {

	// declare new arrays
	var newArr1 = ROSTER_ARR[rstrIndex1].students;
	var newArr2 = ROSTER_ARR[rstrIndex2].students;


	// push student objects to opposite arrays
	newArr1.push(stu2);
	newArr2.push(stu1);


	// remove student objects from original ararys
	newArr1 = removeStudent(newArr1, stu1);
	newArr1 = removeStudent(newArr2, stu2);


	// set roster arrays to new arrays
	ROSTER_ARR[rstrIndex1].students = newArr1;
	ROSTER_ARR[rstrIndex2].students = newArr2;

}


// function to push males and females to rosters
// in ROSTER_ARR moncola style
function initRosterObj() {

	// declare local array of students to be
	// placed into rosters
	var unassigned = STUDENT_ARR;


	// init rosters with teachers set but no students
	for (var i = 0; i < TEACHER_ARR.length; i++) {

		var newRoster = {};
		newRoster.teacher = TEACHER_ARR[i];
		newRoster.students = [];
		// newRoster.rosterID = i;

		ROSTER_ARR.push(newRoster);

	}


	// assign students with teacher requests in an array
	var studentsWithRequests = [],
		newUnassigned = [];
	for (var i = 0; i < unassigned.length; i++) {
		
		// if student has a request...
		if (unassigned[i].request != undefined) {

			// add student object to studentsWithRequests
			studentsWithRequests.push(unassigned[i]);

		} else {

			// add student object to newUnaassigned
			newUnassigned.push(unassigned[i]);

		}

	}
	unassigned = newUnassigned;


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


	// count how many males and females in each roster and add those
	// counts to maleCounts and femaleCounts arrays
	var maleCounts = [],
		femaleCounts = [];
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		var m = countParams(ROSTER_ARR[i].students, "male");
		maleCounts.push(m);
		femaleCounts.push(ROSTER_ARR[i].students.length - m)

	}


	// split male and female students into individual arrays to be
	// looped through separately
	var unassignedMales = [],
		unassignedFemales = [];
	for (var i = 0; i < unassigned.length; i++) {

		if (unassigned[i].male) {

			unassignedMales.push(unassigned[i]);

		} else {

			unassignedFemales.push(unassigned[i]);

		}

	}


	// kill unassigned so I don't try to use it later
	unassigned = [];


	// function to add students from unassigned into rosters
	// until all rosters have equal number of males
	var malesEqualized = false,
		removeTheseMales = [];
	function equalizeMales() {

		// find the the highest number of males in any roster
		var highestMaleCount = findHighest(maleCounts);

		var e = true,
			nextMaleIndex = 0;

		// loop through maleCounts
		for (var i = 0; i < maleCounts.length; i++) {

			if (maleCounts[i] < highestMaleCount) {

				e = false;

				var m = 
				
				// push student to removeTheseMales, add it to a roster,
				// then icnrement corresponding maleCounts elem
				removeTheseMales.push(unassignedMales[nextMaleIndex]);
				ROSTER_ARR[i].students.push(unassignedMales[nextMaleIndex]);
				maleCounts[i] = maleCounts[i] + 1;

				nextMaleIndex++;

			}

		}


		// if loop is completed without having to assign any more
		// students, set malesEqualized to true
		if (e) {
		
			malesEqualized = true;

		}

	}


	// execute equalizeMales until males are equalized
	while (!malesEqualized) {

		equalizeMales();

	}


	// remove students in removeTheseMales from unassigned
	var newUnassignedMales = [];
	for (var i = 0; i < unassignedMales.length; i++) {

		var remove = false;

		for (var j = 0; j < removeTheseMales.length; j++) {

			if (unassignedMales[i].studentID === removeTheseMales[j].studentID) {

				remove = true;

			}

		}

		if (!remove) {

			newUnassignedMales.push(unassignedMales[i]);

		}

	}
	unassignedMales = newUnassignedMales;


	// function to add students from unassigned into rosters
	// until all rosters have equal number of females
	var femalesEqualized = false,
		removeTheseFemales = [];
	function equalizeFemales() {

		// find the the highest number of females in any roster
		var highestFemaleCount = findHighest(femaleCounts);

		var e = true,
			nextFemaleIndex = 0;

		// loop through maleCounts
		for (var i = 0; i < femaleCounts.length; i++) {

			if (femaleCounts[i] < highestFemaleCount) {

				e = false;

				var m = 
				
				// push student to removeTheseFemales, add it to a roster,
				// then icnrement corresponding maleCounts elem
				removeTheseFemales.push(unassignedFemales[nextFemaleIndex]);
				ROSTER_ARR[i].students.push(unassignedFemales[nextFemaleIndex]);
				femaleCounts[i] = femaleCounts[i] + 1;

				nextFemaleIndex++;

			}

		}


		// if loop is completed without having to assign any more
		// students, set malesEqualized to true
		if (e) {
		
			femalesEqualized = true;

		}

	}


	// execute equalizeFemales until females are equalized
	while (!femalesEqualized) {

		equalizeFemales();

	}


	// remove students in remvoeTheseFemales fron unassignedFemales
	var newUnassignedFemales = [];
	for (var i = 0; i < unassignedFemales.length; i++) {

		var remove = false;

		for (var j = 0; j < removeTheseFemales.length; j++) {

			if (unassignedFemales[i].studentID === removeTheseFemales[j].studentID) {

				remove = true;

			}

		}

		if (!remove) {

			newUnassignedFemales.push(unassignedFemales[i]);

		}

	}
	unassignedFemales = newUnassignedFemales;


	// declare var to cycle through rosters
	var rstrSelector = 0;


	// push male students to rosters moncola style
	for (var i = 0; i < unassignedMales.length; i++) {

		// add student object to roster and remove it from unassigned
		ROSTER_ARR[rstrSelector].students.push(unassignedMales[i]);
		

		// cycle rstrSelector through rosters
		if (rstrSelector < TEACHER_ARR.length - 1) {

			rstrSelector++;

		} else {

			rstrSelector = 0;

		}

	}


	// push female students to rosters moncola style
	for (var i = 0; i < unassignedFemales.length; i++) {

		// add student object to roster and remove it from unassigned
		ROSTER_ARR[rstrSelector].students.push(unassignedFemales[i]);
		

		// cycle rstrSelector through rosters
		if (rstrSelector < TEACHER_ARR.length - 1) {

			rstrSelector++;

		} else {

			rstrSelector = 0;

		}

	}

	// clear unassignedMales and unassignedFemales
	unassignedMales = [];
	unassignedFemales = [];

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


	// create initial rosters with separates, requests,
	// and balanced gender
	initRosterObj();


	// add target numbers to PARAM_TARGETS
	// getTargets();


	// console.log(ROSTER_ARR[0].students[0].studentName);
	// console.log(ROSTER_ARR[1].students[0].studentName);
	// console.log(ROSTER_ARR[0].students[0].studentID);
	// console.log(ROSTER_ARR[0].students[0].studentID);

	// trade something
	// trade(0, 1, ROSTER_ARR[0].students[0], ROSTER_ARR[1].students[0]);

	// console.log(ROSTER_ARR[0].students[0].studentName);
	// console.log(ROSTER_ARR[1].students[0].studentName);
	// console.log(ROSTER_ARR[0].students);
	// console.log(ROSTER_ARR[0].students);



	// log the number of males and females in each roster
	var mCounts = [],
		fCounts = [];
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		var mCount = countParams(ROSTER_ARR[i].students, "male");
		var fCount = ROSTER_ARR[i].students.length - mCount;
		mCounts.push(mCount);
		fCounts.push(fCount);

	}

	console.log(fCounts);
	console.log(mCounts);

	var sCount = 0;
	for (var i = 0; i < ROSTER_ARR.length; i++) {

		for (var j = 0; j < ROSTER_ARR[i].students.length; j++) {

			
				console.log(ROSTER_ARR[i].students[j].studentID);
			
			

		}

	}
	// console.log(sCount + " students are accounted for");



}
















// test how long it takes to do something
// function doSomething() {
	
// }

// var t0 = performance.now();
// doSomething();
// var t1 = performance.now();
// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");



