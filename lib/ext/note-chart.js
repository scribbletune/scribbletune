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

//get frequency for c4
var freqC4 = noteChart.convert('c4').frequency;
var freqC3 = noteChart.convert('c3').frequency;

//get the difference in octaves
var octaveDiff = log2(freqC4/freqC3);