import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import FeedbackCard, { FEEDBACK_CARD_WRAPPER } from './FeedbackCard';
import { Icon } from 'components/Icon';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Page } from 'pages';
import { buildPath } from 'features/general/Routes';

describe('Feedback card', () => {
  const props = {
    card: {
      id: 1,
      action: 'Give feedback',
      text: 'Your feedback will be immediately available for your colleague to view',
      icon: <Icon graphic={'chat'} />,
      iconText: 'Give in the moment feedback to a colleague',
      link: Page.GIVE_FEEDBACK,
    },
  };

  it('it should render feedback card', () => {
    const history = createMemoryHistory();
    history.push(buildPath(Page.FEEDBACK));
    const { getByTestId } = render(
      <BrowserRouter>
        <FeedbackCard {...props} />
      </BrowserRouter>,
    );
    const wrapper = getByTestId(FEEDBACK_CARD_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('should receive text feedback', () => {
    render(
      <BrowserRouter>
        <FeedbackCard {...props} />
      </BrowserRouter>,
    );
    expect(props.card.text).toBe('Your feedback will be immediately available for your colleague to view');
  });
  it('should receive action title', () => {
    render(
      <BrowserRouter>
        <FeedbackCard {...props} />
      </BrowserRouter>,
    );
    expect(props.card.action).toBe('Give feedback');
  });
  it('should receive link', () => {
    render(
      <BrowserRouter>
        <FeedbackCard {...props} />
      </BrowserRouter>,
    );
    expect(props.card.link).toBe('feedback/give');
  });
});
