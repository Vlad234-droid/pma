//@ts-ignore
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CareerPerformance from './CareerPerformance';
import { renderWithTheme } from '../../utils/test';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { buildPath } from '../../features/Routes';
import { Page } from '../../pages/types';

it('CareerPerformance', async () => {
  const history = createMemoryHistory();
  history.push(buildPath(Page.CONTRIBUTION));
  const { getByTestId } = renderWithTheme(
    <Router history={history}>
      <CareerPerformance />
    </Router>,
  );
  const timeline = getByTestId('timeline');

  expect(timeline).toBeInTheDocument();
});
