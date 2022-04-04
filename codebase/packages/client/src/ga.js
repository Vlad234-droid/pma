// eslint-disable-next-line no-undef
window['adrum-start-time'] = new Date().getTime();
(function (config) {
  config.appKey = 'AD-AAB-ABN-WNX';
  config.adrumExtUrlHttp = 'http://cdn.appdynamics.com';
  config.adrumExtUrlHttps = 'https://cdn.appdynamics.com';
  config.beaconUrlHttp = 'http://pdx-col.eum-appdynamics.com';
  config.beaconUrlHttps = 'https://pdx-col.eum-appdynamics.com';
  config.resTiming = { bufSize: 200, clearResTimingOnBeaconSend: true };
  config.maxUrlLength = 512;
  // eslint-disable-next-line no-undef
})(window['adrum-config'] || (window['adrum-config'] = {}));
