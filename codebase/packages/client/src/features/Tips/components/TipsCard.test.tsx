import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import TipsCard, { TIPS_CARD } from './TipsCard';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => jest.fn(),
}));

describe('Tip card', () => {
  const props = {
    card: {
      uuid: 'mocked_uuid',
      title: 'mocked_title',
      description: 'mocked_description',
      imageLink: 'mocked_image',
      createdTime: 'mocked_created_time',
      updatedTime: 'mocked_updated_time',
      published: false,
      targetOrganisation: {
        name: 'mocked_name',
      },
    },
  };
  it('should render tip card', async () => {
    const { getByTestId } = renderWithTheme(<TipsCard {...props} />);
    const tipCard = getByTestId(TIPS_CARD);

    expect(tipCard).toBeInTheDocument();
  });
});
