'use strict';

// tests for eventutils
const eventutils = require('./index');

const testMapping = new Map();
testMapping.set('a.b', 'ab');
testMapping.set('c.d', 'cd');
testMapping.set('e', 'f');

let mappedEvent = {};

describe('eventutils', () => {
  describe('\'event\' parameter issues', () => {
    it('null event should return empty mapped event', () => {
      mappedEvent = {};
      eventutils.walkEvent(null, mappedEvent, testMapping);
      expect(mappedEvent).toEqual({});
    });
    it('empty event should return empty mapped event', () => {
      mappedEvent = {};
      eventutils.walkEvent({}, mappedEvent, testMapping);
      expect(mappedEvent).toEqual({});
    });
  });
  describe('\'mappedEvent\' parameter issues', () => {
    it('null mappedEvent should throw TypeError -> Missing parameter: object', () => {
      expect(() => eventutils.walkEvent({ a: { b: 1 }, c: { d: 2 }, e: 3 }, null, testMapping)).toThrow(TypeError('Missing parameter: object'));
    });
  });
  describe('\'mapping\' parameter issues', () => {
    it('empty mapping should return empty mappedEvent', () => {
      expect(() => eventutils.walkEvent({ a: { b: 1 }, c: { d: 2 }, e: 3 }, mappedEvent, new Map())).toThrow(TypeError('Emtpy or missing parameter: mapping'));
    });
    it('null mapping should throw return TypeError -> Emtpy or missing parameter mapping', () => {
      expect(() => eventutils.walkEvent({ a: { b: 1 }, c: { d: 2 }, e: 3 }, mappedEvent, null)).toThrow(TypeError('Emtpy or missing parameter: mapping'));
    });
  });
  describe('check valid output', () => {
    it('specific input and mapping should return specific output', () => {
      eventutils.walkEvent({ a: { b: 1 }, c: { d: 2 }, e: 3 }, mappedEvent, testMapping);
      expect(mappedEvent).toEqual({ ab: 1, cd: 2, f: 3 });
    });
  });
});
