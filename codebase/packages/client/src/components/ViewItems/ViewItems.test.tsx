import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';
import ViewItems, { APPLIED_WRAPPER, CLEAR_ITEM } from './ViewItems';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';

describe('Applied items', () => {
  const props = {
    onDelete: jest.fn(),
    items: ['mocked_title'],
  };
  it('it should render applied items', async () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.REPORT));
    const { getByTestId } = render(
      <BrowserRouter>
        <ViewItems {...props} />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(APPLIED_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });

  it('it should call onDelete prop', () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.REPORT));
    const clearHandler = jest.fn();
    const { getByTestId } = render(
      <BrowserRouter>
        <ViewItems onDelete={clearHandler} items={['mocked_title']} />
      </BrowserRouter>,
    );

    fireEvent.click(getByTestId(CLEAR_ITEM));
    expect(clearHandler).toHaveBeenCalledTimes(1);
  });
  it('it should not render applied items', () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.REPORT));
    const clearHandler = jest.fn();
    const { queryByTestId } = render(
      <BrowserRouter>
        <ViewItems onDelete={clearHandler} items={[]} />
      </BrowserRouter>,
    );

    const deletBtn = queryByTestId(CLEAR_ITEM);
    expect(deletBtn).toBeNull();
  });
});
