Scribbletune (WIP)
==================
Generate musical patterns using Javascript and export them as MIDI files with Node.js

####Run:  
npm install  
node app.js
---
###Process
- Use the Modes module to get a bunch of notes from a particular mode (Aeolian, Dorian etc) or Manually set an array of notes. Examples:
  - Modes.get('f', 2, 'phrygian'); //will return the notes of the phrygian mode for the root of F in the second octave
  - OR Manually set notes array: var notes = ['c3', 'd3', 'e3', 'f3'];
- Use the built-in Generator module to generate a bar of music of the required number of bars/beats from the notes array
- Specify a pattern in the Generator.bars method or use a pattern from the Patterns module. Example of Generator:
  - bar = Generate.bars({ notesArr: notes }); 
  - View module for more options
- Apply filter(s) (optional)
- Render track to a Midi file
- Import the midi file to your favorite music production application like Ableton Live or Reason.
