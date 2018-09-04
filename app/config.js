/*
 * Create and export config variables
 *
 */

// Container for all environments
var environments = {};

// Staging (default) environment
environments.staging = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging',
  'hashingsecret': 'thisIsASecret',
  'maxChecks': 5,
  'twilio' : {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
  }
};

// Production environment
environments.production = {
  'httpPort' : 1234,
  'httpsPort' : 1235,
  'envName' : 'production',
  'hashingsecret': 'thisIsASecret',
  'maxChecks': 5,
  'twilio' : {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
  }
}

// Determine which env was passed as argument
var currentenvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check current env is in the list. If not, default to staging
var environmenttoexport = typeof(environments[currentenvironment]) == 'object' ? environments[currentenvironment] : environments.staging;

// Export the module
module.exports = environmenttoexport;
