import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import ModalWrapper from './ModalWrapper';

describe('PDP Form', () => {
  it('should render Form', async () => {
    const { getByText } = render(
      <ModalWrapper isOpen={true}>
        <div>Test children</div>
      </ModalWrapper>,
    );

    const children = getByText('Test children');
    expect(children).toBeInTheDocument();
  });
});
