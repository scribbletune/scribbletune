'use strict';

const test = require('tape');
const scribble = require('../src/index');
const transpose = require('../src/transpose');
const AssertionError = require('assert').AssertionError;
test('Scribbletune::setMiddleC', t => {
    scribble.setMiddleC(5);
    //Initializing middleC for testing purposes
    
    t.doesNotThrow(
        (() => scribble.setMiddleC(5)),
        TypeError,
        'No error is thrown for valid argument'
    );
    
    t.throws(
        (() => scribble.setMiddleC('c4')),
        AssertionError,
        'Error is thrown for string argument'
    );
    
    t.throws(
        (() => scribble.setMiddleC(4.3)),
        AssertionError,
        'Error is thrown for non-integer argument'
    );
    
    t.equal(
        transpose.transposeOctave(4),
        5,
        'Octave is correctly transposed for int parameter'
    );
    
    t.equal(
        transpose.transposeOctave('3'),
        4,
        'Octave is correctly transposed for string parameter'
    );
    
    t.throws(
        (() => transpose.transposeOctave({octave: '4'})),
        AssertionError,
        'transposeOctave throws an error on invalid argument'
    );
    
    t.throws(
        (() => transpose.transposeOctave(4.3)),
        AssertionError,
        'transposeOctave throws an error for non-integer argument'
    );
    
    t.throws(
        (() => transpose.transposeOctave('4.3')),
        AssertionError,
        'transposeOctave throws an error for a non-integer string argument'
    );
    
    t.equals(
        transpose.transposeNote('c4'),
        'c5',
        'transposeNote returns the correct note for a natural'
    );
    
    t.equals(
        transpose.transposeNote('ab2'),
        'ab3',
        'transposeNote returns the correct note for a flat'
    );
    
    t.equals(
        transpose.transposeNote('f#3'),
        'f#4',
        'transposeNote returns the correct note for a sharp'
    );
    
    t.deepEquals(
        transpose.transposeNote(['a2', 'c#3', 'db4']),
        ['a3', 'c#4', 'db5'],
        'transposeNote returns the correct note for an array of notes'
    );
    
    t.throws(
        (() => transpose.transposeNote({note: 'c4'})),
        AssertionError,
        'transposeNote throws an error with an object argument'
    );
    
    t.deepEquals(
        transpose.transposeNote(['ab2', 'b#3', 'c4', 'd1'], 4),
        ['ab4', 'b#5', 'c6', 'd3'],
        'transposeNote correctly transposes an array of notes relative to the first note'
    );

    t.equals(
        transpose.transposeNote('a3', 5),
        'a5',
        'transposeNote correctly transposes a note with an octave given'
    );

    t.throws(
        (() => transpose.transposeNote('a3', 3.3)),
        AssertionError,
        'transposeNote throws an error with a non-integer octave'
    );

    t.throws(
        (() => transpose.transposeNote('d1', '2')),
        AssertionError,
        'transposeNote throws an error with a string octave'
    )
    t.end();
})

// Revert middle C to default middle C (which is 4)
scribble.setMiddleC(4);
