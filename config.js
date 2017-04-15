const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('settings.properties');

var Config = function(callback) {}

Config.prototype.getGMapsKey = function () {
  return properties.get('secret.gmaps.auth.key');
};

Config.prototype.getMapboxPrivateKey = function () {
  return properties.get('secret.mapbox.private.auth.key');
};

Config.prototype.getMapboxPublicKey = function () {
  return properties.get('secret.mapbox.public.auth.key');
};

module.exports = new Config();
