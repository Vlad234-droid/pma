import { useEffect } from 'react';
import { APP_DYNAMICS_APP_KEY } from '../config/constants';

function addScript({ document, innerText = '', src = '' }) {
  const script = document.createElement('script');
  if (innerText) script.innerText = innerText;
  if (src) script.src = src;
  document.body.appendChild(script);
  return script;
}

export const useMonitoring = (document) => {
  useEffect(() => {
    if (!APP_DYNAMICS_APP_KEY) return;
    const innerText = `window["adrum-start-time"] = new Date().getTime(); (function(config){ config.appKey = "${APP_DYNAMICS_APP_KEY}"; config.adrumExtUrlHttp = "http://cdn.appdynamics.com"; config.adrumExtUrlHttps = "https://cdn.appdynamics.com"; config.beaconUrlHttp = "http://pdx-col.eum-appdynamics.com"; config.beaconUrlHttps = "https://pdx-col.eum-appdynamics.com"; config.resTiming = {"bufSize":200,"clearResTimingOnBeaconSend":true}; config.maxUrlLength = 512; })(window["adrum-config"] || (window["adrum-config"] = {}));`;
    const script = addScript({ document, innerText });
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!APP_DYNAMICS_APP_KEY) return;
    const src = '//cdn.appdynamics.com/adrum/adrum-20.12.0.3360.js';
    const script = addScript({ document, src });
    return () => {
      document.body.removeChild(script);
    };
  }, []);
};
