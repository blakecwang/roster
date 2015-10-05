/*----------------------------------------

RETRIEVE AND INTERPRET USER INPUT

----------------------------------------*/



function getData() {

	var studentData = [],
		teacherData = [];


	// function to collect student inputs from DOM
	function getStudentData() {

		// get student data
	    $(".student-input").each(function() {

	    	if (this.type === "radio") {

	    		if (this.checked === true) {

	    			studentData.push(true);

	    		} else {

	    			studentData.push(false);

	    		}

	    	} else {

	    		if ($(this).val() === "") {

	    			studentData.push(undefined);

	    		} else {

	    			studentData.push($(this).val());

	    		}

	    	}

		});

		// console.log(studentData.length);

	}


	// function to collect teacher inputs from DOM
	function getTeacherData() {

		$(".teacher-input").each(function() {

			if ($(this).val() === "") {

				teacherData.push(undefined);
			
			} else {
			
				teacherData.push($(this).val());
			
			}

		});

	}


	// function to build student objects to be
	// placed in STUDENT_ARR
	function buildStudentObj(arr, startIndex, id) {

		var studentObj = {};

		// define function to set data from text inputs
		function setTextInput(param, index) {

			if (arr[index] != "") {

				studentObj[param] = arr[index];
			
			} else {
			
				studentObj[param] = undefined;
			
			}
		
		}


		// define function to set data from two choice radio groups
		function setTwoChoiceInput(param, index1, index2) {

			if (arr[index1]) {

				studentObj[param] = true;

			} else if (arr[index2]) {

				studentObj[param] = false;

			} else {

				studentObj[param] = undefined;

			}

		}


		// define function to set data from three choice radio groups
		function setThreeChoiceInput(param1, param2, index1, index2, index3) {

			if (arr[index1]) {

				studentObj[param1] = true;
				studentObj[param2] = false;

			} else if (arr[index2]) {

				studentObj[param1] = false;
				studentObj[param2] = true;

			} else if (arr[index3]) {

				studentObj[param1] = false;
				studentObj[param2] = false;

			} else {

				studentObj[param1] = undefined;
				studentObj[param2] = undefined;

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


		// give the student an ID
		studentObj.studentID = id;


		return studentObj;

	}


	// function to build teacher objects to be
	// placed in TEACHER_ARR
	function buildTeacherObj(name, id) {

		var teacherObj = {};

		teacherObj.teacherID = id;
		teacherObj.teacherName = name;

		return teacherObj;

	}


	// get data from user input
	getStudentData();
	getTeacherData();


	// push student objects to STUDENT_ARR
	for (var i = 0; i < (studentData.length - 1) / 24; i++) {

		STUDENT_ARR.push(buildStudentObj(studentData, i * 24, i));

	}


	// push teacher objects to TEACHER_ARR
	for (var i = 0; i < teacherData.length; i++) {

		TEACHER_ARR.push(buildTeacherObj(teacherData[i], i));

	}


}

