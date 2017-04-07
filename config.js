const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('settings.properties');

var Config = function(callback) {}

Config.prototype.getGMapsKey = function () {
  return properties.get('secret.gmaps.auth.key');
};

module.exports = new Config();
