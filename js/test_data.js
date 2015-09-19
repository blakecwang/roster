// declare global testData and testRosters arrays
var testData = [];
var testRosters;


function initTestData() {

	// set total number of students and rosters
	var students = 100;
	testRosters = 1;


	// set ratios  for different perameters
	var ratios = {

		"male": 0.48,
		"redDot": 0.27,
		"celdt": 0.23,
		"iep": 0.05,
		"health": 0.16,
		"tk": 0.41,
		"readingHigh": 0.05,
		"readingMid": 0.47,
		"writingHigh": 0.46,
		"writingMid": 0.30,
		"mathHigh": 0.22,
		"mathMid": 0.69

	};
		

	// add template objects to testData
	for (var i = 0; i < students; i++) {

		var testDataTemplate = {

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


	// name the students
	for (var i = 0; i < students; i++) {
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

			for (var j = 0; j < subset.length; j++) {

				if (superset[i] != subset[j]) {
					newSet.push(superset[i]);
				}

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
		for (var i = 0; i < sub1.length; i++) {

			testData[sub1[i]][param1] = true;

		}


		// if only one parameeter is given
		if (param2 === undefined) {

			// set the rest to false
			for (var j = 0; j < students; j++) {

				if (testData[j][param1] != true) {

					testData[j][param1] = false;

				}

			}

		} else {

			// make second subset
			var iArr2 = removeSubset(iArr1, sub1);
			var sublength2 = Math.round(ratios[param2] * students);
			var sub2 = makeSubset(iArr2, sublength2);


			// set param2 of sub2 indices to true
			for (var k = 0; k < sub2.length; k++) {

				testData[sub2[k]][param2] = true;

			}


			// set param1 and param2 to false for the rest
			for (var m = 0; m < students.length; m++) {

				if (testData[m][param1] != true
					&& testData[m][param2] != true) {

					testData[k][param1] = false;
					testData[k][param2] = false;

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

	// console.log(testData);

}


initTestData();
