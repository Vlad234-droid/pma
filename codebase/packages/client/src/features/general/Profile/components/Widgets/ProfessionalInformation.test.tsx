import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import ProfessionalInformation from './ProfessionalInformation';
import { TILE_WRAPPER } from 'components/Tile';

describe('ProfessionalInformation component', () => {
  const user = {
    hireDate: 'hireDate',
    businessType: 'businessType',
    countryCode: 'countryCode',
  };

  it('it should render ProfessionalInformation wrapper', async () => {
    const { getByTestId } = render(<ProfessionalInformation user={user} />);
    const wrapper = getByTestId(TILE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render ProfessionalInformation info', async () => {
    const { getByText } = render(<ProfessionalInformation user={user} />);
    const title = getByText(/professional information/i);
    const hireDate = getByText(user.hireDate);
    const businessType = getByText(user.businessType);
    const countryCode = getByText(user.hireDate);
    expect(title).toBeInTheDocument();
    expect(businessType).toBeInTheDocument();
    expect(countryCode).toBeInTheDocument();
    expect(hireDate).toBeInTheDocument();
  });
});
