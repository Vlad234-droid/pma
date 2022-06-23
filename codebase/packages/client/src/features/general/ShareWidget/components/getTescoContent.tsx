import { TFunction } from 'components/Translation';
import { Content, ContentProps } from './ShareWidgetBase';

export const getTescoContent = (props: ContentProps, t: TFunction): Content => {
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
    type: t('objective', 'Objective'),
    confirm: {
      title: t('share_objectives', 'Share Objectives'),
      description: t(
        'are_you_sure_you_want_to_make_your_objectives_visible',
        'Are you sure you want to make your objectives visible?',
      ),
    },
    success: {
      title: t('objectives_shares', 'Objectives shares'),
      description: isShared
        ? t('your_objectives_have_been_visible', 'Your objectives have been made visible to your team.')
        : t('you_have_stopped_sharing_your_objectives', 'You have stopped sharing your objectives to your team.'),
    },
    view: {
      countDescription: t('you_have_shared_objectives', `You have ${sharedObjectivesCount} shared objectives.`, {
        count: sharedObjectivesCount,
      }),
    },
  };

  if (stopShare && sharedObjectivesCount) {
    return {
      ...common,
      title: t('shared_objectives', 'Shared objectives'),
      description: t(
        'you_have_shared_objectives_from_your_manager',
        `You have ${sharedObjectivesCount} shared objective(s) from your manager.`,
        { count: sharedObjectivesCount },
      ),
      actionTitle: t('view_objectives', 'View'),
      handleClick: onViewObjectives,
    };
  }
  if (!stopShare && isManagerShared) {
    return {
      ...common,
      title: t('share_objectives', 'Share Objectives'),
      description: t('share_objectives_on_description', 'You are currently sharing your objectives with your team'),
      actionTitle: t('stop_sharing', 'Stop sharing'),
      handleClick: onStopShare,
    };
  }

  if (sharing && isManager && hasApprovedObjective) {
    return {
      ...common,
      title: t('share_objectives', 'Share Objectives'),
      description: t('share_objectives_off_description', 'Make all objectives and measures visible to your team'),
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
