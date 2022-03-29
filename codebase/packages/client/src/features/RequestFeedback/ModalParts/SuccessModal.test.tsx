import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import '@testing-library/jest-dom';
import SuccessModal, { WRAPPER } from './SuccessModal';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('Success modal', () => {
  it('render success modal wrapper', async () => {
    const { getByTestId } = render(<SuccessModal />);
    const wrapper = getByTestId(WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
});
