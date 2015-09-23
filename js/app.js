/*----------------------------------------

CREATE BALANCED ROSTERS

----------------------------------------*/


// function to push males and females to rosters
// in rosterArr moncola style
function initRosters(stdntArr, rstrs) {
	
	// function to push students of given param to
	// rosters of rosterArr one at a time (moncola style)
	var rstrIndex = 0;
	function pushStudents(param, bool) {
		
		var i = 0;
		while (i < stdntArr.length) {

			if ((bool && stdntArr[i][param])
				|| (!bool && !stdntArr[i][param])) {

				rosterArr[rstrIndex].push(stdntArr[i]);

				if (rstrIndex < rstrs - 1) {

					rstrIndex++;

				} else {

					rstrIndex = 0;

				}

			}

			i++;

		}

	}


	// init empty rosters
	for (var i = 0; i < rstrs; i++) {

		var emptyArr = [];
		rosterArr.push(emptyArr);

	}


	// push males then females one by one
	pushStudents("male", true);
	pushStudents("male", false);

}


// function to count students with given param in given array
function countParams(arr, param) {

	var count = 0;
	for (var i = 0; i < arr.length; i++) {

		if (arr[i][param]) {count++;}

	}

	return count;

}


// function to return student, given a
// studentID and array of students
function getStudentByID(arr, id) {

	var s = undefined;

	for (var i = 0; i < arr.length; i++) {

		if (arr[i].studentID === id) {

			s = arr[i];

		}
	}

	return s;

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


// organize students into balanced rosters
function balanceRosters() {

	// Use these functions to get inputs from table when ready
	// but for now, well just use testData

	// get data from input fields
	// getDataArr();

	// organize that data into studentArr
	// studentArrBuilder();

	// get number of rosters and students
	// var rosters = rosterArr.length;



	// use testData to test functionality
	// DELETE THESE LINES WHEN DONE TESTING APP
	studentArr = testData;
	rosters = testTeacherArr.length;


	// declare some makeRosters level variables
	var fixedParams = ["male"];
	var students = studentArr.length;


	initRosters(testData, testTeacherArr.length);

	for (var i = 0; i < rosterArr.length; i++) {
		console.log(rosterArr[i].length);
	}






}




$("#roster-button").click(balanceRosters);











// test how long it takes to do something
// function doSomething() {
	
// }

// var t0 = performance.now();
// doSomething();
// var t1 = performance.now();
// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");



