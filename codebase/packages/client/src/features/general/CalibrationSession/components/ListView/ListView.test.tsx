import React from 'react';
import { renderWithTheme as render } from 'utils/test';
import ListView, { VIEW_WRAPPER } from './ListView';
import { ActiveList } from '../../utils/types';
import { fireEvent } from '@testing-library/react';

describe('ListView', () => {
  const setActive = jest.fn();
  const props = {
    active: ActiveList.LIST,
    setActive,
  };

  it('it should render view component', () => {
    const { getByTestId } = render(<ListView {...props} />);
    const wrapper = getByTestId(VIEW_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render view component', () => {
    const { getByText } = render(<ListView {...props} />);
    const graph = getByText(/graph/i);
    fireEvent.click(graph);
    expect(setActive).toHaveBeenCalledTimes(1);
  });
});
