/*----------------------------------------

DEFINE SOME GENERAL FUNCTIONS TO BE
USED BY EVERYBODY

----------------------------------------*/



// function to replace all instances of 'find'
// in 'str' with 'replace' then returns a new string
function replaceAll(str, find, replace) {

	return str.replace(new RegExp(find, 'g'), replace);

}


// function to remove non letters and
// set all letters to lower case
function simplify(str) {

	var newStr = str.replace(/\W/g, '');

	return newStr;

}


// function to determine if strings are "equivalent"
function isEquiv(str1, str2) {
	
	var str1Mod = simplify(str1);
	var str2Mod = simplify(str2);

	if (str1Mod === str2Mod) {

		return true;

	}

	return false;

}
// var x = simplify(". -,@#$$%asdf123");
// console.log(x);


// function to return index of given array
// of elem with highest number
function findHighest(arr) {

	var highest = 0;

	for (var i = 0; i < arr.length; i++) {

		if (arr[i] > highest) {

			highest = arr[i];

		}

	}

	return highest;

}


// function to scroll to given element or position
$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 50,
    duration      : 500,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });
  });
}


// function to randomly shuffle an array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


var test = shuffle([1,2,3,4,5,6,7,8,9,0]);
console.log(test);