import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import ColleagueProfile, { TILE_WRAPPER, NAME } from './ColleagueProfile';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('ColleagueProfile component', () => {
  const props = {
    colleague: {
      businessType: 'Office',
      firstName: 'Mykola',
      jobName: null,
      lastName: 'Kotov',
      lineManager: null,
      middleName: null,
      uuid: 'c8727e57-8844-4db5-b1b3-7548b7582244',
      tags: {},
    },
  };

  it('it should render colleague profile wrapper', async () => {
    const { getByTestId } = render(<ColleagueProfile {...props} />);
    const wrapper = getByTestId(TILE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should receive propper name and last name', async () => {
    render(<ColleagueProfile {...props} />);
    expect(props.colleague.firstName).toBe('Mykola');
    expect(props.colleague.lastName).toBe('Kotov');
  });
  it('it should render first and last names', async () => {
    const { getByTestId } = render(<ColleagueProfile {...props} />);
    const info = getByTestId(NAME);
    expect(info.textContent).toEqual('Mykola Kotov');
  });
});
