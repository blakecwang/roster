// declare global testData and testRosters arrays
var testData = [];
var testRosters;


function initTestData() {

	// set total number of students and rosters
	var students = 100;
	testRosters = 5;


	// set ratios  for different perameters
	var ratios = {
		"males": 0.49,
		"readingHigh": 0.05,
		"readingMid": 0.47,
		"writingHigh": 0.46,
		"writingMid": 0.45,
		"mathHigh": 0.44,
		"mathMid": 0.6,
		"redDot": 0.1,
		"iep": 0.1,
		"health": 0.1,
		"tk": 0.4
	};


	// calculate actual numbers of students with each parameter
	// var actualNumbers = ratios;
	// for (var i in actualNumbers) {

	// 	var n = Math.round(actualNumbers[i] * students);
	// 	actualNumbers[i] = n;

	// }
		

	// add template objects to testData
	for (var i = 0; i < students; i++) {

		var testDataTemplate = {

			"name": undefined,
			"gender": undefined,
			"reading": undefined,
			"writing": undefined,
			"math": undefined,
			"redDot": undefined,
			"iep": undefined,
			"health": undefined,
			"tk": undefined,
			"teacher": undefined,
			"separate": undefined
			
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


	// old set params function
	// function setParams() {

	// 	function setGender() {

	// 		// make subset
	// 		var sub = makeSubset(indicesArr, actualNumbers.males);

	// 		// set subset indices to male
	// 		for (var j = 0; j < sub.length; j++) {
	// 			testData[sub[j]].gender = "male";
	// 		}

	// 		// set the rest as female
	// 		for (var k = 0; k < testData.length; k++) {
	// 			if (testData[k].gender === undefined) {
	// 				testData[k].gender = "female";
	// 			}
	// 		}

	// 	}
		

	// 	function setReading() {

	// 		var iArr = indicesArr;

	// 		// make subset of random indices
	// 		var sub1 = makeSubset(iArr, actualNumbers.readingHigh);

	// 		// set sub1 indices to high
	// 		for (var i = 0; i < sub1.length; i++) {
	// 			testData[sub1[i]].reading = "high";
	// 		}

	// 		// remove sub1 from iArr
	// 		iArr = removeSubset(iArr, sub1);

	// 		// make new random subset from iArr
	// 		var sub2 = makeSubset(iArr, actualNumbers.readingMid);

	// 		// set sub2 indices to mid
	// 		for (var j = 0; j < sub2.length; j++) {
	// 			testData[sub2[j]].reading = "mid";
	// 		}

	// 		// set the rest as low
	// 		for (var k = 0; k < testData.length; k++) {
	// 			if (testData[k].reading === undefined) {
	// 				testData[k].reading = "low";
	// 			}
	// 		}

	// 	}
		

	// 	function setWriting() {

	// 		var iArr = indicesArr;

	// 		// make subset of random indices
	// 		var sub1 = makeSubset(iArr, actualNumbers.writingHigh);

	// 		// set sub1 indices to high
	// 		for (var i = 0; i < sub1.length; i++) {
	// 			testData[sub1[i]].writing = "high";
	// 		}

	// 		// remove sub1 from iArr
	// 		iArr = removeSubset(iArr, sub1);

	// 		// make new random subset from iArr
	// 		var sub2 = makeSubset(iArr, actualNumbers.writingMid);

	// 		// set sub2 indices to mid
	// 		for (var j = 0; j < sub2.length; j++) {
	// 			testData[sub2[j]].writing = "mid";
	// 		}

	// 		// set the rest as low
	// 		for (var k = 0; k < testData.length; k++) {
	// 			if (testData[k].writing === undefined) {
	// 				testData[k].writing = "low";
	// 			}
	// 		}

	// 	}
		

	// 	function setMath() {

	// 		var iArr = indicesArr;

	// 		// make subset of random indices
	// 		var sub1 = makeSubset(iArr, actualNumbers.mathHigh);

	// 		// set sub1 indices to high
	// 		for (var i = 0; i < sub1.length; i++) {
	// 			testData[sub1[i]].math = "high";
	// 		}

	// 		// remove sub1 from iArr
	// 		iArr = removeSubset(iArr, sub1);

	// 		// make new random subset from iArr
	// 		var sub2 = makeSubset(iArr, actualNumbers.mathMid);

	// 		// set sub2 indices to mid
	// 		for (var j = 0; j < sub2.length; j++) {
	// 			testData[sub2[j]].math = "mid";
	// 		}

	// 		// set the rest as low
	// 		for (var k = 0; k < testData.length; k++) {
	// 			if (testData[k].math === undefined) {
	// 				testData[k].math = "low";
	// 			}
	// 		}

	// 	}


	// 	function setRedDot() {

	// 		// make subset
	// 		var sub = makeSubset(indicesArr, actualNumbers.redDot);

	// 		// set subset indices to male
	// 		for (var j = 0; j < sub.length; j++) {
	// 			testData[sub[j]].redDot = true;
	// 		}

	// 		// set the rest as female
	// 		for (var k = 0; k < testData.length; k++) {
	// 			if (testData[k].redDot === undefined) {
	// 				testData[k].redDot = false;
	// 			}
	// 		}

	// 	}


	// 	function setIEP() {

	// 		// make subset
	// 		var sub = makeSubset(indicesArr, actualNumbers.iep);

	// 		// set subset indices to male
	// 		for (var j = 0; j < sub.length; j++) {
	// 			testData[sub[j]].iep = true;
	// 		}

	// 		// set the rest as female
	// 		for (var k = 0; k < testData.length; k++) {
	// 			if (testData[k].iep === undefined) {
	// 				testData[k].iep = false;
	// 			}
	// 		}

	// 	}


	// 	function setHealth() {

	// 		// make subset
	// 		var sub = makeSubset(indicesArr, actualNumbers.health);

	// 		// set subset indices to male
	// 		for (var j = 0; j < sub.length; j++) {
	// 			testData[sub[j]].health = true;
	// 		}

	// 		// set the rest as female
	// 		for (var k = 0; k < testData.length; k++) {
	// 			if (testData[k].health === undefined) {
	// 				testData[k].health = false;
	// 			}
	// 		}

	// 	}


	// 	function setTK() {

	// 		// make subset
	// 		var sub = makeSubset(indicesArr, actualNumbers.tk);

	// 		// set subset indices to male
	// 		for (var j = 0; j < sub.length; j++) {
	// 			testData[sub[j]].tk = true;
	// 		}

	// 		// set the rest as female
	// 		for (var k = 0; k < testData.length; k++) {
	// 			if (testData[k].tk === undefined) {
	// 				testData[k].tk = false;
	// 			}
	// 		}

	// 	}


	// 	// randomly assign parameters according to ratios
	// 	setGender();
	// 	setReading();
	// 	setWriting();
	// 	setMath();
	// 	setRedDot();
	// 	setIEP();
	// 	setHealth();
	// 	setTK();

	// }


	// function to randomly assign parameters with two possible values
	function setTwoParams(param, val1, val2, rat1) {

		// populate array of indices
		var iArr = [];
		for (var i = 0; i < students; i++) {
			iArr.push(i);
		}


		// make first subset of n1 indices
		var n1 = Math.round(rat1 * students);
		var sub1 = makeSubset(iArr, n1);


		// set sub1 indices of testData to val1
		for (var i = 0; i < sub1.length; i++) {

			testData[sub1[i]][param] = val1;

		}


		// set the rest to val2
		for (var j = 0; j < testData.length; j++) {

			if (testData[j][param] != val1) {

				testData[j][param] = val2;

			}
			
		}

	}


	// function to randomly assign parameters with three possible values
	function setThreeParams(param, val1, val2, val3, rat1, rat2) {

		// populate array of indices
		var iArr1 = [];
		for (var i = 0; i < students; i++) {
			iArr1.push(i);
		}


		// make first subset
		var n1 = Math.round(rat1 * students);
		var sub1 = makeSubset(iArr1, n1);


		// set sub1 indices of testData to val1
		for (var i = 0; i < sub1.length; i++) {

			testData[sub1[i]][param] = val1;

		}


		// make second subset
		var iArr2 = removeSubset(iArr1, sub1);
		var n2 = Math.round(rat2 * students);
		var sub2 = makeSubset(iArr2, n2);


		// set sub2 indices of testData to val2
		for (var j = 0; j < sub2.length; j++) {

			testData[sub2[j]][param] = val2;

		}

		// set the rest to val3
		for (var k = 0; k < testData.length; k++) {

			if (testData[k][param] != val1
				&& testData[k][param] != val2) {

				testData[k][param] = val3;

			}
			
		}

	}


	// assign values to parameters
	setTwoParams("gender", "male", "female", ratios.males);
	setTwoParams("redDot", true, false, ratios.redDot);
	setTwoParams("iep", true, false, ratios.iep);
	setTwoParams("health", true, false, ratios.health);
	setTwoParams("tk", true, false, ratios.tk);
	setThreeParams("reading", "high", "mid", "low",
		ratios.readingHigh, ratios.readingMid);
	setThreeParams("writing", "high", "mid", "low",
		ratios.writingHigh, ratios.writingMid);
	setThreeParams("math", "high", "mid", "low",
		ratios.mathHigh, ratios.mathMid);

}


initTestData();
