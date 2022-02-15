import '@testing-library/jest-dom/extend-expect';
import { configure } from '@testing-library/react';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

configure({ testIdAttribute: 'data-test-id' });

// export let matchMediaMock: MatchMediaMock;
//
// beforeEach(() => {
//   matchMediaMock = new MatchMediaMock();
// });
//
// afterEach(() => {
//   matchMediaMock.clear();
// });
