import React from 'react';
import { Page } from 'pages';
import { TFunction } from 'components/Translation';
import { ObjectivesForm } from 'features/bank/ObjectivesForm';
import { ContentConfig, ContentGraphics, ContentProps } from 'features/general/MainWidget/MainWidgetBase';
import { Subtitle } from 'features/general/MainWidget/Subtitle';
import { PriorityList } from './PriorityList';

export const getTescoBankContent = (props: ContentProps, t: TFunction) => {
  const { status, statistic, nextReviewDate: date = '' } = props;
  const WORK_IN_PROGRESS = true;
  const count = status ? statistic?.[status] || 0 : 0;

  const config: ContentConfig = {
    viewPage: Page.REVIEWS_VIEW, //TODO: Replace with proper page
    widgetTitle: t('my_quarterly_priorities', 'My quarterly priorities'),
    modalTitle: t('create_my_priorities', 'Create my priorities'),
    formComponent: ObjectivesForm,
  };

  const createPriorities: ContentGraphics = {
    backgroundColor: 'tescoBlue',
    subTitle: (
      <Subtitle graphic='add' invertColors>
        {t('create_my_priorities', 'Create my priorities')}
      </Subtitle>
    ),
    buttonText: t('create_priorities', 'Create priorities'),
    redirectToViewPage: false,
  };

  const hasAnyPriority: ContentGraphics = {
    backgroundColor: 'white',
    subTitle: <PriorityList />,
    buttonText: t('view_priorities', 'View priorities'),
    redirectToViewPage: true,
  };

  const workInProgress: ContentGraphics = {
    backgroundColor: 'white',
    subTitle: <div>Coming soon</div>,
    buttonText: t('view_priorities', 'View priorities'),
    redirectToViewPage: false,
    disabled: true,
  };

  if (WORK_IN_PROGRESS) {
    return { ...workInProgress, ...config };
  }

  if (!count || !status) {
    return { ...createPriorities, ...config };
  } else {
    return { ...hasAnyPriority, ...config };
  }
};
