'use strict';

const test = require('tape');
const arp = require('../src/arp');

test('Arp::should return correct notes for arps', t => {
  t.equal(arp('CM-4 FM-4')[0], 'C4', 'should return correct notes');
  t.equal(arp({
    chords: 'CM-4 FM-4',
    order: '76543210'
  })[0], 'E6', 'should return correct notes when order is changed');
  t.end();
});
