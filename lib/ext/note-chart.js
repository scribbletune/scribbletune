/**
 * MIDI note chart for note name, number and frequency
 */


//API
noteChart.convert('c4');	//return { name: 'c4', number: 60, frequency: 261.63 }
noteChart.convert(60);		//return { name: 'c4', number: 60, frequency: 261.63 }
noteChart.convert(261.63);	//return { name: 'c4', number: 60, frequency: 261.63 }

//this can be used as such:

//utility function to return log value to the base of 2
function log2(val) {
  return Math.log(val) / Math.LN2;
}

//utility to get the 12th root of a number
function twelthRoot(n) { 
	return Math.pow(n, 1/12); 
}


/**
 * Convert a note number to it's frequency
 * @param  {[type]} noteNum [description]
 * @return {[type]}         [description]
 */
function num2freq(noteNum) {
	var t = twelthRoot(2);
	return Math.pow(t, noteNum-49) * 440;
}

//get frequency for c4
var freqC4 = noteChart.convert('c4').frequency;
var freqC3 = noteChart.convert('c3').frequency;

//get the difference in octaves
var octaveDiff = log2(freqC4/freqC3);