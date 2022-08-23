import React from 'react';
import { TFunction } from 'components/Translation';
import { Subtitle } from 'components/Subtitle';
import { PriorityList } from 'features/bank/MainWidget';

import { Page } from 'pages';
import { Status } from 'config/enum';
import { Colors } from 'config/types';

export type ContentProps = {
  status?: Status;
  statistics?: object;
  count?: number;
  nextReviewDate?: string;
};

export type ContentGraphics = {
  backgroundColor: Colors;
  subTitle: React.ReactNode;
  description?: string;
  buttonText: string;
  disabled?: boolean;
  viewPage?: Page;
};

export type ContentConfig = {
  viewPage: Page;
  widgetTitle: string;
  modalTitle: string;
  formComponent?: React.FC;
};

export const getTescoBankContent = (props: ContentProps, t: TFunction) => {
  const { status, statistics, nextReviewDate: date = '' } = props;
  const WORK_IN_PROGRESS = true;
  const count = status ? statistics?.[status] || 0 : 0;

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
