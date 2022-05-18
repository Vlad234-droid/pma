import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import ModalWrapper from './ModalWrapper';

describe('ModalWrapper', () => {
  it('should render ModalWrapper children', async () => {
    const { getByText } = render(
      <ModalWrapper isOpen={true}>
        <div>Test children</div>
      </ModalWrapper>,
    );

    const children = getByText('Test children');
    expect(children).toBeInTheDocument();
  });
});
