import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { jest } from '@jest/globals';

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

configure({ testIdAttribute: 'data-test-id' });
