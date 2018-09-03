/*
 * Library for storing and editing data
 *
 */

 // Dependencies
 var fs = require('fs');
 var path = require('path');

 // Container for the module (to be exported)
 var lib = {};

// Base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = function(dir, file, data, callback) {
  // Open the file for writing
  fs.open(lib.basedir + dir + '/' + file + '.json', 'wx', function(err, filedescriptor) {
    if (!err && filedescriptor) {
      // Convert data to string
      var stringdata = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(filedescriptor, stringdata, function(err) {
        if (!err) {
          fs.close(filedescriptor, function(err) {
            if (!err) {
              callback(false);
            } else {
              callback('Error closing new file');
            }
          });
        } else {
          callback('Error writing to new file');
        }
      });
    } else {
      callback('Could not create new file. It may already exist');
    }
  });
};

// Read data from a file
lib.read = function(dir, file, callback) {
  fs.readFile(lib.basedir + dir + '/' + file + '.json', 'utf-8', function(err, data) {
    callback(err, data);
  });
};

// Update data inside a file
lib.update = function(dir, file, data, callback) {
  // Open the file for writing
  fs.open(lib.basedir + dir + '/' + file + '.json', 'r+', function(err, filedescriptor) {
    if (!err && filedescriptor) {
      // Convert data to string
      var stringdata = JSON.stringify(data);

      // Truncate the file
      fs.truncate(filedescriptor, function(err) {
        if (!err) {
          // Write to file and close it
          fs.writeFile(filedescriptor, stringdata, function(err) {
            if (!err) {
              fs.close(filedescriptor, function(err) {
                if (!err) {
                  callback(false);
                } else {
                  callback('Error closing the file');
                }
              });
            } else {
              callback('Error writing to existing file');
            }
          });
        } else {
          callback('Error truncating file');
        }
      });
    } else {
      callback('Could not open the file for updating. It may not exist yet');
    }
  });
};

// Delete a file
lib.delete = function(dir, file, callback) {
  // Unlink the file
  fs.unlink(lib.basedir + dir + '/' + file + '.json', function(err) {
    if (!err) {
      callback(false);
    } else {
      callback('Error deleting the file');
    }
  });
};

 // Export the module
 module.exports = lib;