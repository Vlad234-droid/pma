import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import GiveFeedBack, { FEEDBACK_WRAPPER, LIST_WRAPPER } from './GiveFeedBack';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('Give feedback page', () => {
  it('render give feedback wrapper', async () => {
    const { getByTestId } = render(<GiveFeedBack />);
    const wrapper = getByTestId(FEEDBACK_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render list wrapper', async () => {
    const { getByTestId } = render(<GiveFeedBack />);
    const wrapper = getByTestId(LIST_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
});
