import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import ViewFeedback, { WRAPPER } from './ViewFeedback';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('ViewFeedback page', () => {
  it('render ViewFeedback wrapper', async () => {
    const { getByTestId } = renderWithTheme(<ViewFeedback />);
    const wrapper = getByTestId(WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render help modal', async () => {
    const { queryByTestId, getByTestId } = renderWithTheme(<ViewFeedback />);
    const button = getByTestId('informationn');
    expect(queryByTestId('help-wrapper')).toBeNull();
    fireEvent.click(button);
    const modal = getByTestId('help-wrapper');
    expect(modal).toBeInTheDocument();
  });
  it('it should render download modal', async () => {
    const { queryByTestId } = renderWithTheme(<ViewFeedback />);

    expect(queryByTestId('download-wrapper')).toBeNull();

    const modal = queryByTestId('download-wrapper');
    expect(modal).toBeNull();
  });
});
