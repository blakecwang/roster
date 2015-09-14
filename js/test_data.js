var testData = [];

function initTestData() {


	// set total number of students
	var students = 75;


	// set ratios  for different perameters
	var ratios = {
		"males": 0.5,
		"readingHigh": 0.1,
		"readingMid": 0.5,
		"writingHigh": 0.2,
		"writingMid": 0.2,
		"mathHigh": 0.2,
		"mathMid": 0.6,
		"redDot": 0.1,
		"iep": 0.1,
		"health": 0.1,
		"tk": 0.4
	};

	// ratios.females = 1 - ratios.males;
	// ratios.readingLow = 1 - ratios.readingHigh - ratios.readingMid;
	// ratios.writingLow = 1 - ratios.writingHigh - ratios.writingMid;
	// ratios.mathLow = 1 - ratios.mathHigh - ratios.mathMid;


	// calculate actual numbers of students with each parameter
	var actualNumbers = ratios;
	for (var j in actualNumbers) {

		var n = Math.round(actualNumbers[j] * students);
		actualNumbers[j] = n;

	}
		

	// add template objects to testData
	for (var i = 0; i < students; i++) {

		var testDataTemplate = {

			"name": undefined,
			"gender": undefined,
			"reading": undefined,
			"writing": undefined,
			"math": undefined,
			"reddot": undefined,
			"iep": undefined,
			"health": undefined,
			"tk": undefined,
			"teacher": undefined,
			"separate": undefined
			
		};

		testData.push(testDataTemplate);

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

	// assign male and female randomly
	var testDataIndices = [];
	for (var k = 0; k < testData.length; k++) {
		testDataIndices.push(k);
	}
	var s = makeSubset(testDataIndices, actualNumbers.males);

	for (var j = 0; j < s.length; j++) {
		testData[s[j]].gender = "male";
	}
	testData[3].gender = "male";

	for (var k = 0; k < testData.length; k++) {
		if (testData[k].gender != "male") {
			testData[k].gender = "female";
		}
	}



	var genderArr = [];
	for (var p = 0; p < testData.length; p++) {
		genderArr.push(testData[p].gender);
	}
	console.log(genderArr);

	

}

initTestData();




// STRATEGY
// ========
// populate array with objects with all parameters undefined
// define parameters randomly to objects
