import React from 'react';
import { TFunction } from 'components/Translation';
import { Subtitle } from 'components/Subtitle';
import { PriorityList } from 'features/bank/MainWidget';

import { Page } from 'pages';
import { Status } from 'config/enum';
import { Colors } from 'config/types';

export type ContentProps = {
  status?: Status;
  statistics: Record<string, string>;
  count?: number;
  nextReviewDate?: string;
};

export type ContentGraphics = {
  backgroundColor: Colors;
  subTitle: React.ReactNode;
  description?: string;
  buttonText?: string;
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
  const count = Object.values(statistics).reduce((acc, el) => acc + Number(el), 0);

  const config: ContentConfig = {
    viewPage: Page.REVIEWS_VIEW,
    widgetTitle: t('my_quarterly_priorities', 'My Quarterly Priorities'),
    modalTitle: t('create_my_priorities', 'Create my priorities'),
  };

  const createPriorities: ContentGraphics = {
    viewPage: Page.CREATE_OBJECTIVES,
    backgroundColor: 'tescoBlue',
    subTitle: (
      <Subtitle graphic='add' invertColors>
        {t('create_my_priorities', 'Create my priorities')}
      </Subtitle>
    ),
  };

  const hasAnyPriority: ContentGraphics = {
    backgroundColor: 'white',
    subTitle: <PriorityList statistics={statistics} />,
  };

  if (!count || !status) {
    return { ...config, ...createPriorities };
  } else {
    return { ...config, ...hasAnyPriority };
  }
};
