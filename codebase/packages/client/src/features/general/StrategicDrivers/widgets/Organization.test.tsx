import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Organization from './Organization';
import { TILE_WRAPPER } from 'components/Tile';

describe('Organization widget', () => {
  const onClick = jest.fn();
  const props = {
    onClick,
  };
  const content = {
    description: 'Your organization has 6 drivers share to all colleagues',
    actionTitle: 'View',
  };
  it('it should render Organization widget', async () => {
    const { getByTestId } = render(<Organization {...props} />);
    const wrapper = getByTestId(TILE_WRAPPER);

    expect(wrapper).toBeInTheDocument();
  });
  it('it should render Organization content', async () => {
    const { getByText } = render(<Organization {...props} />);
    const description = getByText(content.description);
    const actionTitle = getByText(content.actionTitle);

    expect(description).toBeInTheDocument();
    expect(actionTitle).toBeInTheDocument();
  });

  it('it should render Organization content', async () => {
    const { getByText } = render(<Organization {...props} />);
    const description = getByText(content.description);
    const actionTitle = getByText(content.actionTitle);

    expect(description).toBeInTheDocument();
    expect(actionTitle).toBeInTheDocument();
  });

  it('it should call onClick', async () => {
    const { getByText } = render(<Organization {...props} />);
    const button = getByText(content.actionTitle);

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
