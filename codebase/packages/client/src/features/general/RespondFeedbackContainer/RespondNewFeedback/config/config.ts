export const getPayload = (data, feedbackItems, colleagueUuid, uuid, targetId, targetType) => ({
  ...data,
  feedbackItems: [
    ...data.feedbackItems.map((item) => ({
      ...item,
      ...(feedbackItems.find((feedback) => feedback.code === item.code)?.uuid && {
        uuid: feedbackItems.find((feedback) => feedback.code === item.code)?.uuid,
      }),
    })),
    ...feedbackItems.filter(
      (item) =>
        item.code === 'comment_to_day_job' ||
        item.code === 'comment_to_your_self' ||
        item.code === 'comment_to_your_impact' ||
        item.code === 'comment_to_objective' ||
        item.code === 'comment_to_request',
    ),
  ],
  colleagueUuid,
  uuid,
  targetId,
  targetType,
});

export const getFeedbackFields = (t) => {
  return [
    {
      id: '0',
      code: 'Question 1',
      title: t(
        'looking_back_at_what_you_seen_recently',
        "Looking back at what you've seen recently, in relation to the area I've asked for feedback on, what can you tell me about what I've delivered or how I've gone about it?",
      ),
      description: t('share_specific_examples', "Share specific examples of what you've seen."),
      field: {
        id: '1',
        type: 'textarea',
      },
    },
    {
      id: '1',
      code: 'Question 2',
      title: t(
        'looking_forward_in_relation',
        "Looking forward, in relation to the area I've asked for feedback on, what should I do more (or less) of in order to be at my best?",
      ),
      description: t('share_your_suggestions', 'Share your suggestions'),
      field: {
        id: '2',
        type: 'textarea',
      },
    },
    {
      id: '2',
      code: 'Anything else?',
      title: t('add_any_other_comments', 'Add any other comments you would like to share with your colleague.'),
      field: {
        id: '3',
        type: 'textarea',
      },
    },
  ];
};
