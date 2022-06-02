import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { Status } from 'config/enum';

import Accordion, { TEST_ID } from './Accordion';

const objectives = [
  {
    id: 1,
    title: 'test',
    subTitle: 'test',
    description: 'test',
    status: 'PENDING' as Status,
    explanations: [
      {
        title: 'test',
        steps: ['test'],
      },
    ],
  },
];

describe('ObjectiveAccordion', () => {
  it('render', () => {
    const { getByTestId } = renderWithTheme(<Accordion objectives={objectives} canShowStatus={false} />);

    const accordion = getByTestId(TEST_ID);

    expect(accordion).toBeInTheDocument();
  });
});
