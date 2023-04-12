import React from 'react';
import { TFunction } from 'components/Translation';
import { Subtitle } from 'components/Subtitle';

import { Status } from 'config/enum';
import { Page } from 'pages';
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

export const getTescoContent = (props: ContentProps, t: TFunction) => {
  const { status, statistics, nextReviewDate: date = '' } = props;
  const count = status ? statistics?.[status]?.count || 0 : 0;

  const isEditPage =
    statistics?.[Status.WAITING_FOR_APPROVAL] || statistics?.[Status.DECLINED] || statistics?.[Status.APPROVED];

  const config: ContentConfig = {
    viewPage: Page.REVIEWS_VIEW,
    widgetTitle: t('my_business_objectives', 'My objectives'),
    modalTitle: t('create_objectives', 'Create objectives'),
  };

  const defaultGraphics: ContentGraphics = {
    viewPage: Page.CREATE_OBJECTIVES,
    backgroundColor: 'tescoBlue',
    subTitle: (
      <Subtitle graphic='add' invertColors>
        {t('create_my_objectives', 'Create my objectives')}
      </Subtitle>
    ),
    description: 'Remember your objectives should be strategic, relevant and up to date.',
    buttonText: t('create_my_objectives', 'Create my objectives'),
  };

  if (!status) return { ...defaultGraphics, ...config };

  const contents: {
    [key: string]: ContentGraphics;
  } = {
    [Status.STARTED]: {
      viewPage: Page.CREATE_OBJECTIVES,
      backgroundColor: 'tescoBlue',
      subTitle: (
        <Subtitle graphic='add' invertColors>
          {t('create_my_objectives', 'Create my objectives')}
        </Subtitle>
      ),
      description: t(
        'remember_your_objectives_should_be_strategic',
        'Remember your objectives should be strategic, relevant and up to date.',
      ),
      buttonText: t('create_my_objectives', 'Create my objectives'),
    },
    [Status.DRAFT]: {
      viewPage: isEditPage ? Page.REVIEWS_VIEW : Page.EDIT_OBJECTIVES,
      backgroundColor: 'tescoBlue',
      subTitle: (
        <Subtitle graphic='roundPencil'>
          {t('objective_is_draft', `${count} objective(s) saved as a draft`, { count })}
        </Subtitle>
      ),
      description: t(
        'remember_if_your_priorities_change',
        'Remember if your priorities change, review your objectives',
      ),
      buttonText: t('view_and_edit_objectives', 'View and edit objectives'),
    },
    [Status.WAITING_FOR_APPROVAL]: {
      backgroundColor: 'tescoBlue',
      subTitle: (
        <Subtitle graphic='roundClock'>
          {t('objective_is_pending', `${count} objective(s) are waiting for approval`, { count })}
        </Subtitle>
      ),
      description: t(
        'remember_if_your_priorities_change',
        'Remember if your priorities change, review your objectives',
      ),
      buttonText: t('view', 'View'),
    },
    [Status.APPROVED]: {
      backgroundColor: 'white',
      subTitle: (
        <Subtitle graphic='roundTick'>
          {t('objective_is_approved', `Well done! All ${count} objective(s) have been approved.`, {
            count,
            date: new Date(date),
          })}
        </Subtitle>
      ),
      description: t(
        'remember_if_your_priorities_change',
        'Remember if your priorities change, review your objectives',
      ),
      buttonText: t('view', 'View'),
    },
    [Status.DECLINED]: {
      backgroundColor: 'tescoBlue',
      subTitle: (
        <Subtitle graphic='roundAlert'>
          {t('your_objectives_were_declined_by_the_line_manager', 'Your objectives were declined by the Line Manager')}
        </Subtitle>
      ),
      description: '',
      buttonText: t('view', 'View'),
    },
    [Status.OVERDUE]: {
      viewPage: Page.REVIEWS_VIEW,
      backgroundColor: 'tescoBlue',
      subTitle: <Subtitle graphic='roundAlert'>{t('objectives_are_overdue', 'Objectives are overdue')}</Subtitle>,
      description: '',
      buttonText: t('view', 'View'),
    },
    [Status.PENDING]: {
      viewPage: Page.CREATE_OBJECTIVES,
      backgroundColor: 'tescoBlue',
      subTitle: <Subtitle graphic='roundAlert'>{t('objectives_are_pending', 'Objectives are pending')}</Subtitle>,
      description: '',
      buttonText: t('create_my_objectives', 'Create my objectives'),
    },
    [Status.NOT_STARTED]: {
      viewPage: Page.CREATE_OBJECTIVES,
      backgroundColor: 'tescoBlue',
      subTitle: (
        <Subtitle graphic='roundAlert'>{t('objectives_are_not_started', 'Objectives are not started')}</Subtitle>
      ),
      description: '',
      buttonText: t('create_my_objectives', 'Create my objectives'),
    },
  };
  const content = contents[status] || defaultGraphics;

  return { ...config, ...content };
};
