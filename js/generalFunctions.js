/*----------------------------------------

DEFINE SOME GENERAL FUNCTIONS TO BE
USED BY EVERYBODY

----------------------------------------*/



// function to replace all instances of 'find'
// in 'str' with 'replace' then returns a new string
function replaceAll(str, find, replace) {

	return str.replace(new RegExp(find, 'g'), replace);

}


// function to determine if strings are "equivalent"
function isEquiv(str1, str2) {
	
	var str1Mod = replaceAll(str1.replace(/[^a-zA-Z-]/g, '').toLowerCase(), '-', '');
	var str2Mod = replaceAll(str2.replace(/[^a-zA-Z-]/g, '').toLowerCase(), '-', '');

	if (str1Mod === str2Mod) {

		return true;

	}

	return false;

}
