function makeMultiFilter(array) {
// What we track
var originalArray = array;
var currentArray = array;
	return (function arrayFilterer(pred, callback) {
		// If filter not a function return current Array
		if(!(pred instanceof Function) )
			return currentArray;
		// Filter out things
		currentArray = currentArray.filter(pred);
		// If callback is a function, execute callback
		if(callback instanceof Function)
			callback.call(originalArray,currentArray);
		return arrayFilterer;// We have to return something!
	});
}

// !!! THE CODE THAT FOLLOWS USES THE makeMultiFilter function
// arrayFilterer can be used to repeatedly filter this input array
var arrayFilterer = makeMultiFilter([1,2,3]);

// call arrayFilterer to filter out all the numbers not equal to 2
arrayFilterer(function (elem) {
return elem !== 2; // check if element is not equal to 2
}, function (currentArray) {
console.log(this); // prints [1,2 3]
console.log(currentArray); // prints [1, 3]
});

// call arrayFilterer filter out all the elements not equal to 3. No callback used
arrayFilterer(function (elem) {
return elem !== 3; // check if element is not equal to 3
});

// call arrayFilterer with no filter should return the current array
var currentArray = arrayFilterer();
console.log('currentArray', currentArray); // prints [1] since we filtered out 2 and 3

// Since arrayFilterer returns itself filters calls can be chained like:
function filterTwos(elem) { return elem !== 2; }
function filterThrees(elem) { return elem !== 3; }
var currentArray = makeMultiFilter([1,2,3])(filterTwos)(filterThrees)();
console.log('currentArray', currentArray); // prints [1] since we filtered out 2 and 3

// Multiple active filters at the same time
var arrayFilterer1 = makeMultiFilter([1,2,3]);
var arrayFilterer2 = makeMultiFilter([4,5,6]);
console.log(arrayFilterer1(filterTwos)()); // prints [1,3]
console.log(arrayFilterer2(filterThrees)()); // prints [4,5,6]
// Προσοχη αν τρέξετε console.log(array) πρέπει να πάρετε undefined
// Το ίδιο αν τρέξετε console.log(originalArray) ή console.log(currentArray)
