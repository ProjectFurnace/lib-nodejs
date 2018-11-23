/* eslint no-param-reassign: [2, { "props": false }] */

function isObject(val) {
  if (val === null) {
    return false;
  }
  // in some cases it may be useful to check also for typeof function
  // return ((typeof val === 'function') || (typeof val === 'object'));
  return (typeof val === 'object');
}

/**
 * Gets a specific path from a JSON object. The path is defined as a string
 *
 * @param {Object} object
 *   The JSON object to get the path from
 * @param {String} path
 *   The path we want the data for
 *
 * @return
 *   The value of the specified path
 */
function getPath(object, path) {
  // parameter error handling
  if (!object || !Object.keys(object).length) throw new TypeError('Emtpy or missing parameter: object');
  if (!path || path === '') throw new TypeError('Emtpy or missing parameter: path');

  let currentObjState = object;
  const npath = path.replace('\\.', '\\"');
  const splitPath = npath.split('.');

  // iterate through each bit of the path to find the corresponding node of the object or
  // throw an error if it does not exist
  for (let ii = 0; ii < splitPath.length; ii += 1) {
    const sPath = splitPath[ii].replace('\\"', '.');
    if (currentObjState[sPath] != null) {
      // save in current object just the node that we are interested in. we avoid recursion
      currentObjState = currentObjState[sPath];
    } else {
      // It's debatable whether this should throw an exception or not
      // throw new Error('Path: '.concat(path, ' not found in object'));
      // We'll return undefined as an alternative as this makes more sense
      return undefined;
    }
  }
  return currentObjState;
}

/**
 * Sets a specific path from a JSON object to a value. The path is defined as a string
 *
 * @param {Object} object
 *   The JSON object to set the path for
 * @param {String} path
 *   The path we want to set
 * @param {Object} value
 *   The value to set
 */
function setPath(object, path, value) {
  if (!object) throw new TypeError('Missing parameter: object');
  if (!path || path === '') throw new TypeError('Emtpy or missing parameter: path');

  const splitPath = path.split('.');
  const end = splitPath.length - 1;
  let refObject = object;

  for (let ii = 0; ii < end; ii += 1) {
    if (!refObject[splitPath[ii]]) refObject[splitPath[ii]] = {};
    refObject = refObject[splitPath[ii]];
  }
  refObject[splitPath[end]] = value;
}

/**
 * Deep merge two objects by adding the second object properties to the first one
 *
 * @param {Object} object1
 *   First object of the merge. It will be modified to add the data from object2
 * @param {Object} object2
 *   The object to merge to the first object
 * @param {Bool} overwrite
 *   Whether or not to overwrite nodes of the first object with values from the second object
 */
function merge(object1, object2, overwrite = false) {
  // iterate through the keys and if it's an object call the function again
  // if not, copy the value or overwrite
  Object.keys(object2).forEach((key) => {
    if (object1[key]) {
      if (isObject(object1[key]) && !overwrite) {
        merge(object1[key], object2[key]);
      } else if (overwrite) {
        object1[key] = object2[key];
      }
    } else {
      object1[key] = object2[key];
    }
  });
}

function toMap(objectArray, index) {
  const map = new Map();

  objectArray.forEach((obj) => {
    if (obj[index]) {
      map.set(obj[index], obj);
    }
  });

  return map;
}

module.exports.isObject = isObject;
module.exports.getPath = getPath;
module.exports.setPath = setPath;
module.exports.merge = merge;
module.exports.toMap = toMap;
