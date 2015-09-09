var testData = []	

function initTestData() {


	// set total number of students
	var students = 75;


	// set ratios  for different perameters
	var ratios = [
		0.5,	// 0	males
		0.1,	// 1 	reading - high
		0.5,	// 2 	reading - mid
		0.2,	// 3 	writing - high
		0.2,	// 4 	writing - mid
		0.2,	// 5 	math - high
		0.6,	// 6 	math - mid
		0.1,	// 7 	red dot
		0.1,	// 8 	IEP
		0.1,	// 9 	health concerns
		0.4		// 10 	attended TK
	];


	// calculate actual numbers of students with each parameter
	var actualNumbers = [];
	for (var j = 0; j < ratios.length; j++) {

		var n = Math.floor(ratios[j] * students);
		actualNumbers.push(n);

	}
		

	// define template object to create student objects
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


	// add template objects to testData
	for (var i = 0; i < students; i++) {

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

	
	var s = makeSubset([1,2,3,4,5,6,7,8,9], 3);
	console.log(s);




	

}

initTestData();




// STRATEGY
// ========
// populate array with objects with all parameters undefined
// define parameters randomly to objects
