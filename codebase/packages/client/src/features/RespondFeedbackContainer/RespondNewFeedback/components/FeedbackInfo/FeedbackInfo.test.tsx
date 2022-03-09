import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import FeedbackInfo from './FeedbackInfo';
import { INFO_WRAPPER, GIVE_FEEDBACK_VIDEO } from './FeedbackInfo';

describe('Feedback info container', () => {
  const props = {
    onClickMore: jest.fn(),
  };

  it('it should render info container', () => {
    const { getByTestId } = render(<FeedbackInfo {...props} />);
    const wrapper = getByTestId(INFO_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('should render video', () => {
    const { getByTestId } = render(<FeedbackInfo {...props} />);
    const player = getByTestId(GIVE_FEEDBACK_VIDEO);
    expect(player).toBeInTheDocument();
  });
});
