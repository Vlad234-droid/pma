import {
  createUILogger,
  SendUILog,
  sendLogToConsole,
} from '@energon/splunk-logger-ui';
import { UI_LOGGER_PATH } from '@energon/splunk-logger-core';

export const uiLogger: SendUILog = (...args) => {
    const sendLogToServer = createUILogger('/server-root' + UI_LOGGER_PATH);
  
    if (process.env.NODE_ENV === 'development') {
      sendLogToConsole(...args);
    }
  
    sendLogToServer(...args);
  };