import { Status } from 'config/enum';
import { Page } from 'pages';
import { TFunction } from 'components/Translation';
import { ContentConfig, ContentGraphics, ContentProps } from 'features/general/MainWidget';
import { ObjectivesForm } from 'features/bank/ObjectivesForm';

//TODO: Review all statuses and text
export const getTescoBankContent = (props: ContentProps, t: TFunction) => {
  const { status, count, nextReviewDate: date = '' } = props;

  const config: ContentConfig = {
    viewPage: Page.OBJECTIVES_VIEW, //TODO: Replace with proper page
    widgetTitle: t('my_quarterly_priorities', 'My quarterly priorities'),
    modalTitle: t('create_my_priorities', 'Create my priorities'),
    formComponent: ObjectivesForm,
  };

  const defaultGraphics: ContentGraphics = {
    graphic: 'add',
    backgroundColor: 'tescoBlue',
    subTitle: t('create_my_priorities', 'Create my priorities'),
    description: 'Remember your priorities should be strategic, relevant and up to date.',
    buttonText: t('create_my_priorities', 'Create my priorities'),
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
      subTitle: t('create_my_priorities', 'Create my priorities'),
      description: t(
        'remember_your_priorities_should_be_strategic',
        'Remember your priorities should be strategic, relevant and up to date.',
      ),
      buttonText: t('create_my_priorities', 'Create my priorities'),
      redirectToViewPage: false,
      invertColors: true,
    },
    [Status.DRAFT]: {
      graphic: 'roundPencil',
      backgroundColor: 'tescoBlue',
      subTitle: t('priority_is_draft', `${count} priority(ies) saved as a draft`, { count }),
      description: t(
        'remember_if_your_priorities_change',
        'Remember if your priorities change, review your priorities',
      ),
      buttonText: t('view_and_edit_priorities', 'View and edit priorities'),
      redirectToViewPage: false,
      invertColors: false,
    },
    [Status.WAITING_FOR_APPROVAL]: {
      graphic: 'roundClock',
      backgroundColor: 'tescoBlue',
      subTitle: t('priority_is_pending', `${count} priority(ies) are waiting for approval`, { count }),
      description: t(
        'remember_if_your_priorities_change',
        'Remember if your priorities change, review your priorities',
      ),
      buttonText: t('view', 'View'),
      redirectToViewPage: true,
      invertColors: false,
    },
    [Status.APPROVED]: {
      graphic: 'roundTick',
      backgroundColor: 'white',
      subTitle: t('priority_is_approved', `Well done! All ${count} priority(ies) have been approved.`, {
        count,
        date: new Date(date),
      }),
      description: t(
        'remember_if_your_priorities_change',
        'Remember if your priorities change, review your priorities',
      ),
      buttonText: t('view', 'View'),
      redirectToViewPage: true,
      invertColors: false,
    },
    [Status.DECLINED]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: t(
        'your_priorities_were_declined_by_the_line_manager',
        'Your priorities were declined by the Line Manager',
      ),
      description: '',
      buttonText: t('view', 'View'),
      redirectToViewPage: true,
      invertColors: false,
    },
    [Status.OVERDUE]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: t('priorities_are_overdue', 'Priorities are overdue'),
      description: '',
      buttonText: t('create_my_priorities', 'Create my priorities'),
      redirectToViewPage: true,
      invertColors: false,
    },
    [Status.PENDING]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: t('priorities_are_pending', 'Priorities are pending'),
      description: '',
      buttonText: t('create_my_priorities', 'Create my priorities'),
      redirectToViewPage: true,
      invertColors: false,
    },
    [Status.NOT_STARTED]: {
      graphic: 'roundAlert',
      backgroundColor: 'tescoBlue',
      subTitle: t('priorities_are_not_started', 'Priorities are not started'),
      description: '',
      buttonText: t('create_my_priorities', 'Create my priorities'),
      redirectToViewPage: true,
      invertColors: false,
    },
  };

  const content = contents[status] || defaultGraphics;

  return { ...content, ...config };
};
