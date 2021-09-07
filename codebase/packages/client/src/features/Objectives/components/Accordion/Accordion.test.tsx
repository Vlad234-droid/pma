import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';

import Accordion, { TEST_ID } from './Accordion';

const objectives = [
  {
    id: 'test-id-1',
    title: 'test',
    subTitle: 'test',
    description: 'test',
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
    const { getByTestId } = renderWithTheme(<Accordion objectives={objectives} />);

    const accordion = getByTestId(TEST_ID);

    expect(accordion).toBeInTheDocument();
  });
});
