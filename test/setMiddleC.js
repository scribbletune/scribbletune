'use strict';

const test = require('tape');
const scribble = require('../src/index');
const setMiddleC = require('../src/setMiddleC');
const AssertionError = require('assert').AssertionError;
scribble.setMiddleC(5);
//Initializing middleC for testing purposes
test('Scribbletune::setMiddleC', t => {
    t.doesNotThrow(
        (() => scribble.setMiddleC(5)),
        TypeError,
        "No error is thrown for valid argument"
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
        setMiddleC.transposeOctave(4),
        5,
        'Octave is correctly transposed for int parameter'
    );
    
    t.equal(
        setMiddleC.transposeOctave('3'),
        4,
        'Octave is correctly transposed for string parameter'
    );
    
    t.throws(
        (() => setMiddleC.transposeOctave({octave: '4'})),
        AssertionError,
        'transposeOctave throws an error on invalid argument'
    );
    
    t.throws(
        (() => setMiddleC.transposeOctave(4.3)),
        AssertionError,
        'transposeOctave throws an error for non-integer argument'
    );
    
    t.throws(
        (() => setMiddleC.transposeOctave('4.3')),
        AssertionError,
        'transposeOctave throws an error for a non-integer string argument'
    );
    
    t.equals(
        setMiddleC.transposeNote('c4'),
        'c5',
        'transposeNote returns the correct note for a natural'
    );
    
    t.equals(
        setMiddleC.transposeNote('ab2'),
        'ab3',
        'transposeNote returns the correct note for a flat'
    );
    
    t.equals(
        setMiddleC.transposeNote('e#3'),
        'e#4',
        'transposeNote returns the correct note for a sharp'
    );
    
    t.deepEquals(
        setMiddleC.transposeNote(['a2', 'c#3', 'db4']),
        ['a3', 'c#4', 'db5'],
        'transposeNote returns the correct note for an array of notes'
    );
    
    t.throws(
        (() => setMiddleC.transposeNote({note: 'c4'})),
        AssertionError,
        'transposeNote throws an error with an object argument'
    );
    
    //setMiddleC.transposeSingle is automatically tested in setMiddleC.transposeNote
    scribble.setMiddleC(4);
    //Revert the scribble package to normal middleC
    t.end();
})