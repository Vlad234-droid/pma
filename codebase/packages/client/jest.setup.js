import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { jest } from '@jest/globals';
import { TextEncoder, TextDecoder } from 'util';

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

configure({ testIdAttribute: 'data-test-id' });
