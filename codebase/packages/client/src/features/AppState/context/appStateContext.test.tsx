import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import AppStateProvider from './appStateContext';
import { TEST_CLOSE } from '../components/ModalError/ModalError';
import * as redux from 'react-redux';

describe('appStateContext', () => {
  it('AppStateProvider should render children', async () => {
    const { getByText } = render(
      <AppStateProvider>
        <div>Test children</div>
      </AppStateProvider>,
    );

    expect(getByText('Test children')).toBeInTheDocument();
  });

  it('AppStateProvider should render ModalError component', async () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({
      modalError: {
        title: 'Title',
        description: 'Description',
      },
    });

    const { queryByTestId } = render(
      <AppStateProvider>
        <div>Test children</div>
      </AppStateProvider>,
    );

    expect(queryByTestId(TEST_CLOSE)).toBeInTheDocument();
  });
});
