import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import HoverContainer, { TEST_ID } from './HoverContainer';

describe('Hover Container', () => {
  const props = {
    message: 'Message',
    isActive: false,
  };

  it('#render', async () => {
    const { queryByTestId } = render(
      <HoverContainer {...props}>
        <div>Test children</div>
      </HoverContainer>,
    );
    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });

  it('should render children', async () => {
    const { getByText } = render(
      <HoverContainer {...props}>
        <div>Test children</div>
      </HoverContainer>,
    );

    const children = getByText('Test children');
    expect(children).toBeInTheDocument();
  });

  it('should contain message', async () => {
    const newProps = {
      ...props,
      isActive: true,
    };
    const { getByTestId, findByText } = render(
      <HoverContainer {...newProps}>
        <div>Test children</div>
      </HoverContainer>,
    );

    const wrapper = getByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();

    fireEvent.mouseOver(wrapper);

    expect(await findByText(props.message)).toBeVisible();
  });
});
