import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import { BrowserRouter } from 'react-router-dom';
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
      firstName: 'firstName',
      jobName: null,
      lastName: 'lastName',
      lineManager: null,
      middleName: null,
      uuid: 'c8727e57-8844-4db5-b1b3-7548b7582244',
      tags: {},
    },
  };

  it('it should render colleague profile wrapper', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ColleagueProfile {...props} />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(TILE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should receive propper name and last name', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <ColleagueProfile {...props} />
      </BrowserRouter>,
    );
    const firstName = getByText(/firstName/i);
    const lastName = getByText(/lastName/i);
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
  });
  it('it should render first and last names', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ColleagueProfile {...props} />
      </BrowserRouter>,
    );
    const fullName = getByTestId(NAME);
    expect(fullName.textContent).toEqual(`${props.colleague.firstName} ${props.colleague.lastName}`);
  });
});
