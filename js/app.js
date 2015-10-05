/*----------------------------------------

CREATE BALANCED ROSTERS

----------------------------------------*/




/*--------------- HELPER FUNCTIONS ---------------*/


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


// function to get all trades that don't compromise
// gender balance, teacher requests, or separate froms
function getLegalTrades() {

	// reset LEGAL_TRADES
	LEGAL_TRADES = [];

	// get all legal trade pairs and push them to LEGAL_TRADES array
	for (var i = 0; i < STUDENT_ARR.length - 1; i++) {

		var x = STUDENT_ARR[i];

		for (var j = i + 1; j < STUDENT_ARR.length; j++) {

			var y = STUDENT_ARR[j];

			if (x.request === undefined
				&& y.request === undefined
				&& x.male === y.male) {

				var pair  = [x, y];
				LEGAL_TRADES.push(pair);

			}

		}

	}

}


// function to lock given param by removing trades that
// would compromise it from LEGAL_TRADES
function lockParam(param) {

	var newLegalTrades = [];
	for (var i = 0; i < LEGAL_TRADES.length; i++) {

		if (LEGAL_TRADES[i][0][param] === LEGAL_TRADES[i][1][param]) {

			newLegalTrades.push(LEGAL_TRADES[i]);

		}

	}

	LEGAL_TRADES = newLegalTrades;

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




/*--------------- MAIN FUNCTIONS ---------------*/


// function to create roster objects with teachers assigned
function initRosterObj() {

	// init rosters with teachers but no students
	for (var i = 0; i < TEACHER_ARR.length; i++) {

		var newRoster = {};
		newRoster.teacher = TEACHER_ARR[i];
		newRoster.students = [];

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


// function to organize students into balanced rosters
function balanceRosters() {

	// get relevant data to balance rosters
	getParamTargets();
	getLegalTrades();
	// console.log("LEGAL_TRADES.length: " + LEGAL_TRADES.length);

	// loop through params and balance them
	for (var i = 0; i < PARAMS.length; i++) {
	// for (var i = 0; i < 3; i++) {

		var currentParam = PARAMS[i],
			balanced = false;
			tolerance = 0;

		var firstTime = true;
		var n = 0;
		while (!balanced) {

			// get an array of the currentParam counts for each roster
			var currentParamCounts = getParamCounts(currentParam);


			// find differences between counts and targets
			var differences = [];
			for (var j = 0; j < currentParamCounts.length; j++) {

				var diff = currentParamCounts[j] - PARAM_TARGETS[currentParam];
				differences.push(diff);

			}


			// if it's the first time through the while loop, set
			// tolerance to sum of differences
			if (firstTime) {

				var t = 0;
				for (var j = 0; j < differences.length; j++) {

					t += differences[j];

				}

				tolerance = Math.abs(t);

			}
			firstTime = false;
			

			// test whether differences are all within tolerance
			// and whether sum of absolute values of differences
			// is within tolerance
			var bigDiff = false,
				diffSum = 0;
			for (var j = 0; j < differences.length; j++) {

				var absDiff = Math.abs(differences[j]);

				if (absDiff > tolerance) {

					bigDiff = true;

				}

				diffSum += absDiff;

			}
			if (diffSum > tolerance) {bigDiff = true;}


			// if none of the differences are bigger than tolerance...
			if (!bigDiff) {

				// rosters are balanced on currentParam!
				balanced = true;

			// if not...
			} else {

				// identify rosters with highest
				// and lowest diffs
				var highRosterIndex = 0;
				var lowRosterIndex = 0;
				for (var j = 0; j < differences.length; j++) {

					if (differences[j] > differences[highRosterIndex]) {

						highRosterIndex = j;

					}

					if (differences[j] < differences[lowRosterIndex]) {

						lowRosterIndex = j;
						
					}

				}
				var highRoster = ROSTER_ARR[highRosterIndex].students;
				var lowRoster = ROSTER_ARR[lowRosterIndex].students;


				// identify pair in LEGAL_TRADES that
				// trade between these rosters and improve
				// balance on currentParam
				var tradePair = undefined,
					j = 0;
				while (j < LEGAL_TRADES.length
					&& tradePair === undefined) {

					// create vars to reference student objects
					var studentX = LEGAL_TRADES[j][0];
					var studentY = LEGAL_TRADES[j][1];


					// test whether x and/or y are in highRoster
					var xInHighRoster = false,
						yInHighRoster = false;
					for (var k = 0; k < highRoster.length; k++) {

						if (studentX.studentID === highRoster[k].studentID) {

							xInHighRoster = true;

						}

						if (studentY.studentID === highRoster[k].studentID) {

							yInHighRoster = true;

						}

					}


					// test whether x and/or y are in lowRoster
					var xInLowRoster = false,
						yInLowRoster = false;
					for (var k = 0; k < lowRoster.length; k++) {

						if (studentX.studentID === lowRoster[k].studentID) {

							xInLowRoster = true;

						}

						if (studentY.studentID === lowRoster[k].studentID) {

							yInLowRoster = true;

						}

					}


					// test whether trade would improve balance
					// on currentParam
					if ((xInHighRoster
						&& yInLowRoster
						&& studentX[currentParam] === true
						&& studentY[currentParam] === false)
						||
						(xInLowRoster
						&& yInHighRoster
						&& studentX[currentParam] === false
						&& studentY[currentParam] === true)) {

						tradePair = [studentX, studentY];
						
					}

					j++;

				}

				if (tradePair != undefined) {

					trade(tradePair[0], tradePair[1]);

				} else {

					tolerance++;

				}

				

			}

			n++;

		}

		// // get an array of the currentParam counts for each roster
		// var currentParamCounts = getParamCounts(currentParam);

		// // find differences between counts and targets
		// var differences = [];
		// for (var j = 0; j < currentParamCounts.length; j++) {

		// 	var diff = currentParamCounts[j] - PARAM_TARGETS[currentParam];
		// 	differences.push(diff);

		// }

		// console.log("differences:");
		// console.log(differences);
		// console.log("================");



		// after balancing param, lock it
		lockParam(currentParam);

	}

}


// function to separate designated students
function separateStudents() {

	var noConflicts = false;

	while (!noConflicts) {

		// test whether there are conflicts
		var conflicts = [];
		for (var i = 0; i < ROSTER_ARR.length; i++) {

			for (var j = 0; j < ROSTER_ARR[i].students.length; j++) {

				var x = ROSTER_ARR[i].students[j].separate;

				if (x != undefined) {

					for (var k = 0; k < ROSTER_ARR[i].students.length; k++) {

						var y = ROSTER_ARR[i].students[k].studentName;
						if (isEquiv(x, y)) {

							// i = index of the roster within ROSTER_ARR
							// j = index of student with 'separate from'
							// k = index of student to be separated from
							var conflictArr = [i, j, k];
							conflicts.push(conflictArr);

						}

					}

				}
			
			}

		}


		// if there are no conflicts, exit the loop
		if (conflicts.length === 0) {

			noConflicts = true;

		// if there are conflicts, resolve them
		} else {

			// loop through conflicts
			for (var i = 0; i < conflicts.length; i++) {

				// identify the roster with the conflict and the
				// students within that roster that conflict
				var rosterIndex = conflicts[i][0];
				var roster = ROSTER_ARR[rosterIndex].students;
				var studentX = roster[conflicts[i][1]];
				var studentY = roster[conflicts[i][2]];


				// find trades in LEGAL_TRADES that would resolve conflict
				var possibleTrades = [],
					foundTrade = false,
					loosen = 0;
				while (!foundTrade) {

					// loop through LEGAL_TRADES
					for (var j = 0; j < LEGAL_TRADES.length; j++) {

						// figure out which rosters the students in each
						// legal trade pair are currently in
						var roster0, roster1;
						for (var m = 0; m < ROSTER_ARR.length; m++) {

							for (var n = 0; n < ROSTER_ARR[m].students.length; n++) {

								if (LEGAL_TRADES[j][0].studentID 
									=== ROSTER_ARR[m].students[n].studentID) {

									roster0 = m;

								} else if (LEGAL_TRADES[j][1].studentID 
									=== ROSTER_ARR[m].students[n].studentID) {

									roster1 = m;

								}

							}

						}


						// if the trade is not within the same roster...
						if (roster1 != roster0) {

							// if either student is part of the trade...
							if (studentX.studentID === LEGAL_TRADES[j][0].studentID
								|| studentY.studentID === LEGAL_TRADES[j][0].studentID
								|| studentX.studentID === LEGAL_TRADES[j][1].studentID
								|| studentY.studentID === LEGAL_TRADES[j][1].studentID) {

								// add trade to possibleTrades
								possibleTrades.push(LEGAL_TRADES[j]);

							}

						}

					}


					// if there are possible trades, exit loop
					if (possibleTrades.length > 0) {

						foundTrade = true;
					
					// if not, unluck the last locked parameter
					// and execute the loop again
					} else {

						loosen++;
						
						if (loosen <= PARAMS.length) {

							getLegalTrades();
		
							for (var k = 0; k < PARAMS.length - loosen; k++) {

								lockParam(PARAMS[k]);

							}

						}
						
					}

				}

				// trade the sutdents to resolve the conflict
				trade(possibleTrades[0][0], possibleTrades[0][1]);

			}

		}

	}

}


// function to get the whole thing started
function initApp() {

	// FOR TESTING ONLY!! - hook up app to testData
	// TEACHER_ARR = testTeacherArr;
	// STUDENT_ARR = testStudentArr;


	// calling all functions!
	getData();
	initRosterObj();
	populateRosters();
	honorRequests();
	balanceRosters();
	separateStudents();
	displayRosters();



	//-------- CONSOLE TESTING --------//

	// // test whether teacher requests are honored
	// for (var i = 0; i < ROSTER_ARR.length; i++) {
	// 	for (var j = 0; j < ROSTER_ARR[i].students.length; j++) {
	// 		var student = ROSTER_ARR[i].students[j];
	// 		if (student.request != undefined) {
	// 			if (student.request != ROSTER_ARR[i].teacher.teacherName) {
	// 				console.log("failed to honor teacher request");
	// 			}
	// 		}
	// 	}
	// }


	// // test whether separate froms are honored
	// for (var i = 0; i < ROSTER_ARR.length; i++) {
	// 	for (var j = 0; j < ROSTER_ARR[i].students.length; j++) {
	// 		var sep = ROSTER_ARR[i].students[j].separate;
	// 		for (var k = 0; k < ROSTER_ARR[i].students.length; k++) {
	// 			if (sep === ROSTER_ARR[i].students[k].studentName) {
	// 				console.log("failed to separate student");
	// 			}
	// 		}
	// 	}
	// }


	// // test balance on all params
	// console.log("male");
	// console.log("===========================");
	// console.log(getParamCounts("male"));
	// for (var i = 0; i < PARAMS.length; i++) {
	// 	var p = PARAMS[i];
	// 	console.log(p);
	// 	console.log(getParamCounts(p));
	// 	console.log("===========================");
	// }


	// // make sure all students are accounted for
	// var studentCount = 0;
	// for (var i = 0; i < ROSTER_ARR.length; i++) {
	// 	for (var j = 0; j < ROSTER_ARR[i].students.length; j++) {
	// 		studentCount++;
	// 	}
	// }
	// console.log(studentCount + " students are accounted for");


	// // test to make sure there are no duplicate students
	// for (var i = 0; i < ROSTER_ARR.length; i++) {
	// 	for (var j = 0; j < ROSTER_ARR[i].students.length; j++) {
	// 		for (var k = 0; k < ROSTER_ARR.length; k++) {
	// 			for (var m = 0; m < ROSTER_ARR[k].students.length; m++) {
	// 				if (i != k) {
	// 					if (ROSTER_ARR[i].students[j].studentID
	// 						=== ROSTER_ARR[k].students[m].studentID) {
	// 						console.log("duplicate student");
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }

}
