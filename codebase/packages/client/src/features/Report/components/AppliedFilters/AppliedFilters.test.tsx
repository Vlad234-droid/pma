import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';
import AppliedFilters, { APPLIED_WRAPPER, CLEAR_FILTER, COLLEAGUES_COUNT } from './AppliedFilters';
import { renderWithTheme as render } from 'utils/test';
import { fireEvent } from '@testing-library/react';

describe('Applied filters', () => {
  const props = {
    clearAppliedFilters: jest.fn(),
    getAppliedReport: ['mocked_title'],
    colleaguesCount: 2,
  };
  it('it should render applied filters', async () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.REPORT));
    const { getByTestId } = render(
      <BrowserRouter>
        <AppliedFilters {...props} />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(APPLIED_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });

  it('it should show 2 colleagues count', () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.REPORT));
    render(
      <BrowserRouter>
        <AppliedFilters {...props} />
      </BrowserRouter>,
    );
    expect(props.colleaguesCount).toBe(2);
  });
  it('it should show 0 colleague count if not passsing colleague prop', () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.REPORT));
    const { getByTestId } = render(
      <BrowserRouter>
        <AppliedFilters clearAppliedFilters={jest.fn()} getAppliedReport={['mocked_title']} />
      </BrowserRouter>,
    );

    const colleaguesCount = getByTestId(COLLEAGUES_COUNT);
    expect(colleaguesCount.textContent).toBe('Colleagues: 0');
  });
  it('it should call clearAppliedFilters prop', () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.REPORT));
    const clearHandler = jest.fn();
    const { getByTestId } = render(
      <BrowserRouter>
        <AppliedFilters clearAppliedFilters={clearHandler} getAppliedReport={['mocked_title']} />
      </BrowserRouter>,
    );

    fireEvent.click(getByTestId(CLEAR_FILTER));
    expect(clearHandler).toHaveBeenCalledTimes(1);
  });
  it('it should not render applied filters', () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.REPORT));
    const clearHandler = jest.fn();
    const { queryByTestId } = render(
      <BrowserRouter>
        <AppliedFilters clearAppliedFilters={clearHandler} getAppliedReport={[]} />
      </BrowserRouter>,
    );

    const deletBtn = queryByTestId(CLEAR_FILTER);
    expect(deletBtn).toBeNull();
  });
});
