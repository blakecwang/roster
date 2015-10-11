// declare global testStudentArr and testRosters arrays
var testStudentArr = [];
var testTeacherArr = [];


function initTestData() {

	// set total number of students and rosters
	var students = 94,
		testRosters = 10;


	// creat teacher objects
	for (var i = 0; i < testRosters; i ++) {

		var teacherObj = {};

		teacherObj.teacherName = "Teacher" + i;
		teacherObj.teacherID = i;

		testTeacherArr.push(teacherObj);
		
	}


	// set ratios  for different perameters
	var ratios = {

		"separate": 0.02,
		"request": 0.15,
		"male": 0.55,
		"redDot": 0.27,
		"celdt": 0.23,
		"iep": 0.05,
		"health": 0.16,
		"tk": 0.25,
		"readingHigh": 0.20,
		"readingMid": 0.60,
		"writingHigh": 0.10,
		"writingMid": 0.60,
		"mathHigh": 0.20,
		"mathMid": 0.60

	};
		

	// add template objects to testStudentArr
	for (var i = 0; i < students; i++) {

		var testDataTemplate = {

			"studentID": undefined,
			"studentName": undefined,
			"separate": undefined,
			"request": undefined,
			"male": undefined,
			"redDot": undefined,
			"celdt": undefined,
			"iep": undefined,
			"health": undefined,
			"tk": undefined,
			"readingHigh": undefined,
			"readingMid": undefined,
			"writingHigh": undefined,
			"writingMid": undefined,
			"mathHigh": undefined,
			"mathMid": undefined
			
		};

		testStudentArr.push(testDataTemplate);

	}


	// name the students and set studentID
	for (var i = 0; i < students; i++) {
		testStudentArr[i].studentID = i;
		testStudentArr[i].studentName = "Student" + i;
	}


	// generate a random subset of students
	function makeSubset(superset, subsetSize) {

		var subset = [];

		while (subset.length < subsetSize) {

			// choose random superset element
			var subsetElemIndex = Math.floor(Math.random() * superset.length);
			var subsetElem = superset[subsetElemIndex];

			// check if that number has been used already
			var alreadyUsed = false;
			for (var i = 0; i < subset.length; i++) {

				if (subsetElem === subset[i]) {
					alreadyUsed = true;
				}

			}

			// if it hasn't been used, push number to subset
			if (!alreadyUsed) {
				subset.push(subsetElem);
			}

		}

		return subset;

	}

	
	// remove a subset from a superset and return new superset
	function removeSubset(superset, subset) {

		var newSet = [];
		for (var i = 0; i < superset.length; i++) {

			var p = true;
			for (var j = 0; j < subset.length; j++) {

				if (superset[i] === subset[j]) {
					p = false;
				}

			}

			if (p) {
				newSet.push(superset[i]);
			}
			

		}

		return newSet;

	}


	// function to randomly assign parameters with three possible values
	function setParams(param1, param2) {

		// populate array of indices
		var iArr1 = [];
		for (var i = 0; i < students; i++) {
			iArr1.push(i);
		}


		// make first subset
		var sublength1 = Math.round(ratios[param1] * students);
		var sub1 = makeSubset(iArr1, sublength1);
		

		// set param1 of sub1 indices to true
		for (var j = 0; j < sub1.length; j++) {

			testStudentArr[sub1[j]][param1] = true;

		}


		// if only one parameeter is given
		if (param2 === undefined) {

			// set the rest to false
			for (var k = 0; k < testStudentArr.length; k++) {

				if (testStudentArr[k][param1] != true) {

					testStudentArr[k][param1] = false;

				}

			}

		} else {

			// make second subset
			var iArr2 = removeSubset(iArr1, sub1);
			var sublength2 = Math.round(ratios[param2] * students);
			var sub2 = makeSubset(iArr2, sublength2);
			

			// set param2 of sub2 indices to true
			for (var n = 0; n < sub2.length; n++) {

				testStudentArr[sub2[n]][param2] = true;

			}

	
			// set param1 and param2 to false for the rest
			for (var m = 0; m < testStudentArr.length; m++) {

				if (testStudentArr[m][param1] != true) {

					testStudentArr[m][param1] = false;

				}

				if (testStudentArr[m][param2] != true) {
						
					testStudentArr[m][param2] = false;
				
				}
				
			}

		}

	}


	// function to randomly set separate froms
	function setSeparates() {

		var separates = Math.round(ratios.separate * students);

		// get some random indices to set 'separate from' requests on
		var indices = [],
			i = 0;
		while (indices.length < separates) {

			var index = Math.floor(Math.random() * students);

			var used = false;
			for (var j = 0; j < indices.length; j++) {

				if (index === indices[j]) {

					used = true;

				}

			}

			if (!used) {

				indices.push(index);

			}

		}


		// set random 'separate from' requests on random indices
		for (var i = 0; i < indices.length; i++) {

			var separateIndex = Math.floor(Math.random() * testStudentArr.length);

			if (testStudentArr[indices[i]].studentID != testStudentArr[separateIndex].studentID) {

				testStudentArr[indices[i]].separate = testStudentArr[separateIndex].studentName;

			}
			
		}

	}


	// function to randomly set some teacher requests
	function setRequests() {

		var requests = Math.round(ratios.request * students);


		// get some random indices to set teacher requests on
		var indices = [];
		while (indices < requests.length) {

			var index = Math.floor(Math.random() * students);

			var used = false;
			for (var j = 0; j < indices.length; j++) {

				if (index === indices[j]) {

					used = true;

				}

			}

			if (!used) {

				indices.push(index);

			}

		}


		// set random teacher requests on random indices
		for (var i = 0; i < indices.length; i++) {

			var teacherIndex = Math.floor(Math.random() * testTeacherArr.length);

			testStudentArr[indices[i]].request = testTeacherArr[teacherIndex].teacherName;

		}

	}




	// set parameters
	setParams("male");
	setParams("redDot");
	setParams("celdt");
	setParams("iep");
	setParams("health");
	setParams("tk");
	setParams("readingHigh", "readingMid");
	setParams("writingHigh", "writingMid");
	setParams("mathHigh", "mathMid");

	setRequests();
	setSeparates();

}


initTestData();