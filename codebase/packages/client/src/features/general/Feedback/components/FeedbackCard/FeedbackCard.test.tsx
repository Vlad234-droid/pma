import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import FeedbackCard, { FEEDBACK_CARD_WRAPPER } from './FeedbackCard';
import { Icon } from 'components/Icon';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

describe('Feedback card', () => {
  const testHandler = jest.fn();

  const props = {
    action: 'Give feedback',
    text: 'Your feedback will be immediately available for your colleague to view',
    icon: <Icon graphic={'chat'} />,
    iconText: 'Give in the moment feedback to a colleague',
    onClick: testHandler,
  };

  it('it should render feedback card', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <FeedbackCard {...props} />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(FEEDBACK_CARD_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('should render card text', () => {
    const { getByText } = render(
      <BrowserRouter>
        <FeedbackCard {...props} />
      </BrowserRouter>,
    );
    const title = getByText(/Give feedback/i);
    const description = getByText(/Your feedback will be immediately available for your colleague to view/i);
    const iconText = getByText(/Give in the moment feedback to a colleague/i);
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(iconText).toBeInTheDocument();
  });
  it('feedback card click', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <FeedbackCard {...props} />
      </BrowserRouter>,
    );
    const card = getByTestId(FEEDBACK_CARD_WRAPPER);
    fireEvent.click(card);
    expect(testHandler).toBeCalled();
  });
});
