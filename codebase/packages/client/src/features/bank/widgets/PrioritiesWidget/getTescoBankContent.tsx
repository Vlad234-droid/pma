import React from 'react';
import { Page } from 'pages';
import { TFunction } from 'components/Translation';
import { ContentConfig, ContentGraphics } from './PrioritiesWidget';
import { Subtitle } from './Subtitle';
import { PriorityList } from './PriorityList';
import { Status } from 'config/enum';

export type ContentProps = {
  status?: Status;
  statistic?: object;
};

export const getTescoBankContent = (props: ContentProps, t: TFunction) => {
  const { status, statistic } = props;
  const WORK_IN_PROGRESS = true;
  const count = status ? statistic?.[status] || 0 : 0;

  const config: ContentConfig = {
    viewPage: Page.REVIEWS_VIEW, //TODO: Replace with proper page
    widgetTitle: t('my_quarterly_priorities', 'My quarterly priorities'),
    modalTitle: t('create_my_priorities', 'Create my priorities'),
  };

  const createPriorities: ContentGraphics = {
    backgroundColor: 'tescoBlue',
    subTitle: (
      <Subtitle graphic='add' invertColors>
        {t('create_my_priorities', 'Create my priorities')}
      </Subtitle>
    ),
    buttonText: t('create_priorities', 'Create priorities'),
  };

  const hasAnyPriority: ContentGraphics = {
    backgroundColor: 'white',
    subTitle: <PriorityList />,
    buttonText: t('view_priorities', 'View priorities'),
  };

  const workInProgress: ContentGraphics = {
    backgroundColor: 'white',
    subTitle: <div>Coming soon</div>,
    buttonText: t('view_priorities', 'View priorities'),
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
