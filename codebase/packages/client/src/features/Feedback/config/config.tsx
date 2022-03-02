import React from 'react';
import { ConfigProps as Props } from './types';
import { Page } from 'pages';
import { Chat } from 'components/Icon/graphics/chat';
import { NotiBell } from 'components/Icon/graphics/notiBell';
import { NotiBellCirlceOut } from 'components/Icon/graphics/notiBellCirlceOut';
import { People } from 'components/Icon/graphics/people';
import { useSelector } from 'react-redux';
import { getGivenFeedbacksSelector, getRequestedFeedbacksSelector } from '@pma/store';
import { useTranslation } from 'components/Translation';

export const getCards = (): Props[] => {
  const { t } = useTranslation();
  const givenFeedbacks = useSelector(getGivenFeedbacksSelector);
  const requestedFeedbacks = useSelector(getRequestedFeedbacksSelector);

  return [
    {
      id: 1,
      action: t('give_feedback', 'Give feedback'),
      text: t('give_in_the_moment_feedback_to_a_colleague', 'Give in the moment feedback to a colleague'),
      icon: <Chat />,
      iconText: t(
        'your_feedback_will_be_immediately_available_for_your_colleague_to_view',
        'Your feedback will be immediately available for your colleague to view',
      ),
      link: `/${Page.GIVE_FEEDBACK}`,
    },
    {
      id: 2,
      action: t('view_your_feedback', 'View your feedback'),
      text: t(
        'see_the_feedback_your_colleagues_have_shared_with_you',
        'See the feedback your colleagues have shared with you',
      ),
      icon: givenFeedbacks ? <NotiBell /> : <NotiBellCirlceOut />,
      iconText: t('you_have_new_feedback_to_view', `You have ${givenFeedbacks} new feedback to view`, {
        givenFeedbacks,
      }),
      link: `/${Page.VIEW_FEEDBACK}`,
    },
    {
      id: 3,
      action: t('respond_to_feedback_requests', 'Respond to feedback requests'),
      text: t(
        'see_and_respond_to_feedback_requests_from_your_colleagues',
        'See and respond to feedback requests from your colleagues',
      ),
      icon: requestedFeedbacks ? <NotiBell /> : <NotiBellCirlceOut />,
      iconText: t('you_have_new_feedback_requests', `You have ${requestedFeedbacks} new feedback requests`, {
        requestedFeedbacks,
      }),
      link: `/${Page.RESPOND_FEEDBACK}`,
    },
    {
      id: 4,
      action: t('request_feedback', 'Request feedback'),
      text: t('ask_for_feedback_from_your_colleagues', 'Ask for feedback from your colleagues'),
      icon: <People />,
      iconText: t('send_new_feedback_requests', 'Send new feedback requests'),
      link: `/${Page.REQUEST_FEEDBACK}`,
    },
  ];
};
