import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import ProfileTileWrapper from './ProfileTileWrapper';
import { TILE_WRAPPER } from 'components/Tile';

describe('ProfileTileWrapper component', () => {
  const props = { user: { fullName: 'mocked_name', job: 'mocked_job' }, children: <div>mocked_children</div> };
  it('it should render Profile wrapper', async () => {
    const { getByTestId } = render(<ProfileTileWrapper {...props} />);
    const wrapper = getByTestId(TILE_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render mocked text', async () => {
    const { getByText } = render(<ProfileTileWrapper {...props} />);
    const children = getByText('mocked_children');
    expect(children).toBeInTheDocument();
    expect(getByText(props.user.fullName)).toBeInTheDocument();
    expect(getByText(props.user.job)).toBeInTheDocument();
  });
});
