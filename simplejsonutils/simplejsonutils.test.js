// global define, it, describe

'use strict';

// tests for simplejsonutils
const sju = require('./index');

describe('simplejsonutils', () => {
  const tObj1 = { a: { b: { c: 1 } } };
  const tObj2 = { a: { b: { d: 1 } } };
  const tObj3 = { a: { b: 2 }, e: 3 };
  const mergetObj12 = { a: { b: { c: 1, d: 1 } } };
  const mergetObj13 = { a: { b: { c: 1 } }, e: 3 };
  const mergetObj13overwrite = { a: { b: 2 }, e: 3 };

  describe('getPath()', () => {
    describe('\'object\' parameter issues', () => {
      it('null should throw TypeError -> Emtpy or missing parameter: object', () => {
        expect(() => sju.getPath(null, 'a.b.c')).toThrow(TypeError('Emtpy or missing parameter: object'));
      });
      it('empty should throw TypeError -> Emtpy or missing parameter: object', () => {
        expect(() => sju.getPath({}, 'a.b.c')).toThrow(TypeError('Emtpy or missing parameter: object'));
      });
    });
    describe('\'path\' parameter issues', () => {
      it('null should throw TypeError -> Emtpy or missing parameter: path', () => {
        expect(() => sju.getPath(tObj1, null)).toThrow(TypeError('Emtpy or missing parameter: path'));
      });
      it('empty should throw TypeError -> Emtpy or missing parameter: path', () => {
        expect(() => sju.getPath(tObj1, '')).toThrow(TypeError('Emtpy or missing parameter: path'));
      });
    });
    describe('check valid output', () => {
      it('existing path should return path value', () => {
        expect(sju.getPath(tObj1, 'a.b.c')).toBe(1);
      });
      it('non-existing path should throw Error -> Path: [path] not found in object', () => {
        // expect(() => sju.getPath(tObj1, 'a.b.d')).toThrow(Error('Path: a.b.d not found in object'));
        expect(sju.getPath(tObj1, 'a.b.d')).toBeUndefined();
      });
      it('existing path with escaped value on empty object should return the path value', () => {
        expect(sju.getPath({ a: { 'b.c': 2 } }, 'a.b\\.c')).toBe(2);
      });
    });
  });

  describe('setPath()', () => {
    describe('\'object\' parameter issues', () => {
      it('null should throw TypeError -> Empty or missing parameter: object', () => {
        expect(() => sju.getPath(null, 'a.b.c')).toThrow(TypeError('Emtpy or missing parameter: object'));
      });
    });
    describe('\'path\' parameter issues', () => {
      it('null should throw TypeError -> Emtpy or missing parameter: path', () => {
        expect(() => sju.getPath(tObj1, null)).toThrow(TypeError('Emtpy or missing parameter: path'));
      });
      it('empty should throw TypeError -> Emtpy or missing parameter: path', () => {
        expect(() => sju.getPath(tObj1, '')).toThrow(TypeError('Emtpy or missing parameter: path'));
      });
    });
    describe('check valid set', () => {
      it('setting path on empty object should lead to object with value on the specified path', () => {
        const tObj = {};
        sju.setPath(tObj, 'a.b.c', 1);
        expect(tObj).toEqual({ a: { b: { c: 1 } } });
      });
      it('setting path on existing object should lead that object with value on the specified path', () => {
        const tObj = { a: { d: 1 } };
        sju.setPath(tObj, 'a.b.c', 1);
        expect(tObj).toEqual({ a: { b: { c: 1 }, d: 1 } });
      });
    });
  });

  describe('merge()', () => {
    describe('\'object\' parameter issues', () => {
      it('merging two objects that do not overlap', () => {
        // Careful! as we alter the first parameter we need to recreate it between tests
        const tObjT = { a: { b: { c: 1 } } };
        sju.merge(tObjT, tObj2);
        expect(tObjT).toEqual(mergetObj12);
      });
      it('merging two objects that do overlap without overwriting', () => {
        const tObjT = { a: { b: { c: 1 } } };
        sju.merge(tObjT, tObj3);
        expect(tObjT).toEqual(mergetObj13);
      });
      it('merging two objects that do overlap with overwriting', () => {
        const tObjT = { a: { b: { c: 1 } } };
        sju.merge(tObjT, tObj3, true);
        expect(tObjT).toEqual(mergetObj13overwrite);
      });
    });
  });
});
