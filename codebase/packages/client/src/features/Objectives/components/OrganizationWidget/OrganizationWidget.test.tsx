import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import OrganizationWidget, { TEST_ID, CLICK_BUTTON_TEST_ID } from './OrganizationWidget';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('OrganizationWidget', () => {
  const props = {
    onClick: jest.fn(),
  };

  it('should render Organization Widget', async () => {
    const { queryByTestId } = render(<OrganizationWidget {...props} />);
    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });

  it('should be called click', async () => {
    const { getByTestId } = render(<OrganizationWidget {...props} />);
    const button = getByTestId(CLICK_BUTTON_TEST_ID);
    fireEvent.click(button);
    expect(props.onClick).toBeCalled();
  });
});
