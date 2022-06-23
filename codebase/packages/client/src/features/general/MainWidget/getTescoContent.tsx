import { Status } from 'config/enum';
import { Page } from 'pages';
import { TFunction } from 'components/Translation';
import { ContentConfig, ContentGraphics, ContentProps } from './MainWidgetBase';
import { ObjectivesForm } from 'features/general/ObjectivesForm';

export const getTescoContent = (props: ContentProps, t: TFunction) => {
  const { status, count, nextReviewDate: date = '' } = props;

  const config: ContentConfig = {
    viewPage: Page.OBJECTIVES_VIEW,
    widgetTitle: t('my_business_objectives', 'My objectives'),
    modalTitle: t('create_objectives', 'Create objectives'),
    formComponent: ObjectivesForm,
  };

  const defaultGraphics: ContentGraphics = {
    graphic: 'add',
    backgroundColor: 'tescoBlue',
    subTitle: t('create_my_objectives', 'Create my objectives'),
    description: 'Remember your objectives should be strategic, relevant and up to date.',
    buttonText: t('create_my_objectives', 'Create my objectives'),
    redirectToViewPage: false,
    invertColors: true,
  };

  if (!status) return { ...defaultGraphics, ...config };

  const contents: {
    [key: string]: ContentGraphics;
  } = {
    [Status.STARTED]: {
      graphic: 'add',
      backgroundColor: 'tescoBlue',
      subTitle: t('create_my_objectives', 'Create my objectives'),
      description: t(
        'remember_your_objectives_should_be_strategic',
        'Remember your objectives should be strategic, relevant and up to date.',
      ),
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToViewPage: false,
      invertColors: true,
    },
    [Status.DRAFT]: {
      graphic: 'roundPencil',
      backgroundColor: 'tescoBlue',
      subTitle: t('objective_is_draft', `${count} objective(s) saved as a draft`, { count }),
      description: t(
        'remember_if_your_priorities_change',
        'Remember if your priorities change, review your objectives',
      ),
      buttonText: t('view_and_edit_objectives', 'View and edit objectives'),
      redirectToViewPage: false,
      invertColors: false,
    },
    [Status.WAITING_FOR_APPROVAL]: {
      graphic: 'roundClock',
      backgroundColor: 'tescoBlue',
      subTitle: t('objective_is_pending', `${count} objective(s) are waiting for approval`, { count }),
      description: t(
        'remember_if_your_priorities_change',
        'Remember if your priorities change, review your objectives',
      ),
      buttonText: t('view', 'View'),
      redirectToViewPage: true,
      invertColors: false,
    },
    [Status.APPROVED]: {
      graphic: 'roundTick',
      backgroundColor: 'white',
      subTitle: t('objective_is_approved', `Well done! All ${count} objective(s) have been approved.`, {
        count,
        date: new Date(date),
      }),
      description: t(
        'remember_if_your_priorities_change',
        'Remember if your priorities change, review your objectives',
      ),
      buttonText: t('view', 'View'),
      redirectToViewPage: true,
      invertColors: false,
    },
    [Status.DECLINED]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: t(
        'your_objectives_were_declined_by_the_line_manager',
        'Your objectives were declined by the Line Manager',
      ),
      description: '',
      buttonText: t('view', 'View'),
      redirectToViewPage: true,
      invertColors: false,
    },
    [Status.OVERDUE]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: t('objectives_are_overdue', 'Objectives are overdue'),
      description: '',
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToViewPage: true,
      invertColors: false,
    },
    [Status.PENDING]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: t('objectives_are_pending', 'Objectives are pending'),
      description: '',
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToViewPage: true,
      invertColors: false,
    },
    [Status.NOT_STARTED]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: t('objectives_are_not_started', 'Objectives are not started'),
      description: '',
      buttonText: t('create_my_objectives', 'Create my objectives'),
      redirectToViewPage: true,
      invertColors: false,
    },
  };

  const content = contents[status] || defaultGraphics;

  return { ...content, ...config };
};
