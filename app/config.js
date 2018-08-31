/*
 * Create and export config variables
 *
 */

// Container for all environments
var environments = {};

// Staging (default) environment
environments.staging = {
  'port' : 3000,
  'envName' : 'staging'
};

// Production environment
environments.production = {
  'port' : 1234,
  'envName' : 'production'
}

// Determine which env was passed as argument
var currentenvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check current env is in the list. If not, default to staging
var environmenttoexport = typeof(environments[currentenvironment]) == 'object' ? environments[currentenvironment] : environments.staging;

// Export the module
module.exports = environmenttoexport;
