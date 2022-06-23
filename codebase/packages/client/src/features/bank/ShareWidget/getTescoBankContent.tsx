import { TFunction } from 'components/Translation';
import { Content, ContentProps } from 'features/general/ShareWidget/components/ShareWidgetBase';

export const getTescoBankContent = (props: ContentProps, t: TFunction): Content => {
  const {
    stopShare,
    sharedObjectivesCount,
    isManagerShared,
    hasApprovedObjective,
    sharing,
    isShared,
    isManager,
    onStopShare,
    onConfirmDecline,
    onViewObjectives,
  } = props;

  const common = {
    type: t('priority', 'Priority'),
    confirm: {
      title: t('share_priorities', 'Share Priorities'),
      description: t(
        'are_you_sure_you_want_to_make_your_priorities_visible',
        'Are you sure you want to make your priorities visible?',
      ),
    },
    success: {
      title: t('priorities_shares', 'Priorities shares'),
      description: isShared
        ? t('your_priorities_have_been_visible', 'Your priorities have been made visible to your team.')
        : t('you_have_stopped_sharing_your_priorities', 'You have stopped sharing your priorities to your team.'),
    },
    view: {
      countDescription: t('you_have_shared_priorities', `You have ${sharedObjectivesCount} shared priorities`, {
        count: sharedObjectivesCount,
      }),
    },
  };

  if (stopShare && sharedObjectivesCount) {
    return {
      ...common,
      title: t('shared_priorities', 'Shared Priorities'),
      description: t(
        'you_have_shared_priorities_from_your_manager',
        `You have ${sharedObjectivesCount} shared priority(ies) from your manager.`,
        { count: sharedObjectivesCount },
      ),
      actionTitle: t('view_objectives', 'View'),
      handleClick: onViewObjectives,
    };
  }
  if (!stopShare && isManagerShared) {
    return {
      ...common,
      title: t('share_priorities', 'Share Priorities'),
      description: t('share_priorities_on_description', 'You are currently sharing your priorities with your team'),
      actionTitle: t('stop_sharing', 'Stop sharing'),
      handleClick: onStopShare,
    };
  }

  if (sharing && isManager && hasApprovedObjective) {
    return {
      ...common,
      title: t('share_priorities', 'Share Priorities'),
      description: t('share_priorities_off_description', 'Make all priorities visible to your team'),
      actionTitle: t('share_to_team', 'Share to team'),
      handleClick: () => {
        onConfirmDecline(true);
      },
    };
  }
  return {
    ...common,
    title: 'N/A',
    description: 'N/A',
    actionTitle: 'N/A',
    handleClick: () => null,
  };
};
