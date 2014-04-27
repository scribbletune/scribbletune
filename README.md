Scribbletune (WIP)
==================
Generate musical patterns using Javascript and export them as MIDI files with Node.js

####Run:  
npm install  
node melody.js [params]

---

###Parameters
- -r Root note (Example: node melody.js -r d#. Default: c)
- -o Octave (Example: node melody.js -o 2. Default: 3)
- -m or --mode Mode (Example: node melody.js -m dorian OR node melody.js --mode phrygian. Default: ionian, which is a major scale)
- --bars Number of bars to generate (Example: node melody.js --bars 3. Default: 2)
- --notes Provide notes with octaves instead of generating them via Mode generator (Example: node --notes c3,d3,f#2. Do not use spaces.)
- --pattern Provide a pattern for the melody. (Example: node melody.js --pattern x---x---x---x___  Each x is note on. Each - is note off. Each _ is sustain and determines note duration. You can use the pattern generator or Pattern.generic[index] or Pattern.fancy[index] to get a pattern)
- --randomize Randomize the notes of the melody generated (Example node melody.js --randomize true. Default: true)
- --visualize Visualize the generated notes (Example node melody.js --visualize true. Default: false)

####Please Note
Currently the application expects flattened notes in their sharp notations. For example, you'd need to specify A# for a B flat note.