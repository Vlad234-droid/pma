import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import DescriptionBlock, { TEST_ID } from './DescriptionBlock';

describe('DescriptionBlock', () => {
  it('#render', async () => {
    const { queryByTestId } = render(
      <DescriptionBlock>
        <div>children</div>
      </DescriptionBlock>,
    );
    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });
});
