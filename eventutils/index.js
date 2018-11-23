const simplejson = require('simplejsonutils');

/**
 * Walk through all keys of and event and map them to a new format specified by mapping.
 * This is a recursive function.
 *
 * @param {Object} event
 *   The event that we want to map to the new format
 * @param {Object} mappedEvent
 *   The destination object in which to place the mapped event
 * @param {Object} mapping
 *   The map that specifies where that field translates to
 * @param {String} path
 *   The path we are currently accessing. Should be empty on first call
 */
function walkEvent(event, mappedEvent, mapping, path = '') {
  if (!event) return;
  if (!mapping || !mapping.size) throw new TypeError('Emtpy or missing parameter: mapping');

  const keys = Object.keys(event);
  for (let ii = 0; ii < keys.length; ii += 1) {
    if (simplejson.isObject(event[keys[ii]])) {
      let npath = keys[ii];
      if (path !== '') npath = path.concat('.', keys[ii]);
      walkEvent(event[keys[ii]], mappedEvent, mapping, npath);
    } else {
      const lof = mapping.get((path === '' ? keys[ii] : path.concat('.', keys[ii])));
      if (lof) {
        simplejson.setPath(mappedEvent, lof, event[keys[ii]]);
      }
    }
  }
}

module.exports.walkEvent = walkEvent;
