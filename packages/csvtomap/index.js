const fs = require('fs');

/**
 * Creates a Map from a CSV file using the specified mappings and with index as key
 * This is useful when we want to map values to specific objects without having to
 * iterate through a complete array, as a map will allow us to retrieve a specific
 * key directly
 *
 * @param {String} file
 *   Name of the CSV file to create the map from
 * @param {Object} mappings
 *   The desired mappings as key => column_index
 *   Ex: {a: 1} (this would create an output with key 'a' containing value of column_index 1)
 * @param {Integer} index
 *   The column to use as index for the map output
 * @param {Char} delimiter
 *   The CSV delimiter
 *
 * @return
 *   A map with the CSV the value of index parameter column as key and an Object as the value
 */
function createIndexed(file, mappings, index, delimiter = ';') {
  const map = new Map();

  // parameter error handling
  if (!file) throw new TypeError('No CSV file specified');
  if (!mappings || !Object.keys(mappings).length) throw new TypeError('Emtpy or missing parameter: mappings');
  if (!Number.isInteger(index)) throw new TypeError('Index parameter should be an integer');

  try {
    // read CSV file
    const lines = fs.readFileSync(file, 'utf8').split(/\r\n|\n|\r/);

    // if the column we want to use as index is non-existent throw an error
    if (lines[0].split(delimiter).length < index) throw new TypeError('Non-existent index column: '.concat(index));

    // loop through each line of the CSV file
    lines.forEach((line) => {
      // split lines by delimiter
      const cols = line.split(delimiter);
      const obj = {};

      // for each of the keys in the mapping, create an object key with the value of the CSV
      Object.keys(mappings).forEach((key) => {
        if (cols[mappings[key]]) {
          // if it's a string trim it and remove any line breaks
          if (typeof cols[mappings[key]] === 'string' || cols[mappings[key]] instanceof String) {
            obj[key] = cols[mappings[key]].trim();
          } else {
            obj[key] = cols[mappings[key]];
          }
        }
      });
      // set those objects on the corresponding indexes of the map
      const objKey = Number.parseInt(cols[index], 10);
      if (!Number.isNaN(objKey)) {
        map.set(objKey, obj);
      }
    });
  } catch (e) {
    throw e;
  }

  return map;
}

/**
 * Creates a KeyValue Map from a CSV file
 * This is useful to then translate from key to value quickly
 *
 * @param {String} file
 *   Name of the CSV file to create the map from
 * @param {Char} delimiter
 *   The CSV delimiter
 *
 * @return
 *   A KeyValue map with the CSV column 0 as key and column 1 as value
 */
function createKeyValue(file, delimiter = ';', comment = '#') {
  const map = new Map();

  // parameter error handling
  if (!file) throw new TypeError('No CSV file specified');

  try {
    // read CSV file
    const lines = fs.readFileSync(file, 'utf8').split(/\r\n|\n|\r/);

    // loop through each line of the CSV file
    lines.forEach((line) => {
      // split lines by delimiter and make sure it's either a comment or that we have only 2 columns
      // before adding to map
      const cols = line.split(delimiter);

      // eslint-disable-next-line eqeqeq
      if (line.charAt(0) != comment) {
        // eslint-disable-next-line eqeqeq
        if (cols.length == 2) {
          map.set(cols[0].trim(), cols[1].trim());
          // eslint-disable-next-line eqeqeq
        } else if (cols.length != 2) {
          throw new TypeError('Number of columns should be 2');
        }
      }
    });
  } catch (e) {
    throw e;
  }

  return map;
}

module.exports.createIndexed = createIndexed;
module.exports.createKeyValue = createKeyValue;
