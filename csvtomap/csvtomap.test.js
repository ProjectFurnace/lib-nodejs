'use strict';

// tests for csvtomap
const path = require('path');
const csvtomap = require('./index');

const testIndexedCSV = path.resolve(__dirname, '__testassets__/test_indexed.csv');
const testKeyValueCSV = path.resolve(__dirname, '__testassets__/test_keyvalue.csv');

describe('csvtomap.createIndexed', () => {
  describe('\'file\' parameter issues', () => {
    it('non-existent file should throw error', () => {
      expect(() => csvtomap.createIndexed('missing-file', { a: 1 }, 1)).toThrow('ENOENT: no such file or directory, open \'missing-file\'');
    });
    it('empty file should throw TypeError -> No CSV file specified', () => {
      expect(() => csvtomap.createIndexed('', { a: 1 }, 1)).toThrow(TypeError('No CSV file specified'));
    });
    it('null file should throw TypeError -> No CSV file specified', () => {
      expect(() => csvtomap.createIndexed(null, { a: 1 }, 4)).toThrow(TypeError('No CSV file specified'));
    });
  });
  describe('\'index\' parameter issues', () => {
    it('non-existent index column should throw TypeError -> Non-existent index column: [index]', () => {
      expect(() => csvtomap.createIndexed(testIndexedCSV, { a: 1 }, 4)).toThrow(TypeError('Non-existent index column: 4'));
    });
    it('missing index should throw TypeError -> Index parameter should be an integer', () => {
      expect(() => csvtomap.createIndexed(testIndexedCSV, { a: 1 })).toThrow(TypeError('Index parameter should be an integer'));
    });
    it('non-integer index should throw return TypeError -> Index parameter should be an integer', () => {
      expect(() => csvtomap.createIndexed(testIndexedCSV, { a: 1 }, 'abc')).toThrow(TypeError('Index parameter should be an integer'));
    });
    it('null index should throw TypeError -> Index parameter should be an integer', () => {
      expect(() => csvtomap.createIndexed(testIndexedCSV, { a: 1 }, null)).toThrow(TypeError('Index parameter should be an integer'));
    });
  });
  describe('\'mapping\' parameter issues', () => {
    it('empty mapping should throw return TypeError -> Emtpy or missing parameter mappings', () => {
      expect(() => csvtomap.createIndexed(testIndexedCSV, {})).toThrow(TypeError('Emtpy or missing parameter: mappings'));
    });
    it('null mapping should throw return TypeError -> Emtpy or missing parameter mappings', () => {
      expect(() => csvtomap.createIndexed(testIndexedCSV, null, 1)).toThrow(TypeError('Emtpy or missing parameter: mappings'));
    });
  });
  describe('check valid output', () => {
    it('specfic mapping with index 0 should return specific map', () => {
      const expectedOutput = new Map();
      expectedOutput.set(0, { a: 'ABC' });
      expectedOutput.set(1, { a: 'BCD' });
      expect(csvtomap.createIndexed(testIndexedCSV, { a: 1 }, 0)).toEqual(expectedOutput);
    });
  });
});

describe('csvtomap.createKeyValue', () => {
  describe('\'file\' parameter issues', () => {
    it('non-existent file should throw error', () => {
      expect(() => csvtomap.createKeyValue('missing-file')).toThrow('ENOENT: no such file or directory, open \'missing-file\'');
    });
    it('empty file should throw TypeError -> No CSV file specified', () => {
      expect(() => csvtomap.createKeyValue('')).toThrow(TypeError('No CSV file specified'));
    });
    it('null file should throw TypeError -> No CSV file specified', () => {
      expect(() => csvtomap.createKeyValue(null)).toThrow(TypeError('No CSV file specified'));
    });
    it('unexpected number of columns should throw TypeError -> Number of columns should be 2', () => {
      expect(() => csvtomap.createKeyValue(testIndexedCSV)).toThrow(TypeError('Number of columns should be 2'));
    });
  });
  describe('check valid output', () => {
    it('specfic mapping should return specific map', () => {
      const expectedOutput = new Map();
      expectedOutput.set('a.b.c', 'abc');
      expectedOutput.set('d.e.f', 'def');
      expect(csvtomap.createKeyValue(testKeyValueCSV)).toEqual(expectedOutput);
    });
  });
});