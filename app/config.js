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
  'maxChecks': 5
};

// Production environment
environments.production = {
  'httpPort' : 1234,
  'httpsPort' : 1235,
  'envName' : 'production',
  'hashingsecret': 'thisIsASecret',
  'maxChecks': 5
}

// Determine which env was passed as argument
var currentenvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check current env is in the list. If not, default to staging
var environmenttoexport = typeof(environments[currentenvironment]) == 'object' ? environments[currentenvironment] : environments.staging;

// Export the module
module.exports = environmenttoexport;
