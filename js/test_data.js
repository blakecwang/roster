// declare global testData and testRosters arrays
var testData = [];
var testTeacherArr = [];


function initTestData() {

	// set total number of students and rosters
	var students = 100;
	testRosters = 5;


	// name teachers
	for (var i = 0; i < testRosters; i ++) {

		var teacherName = "teacher" + i;
		testTeacherArr.push(teacherName);
		
	}


	// set ratios  for different perameters
	var ratios = {

		"male": 0.48,
		"redDot": 0.27,
		"celdt": 0.23,
		"iep": 0.05,
		"health": 0.16,
		"tk": 0.41,
		"readingHigh": 0.03,
		"readingMid": 0.75,
		"writingHigh": 0.09,
		"writingMid": 0.39,
		"mathHigh": 0.15,
		"mathMid": 0.50

	};
		

	// add template objects to testData
	for (var i = 0; i < students; i++) {

		var testDataTemplate = {

			"studentIndex": undefined,
			"name": undefined,
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

		testData.push(testDataTemplate);

	}


	// name the students and set studentIndex
	for (var i = 0; i < students; i++) {
		testData[i].studentIndex = i;
		testData[i].name = "Student" + i;
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

			testData[sub1[j]][param1] = true;

		}


		// if only one parameeter is given
		if (param2 === undefined) {

			// set the rest to false
			for (var k = 0; k < testData.length; k++) {

				if (testData[k][param1] != true) {

					testData[k][param1] = false;

				}

			}

		} else {

			// make second subset
			var iArr2 = removeSubset(iArr1, sub1);
			var sublength2 = Math.round(ratios[param2] * students);
			var sub2 = makeSubset(iArr2, sublength2);
			

			// set param2 of sub2 indices to true
			for (var n = 0; n < sub2.length; n++) {

				testData[sub2[n]][param2] = true;

			}

	
			// set param1 and param2 to false for the rest
			for (var m = 0; m < testData.length; m++) {

				if (testData[m][param1] != true) {

					testData[m][param1] = false;

				}

				if (testData[m][param2] != true) {
						
					testData[m][param2] = false;
				
				}
				
			}

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

}


initTestData();