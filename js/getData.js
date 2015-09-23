/*----------------------------------------

RETRIEVE AND INTERPRET INPUT DATA FROM UI

----------------------------------------*/



// define function to get all the data from inputs
function getDataArr() {

	// get student data
    $(".student-input").each(function() {

    	if (this.type === "radio") {
    		if (this.checked === true) {
    			dataArr.push(true);
    		} else {
    			dataArr.push(false);
    		}
    	} else {
    		if ($(this).val() === "") {
    			dataArr.push(undefined);
    		} else {
    			dataArr.push($(this).val());
    		}
    	}

	});


    // get teacher data
	$(".teacher-input").each(function() {

		if ($(this).val() === "") {
			teacherArr.push(undefined);
		} else {
			teacherArr.push($(this).val());
		}

	});

}


// build individual rowArrs to be placed in studentArr
function rowObjBuilder(arr, startIndex) {

	var rowObj = {};


	// define function to set data from text inputs
	function setTextInput(param, index) {

		if (arr[index] != "") {

			rowObj[param] = arr[index];
		
		} else {
		
			rowObj[param] = undefined;
		
		}
	
	}


	// define function to set data from two choice radio groups
	function setTwoChoiceInput(param, index1, index2) {

		if (arr[index1]) {

			rowObj[param] = true;

		} else if (arr[index2]) {

			rowObj[param] = false;

		} else {

			rowObj[param] = undefined;

		}

	}


	// define function to set data from three choice radio groups
	function setThreeChoiceInput(param1, param2, index1, index2, index3) {

		if (arr[index1]) {

			rowObj[param1] = true;
			rowObj[param2] = false;

		} else if (arr[index2]) {

			rowObj[param1] = false;
			rowObj[param2] = true;

		} else if (arr[index3]) {

			rowObj[param1] = false;
			rowObj[param2] = false;

		} else {

			rowObj[param1] = undefined;
			rowObj[param2] = undefined;

		}

	}


	// set text inputs
	setTextInput("name", startIndex);
	setTextInput("separate", startIndex + 1);
	setTextInput("request", startIndex + 2);


	// set two choice inputs
	setTwoChoiceInput("male", startIndex + 3, startIndex + 4);
	setTwoChoiceInput("redDot", startIndex + 5, startIndex + 6);
	setTwoChoiceInput("celdt", startIndex + 7, startIndex + 8);
	setTwoChoiceInput("iep", startIndex + 9, startIndex + 10);
	setTwoChoiceInput("health", startIndex + 11, startIndex + 12);
	setTwoChoiceInput("tk", startIndex + 13, startIndex + 14);


	// set three choice inputs
	setThreeChoiceInput("readingHigh", "readingMid",
		startIndex + 15, startIndex + 16, startIndex + 17);
	setThreeChoiceInput("writingHigh", "writingMid",
		startIndex + 18, startIndex + 19, startIndex + 20);
	setThreeChoiceInput("mathHigh", "mathMid",
		startIndex + 21, startIndex + 22, startIndex + 23);


	return rowObj;

}


// add all individual rowArrs to studentArr
function studentArrBuilder() {

	// get number of rows
	var rows = (dataArr.length - 1) / 22;

	// iterate through rows and add them to studentArr
	for (var i = 0; i < rows; i ++) {

		studentArr.push(rowObjBuilder(dataArr, i * 22));

	}

}