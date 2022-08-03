import React from 'react';
import { Status } from 'config/enum';
import { Page } from 'pages';
import { TFunction } from 'components/Translation';
import { ContentConfig, ContentGraphics, ContentProps } from './MainWidgetBase';
import { ObjectivesForm } from 'features/general/ObjectivesForm';
import { Subtitle } from './Subtitle';

export const getTescoContent = (props: ContentProps, t: TFunction) => {
  const { status, count, nextReviewDate: date = '' } = props;

  const config: ContentConfig = {
    viewPage: Page.REVIEWS_VIEW,
    widgetTitle: t('my_business_objectives', 'My objectives'),
    modalTitle: t('create_objectives', 'Create objectives'),
    formComponent: ObjectivesForm,
  };

  const defaultGraphics: ContentGraphics = {
    backgroundColor: 'tescoBlue',
    subTitle: (
      <Subtitle graphic='add' invertColors>
        {t('create_my_objectives', 'Create my objectives')}
      </Subtitle>
    ),
    description: 'Remember your objectives should be strategic, relevant and up to date.',
    buttonText: t('create_my_objectives', 'Create my objectives'),
    redirectToViewPage: false,
  };

  if (!status) return { ...defaultGraphics, ...config };

  const contents: {
    [key: string]: ContentGraphics;
  } = {
    [Status.STARTED]: {
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
      redirectToViewPage: false,
    },
    [Status.DRAFT]: {
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
      redirectToViewPage: false,
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
      redirectToViewPage: true,
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
      redirectToViewPage: true,
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
      redirectToViewPage: true,
    },
    [Status.OVERDUE]: {
      backgroundColor: 'tescoBlue',
      subTitle: <Subtitle graphic='roundAlert'>{t('objectives_are_overdue', 'Objectives are overdue')}</Subtitle>,
      description: '',
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToViewPage: true,
    },
    [Status.PENDING]: {
      backgroundColor: 'tescoBlue',
      subTitle: <Subtitle graphic='roundAlert'>{t('objectives_are_pending', 'Objectives are pending')}</Subtitle>,
      description: '',
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToViewPage: true,
    },
    [Status.NOT_STARTED]: {
      backgroundColor: 'tescoBlue',
      subTitle: (
        <Subtitle graphic='roundAlert'>{t('objectives_are_not_started', 'Objectives are not started')}</Subtitle>
      ),
      description: '',
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToViewPage: true,
    },
  };

  const content = contents[status] || defaultGraphics;

  return { ...content, ...config };
};
