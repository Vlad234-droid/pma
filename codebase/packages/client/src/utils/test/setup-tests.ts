import '@testing-library/jest-dom/extend-expect';
import { configure } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';

configure({ testIdAttribute: 'data-test-id' });

export let matchMediaMock: MatchMediaMock;

beforeEach(() => {
  matchMediaMock = new MatchMediaMock();
});

afterEach(() => {
  matchMediaMock.clear();
});
