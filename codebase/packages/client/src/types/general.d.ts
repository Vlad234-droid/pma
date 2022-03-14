import { PressEvents as BasePressEvents } from '@react-types/shared';
import { theme as baseTheme } from '@dex-ddl/core';

import merge from 'lodash.merge';
import * as secondaryTheme from 'theme';
declare type Nullable<T> = T | null;

declare module '*.html' {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare namespace NodeJS {
  enum AppMode {
    standalone = 'standalone',
    integrity = 'integrity',
  }

  enum Environment {
    local = 'local',
    dev = 'dev',
    ppe = 'ppe',
    prod = 'prod',
  }

  interface ProcessEnv {
    // General
    PORT: number;
    NODE_ENV: keyof typeof Environment;
    PUBLIC_URL: string;

    // Integration
    REACT_APP_INTEGRATION_MODE: keyof typeof AppMode;
    REACT_APP_API_URL: string;
    REACT_APP_API_VERSION: vstring;
  }

  export interface Process {
    env: ProcessEnv;
  }
}

// todo remove after merge with new dex version
declare module '@react-types/shared' {
  export interface PressEvents extends BasePressEvents {
    onClick?: any;
  }
}

// todo remove after merge with new dex version
declare module '@dex-ddl/core' {
  export const theme = merge(baseTheme, secondaryTheme);
  export type Theme = typeof theme;
}
