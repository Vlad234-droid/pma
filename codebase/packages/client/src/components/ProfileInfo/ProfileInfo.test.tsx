import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import ProfileInfo, { TEST_PHOTO, TEST_WRAPPER, TONE_VOICE } from './ProfileInfo';

describe('ProfileInfo component', () => {
  const props = {
    firstName: 'Name',
    lastName: 'Last Name',
    job: 'Test job',
    department: 'Department',
    toneOfVoice: 'Test tone of voice',
    single: true,
  };
  it('should render wrapper', async () => {
    const { queryByTestId } = render(<ProfileInfo {...props} />);

    const wrapper = queryByTestId(TEST_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });

  it('should render profile image', async () => {
    const { queryByTestId } = render(<ProfileInfo {...props} />);

    const wrapper = queryByTestId(TEST_PHOTO);
    expect(wrapper).toBeInTheDocument();
  });

  it('should render tone of voice', async () => {
    const { queryByTestId } = render(<ProfileInfo {...props} />);

    const wrapper = queryByTestId(TONE_VOICE);
    expect(wrapper).toBeInTheDocument();
  });
});
