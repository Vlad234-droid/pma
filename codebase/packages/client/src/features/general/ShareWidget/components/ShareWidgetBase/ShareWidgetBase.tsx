import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, colors, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import {
  colleagueCycleSelector,
  currentUserSelector,
  getAllSharedObjectives,
  hasStatusInReviews,
  isSharedSelector,
  ReviewSharingActions,
  sharingObjectivesMetaSelector,
  userCurrentCycleTypeSelector,
} from '@pma/store';

import { TileWrapper } from 'components/Tile';
import { TFunction, Trans, useTranslation } from 'components/Translation';
import { Icon, SuccessMark } from 'components/Icon';
import { ConfirmModal } from 'components/ConfirmModal';
import { WrapperModal } from 'features/general/Modal';
import { ShareObjectivesModal } from '../ShareObjectivesModal';
import SuccessModal from 'components/SuccessModal';
import { ReviewType, Status } from 'config/enum';
import useDispatch from 'hooks/useDispatch';
import { role, Tenant, usePermission, useTenant } from 'features/general/Permission';

import { useTimelineContainer } from 'contexts/timelineContext';

export type ShareWidgetBaseProps = {
  getContent: (props: ContentProps, t: TFunction) => Content;
  customStyle?: React.CSSProperties | {};
  stopShare?: boolean;
  sharing?: boolean;
};

export const TEST_ID = 'share-widget';

export type ContentProps = {
  sharedObjectivesCount: number;
  sharing?: boolean;
  isShared?: boolean;
  stopShare?: boolean;
  isManager?: boolean;
  isManagerShared?: boolean;
  hasApprovedObjective?: boolean;
  onViewObjectives: () => void;
  onStopShare: () => void;
  onConfirmDecline: (value: boolean) => void;
};

export type Content = {
  type: string;
  title: string;
  description: string;
  actionTitle: string;
  handleClick: () => void;
  confirm: {
    title: string;
    description: string;
  };
  success: {
    title: string;
    description: string;
  };
  view: {
    countDescription: string;
  };
};

const ShareWidgetBase: FC<ShareWidgetBaseProps> = ({ customStyle, stopShare, sharing, getContent }) => {
  const dispatch = useDispatch();
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const [isConfirmDeclineModalOpen, setIsConfirmDeclineModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isViewObjectivesModalOpen, setIsViewObjectivesModalOpen] = useState(false);
  const tenant = useTenant();

  // TODO: add selectors
  const { info } = useSelector(currentUserSelector);
  const isShared = useSelector(isSharedSelector);
  const cycle = useSelector(colleagueCycleSelector);
  const currentCycle = useSelector(userCurrentCycleTypeSelector);
  const { loading: sharingLoading } = useSelector(sharingObjectivesMetaSelector);
  const hasApprovedObjective = useSelector(hasStatusInReviews(ReviewType.OBJECTIVE, Status.APPROVED));
  const hasApprovedPriorities = useSelector(hasStatusInReviews(ReviewType.QUARTER, Status.APPROVED));
  const hasApproved = hasApprovedObjective || hasApprovedPriorities;
  const { currentTimelines } = useTimelineContainer();
  const { code: currentCode } = currentTimelines[ReviewType.QUARTER] || { code: '' };
  const isCompleted = cycle?.status && [Status.COMPLETED, Status.FINISHED].includes(cycle.status);

  const sharedObjectives = useSelector(getAllSharedObjectives);
  const isManager = usePermission([role.LINE_MANAGER]);
  const manager = info.manager;

  const isManagerShared = isManager && isShared;
  const sharedObjectivesCount = sharedObjectives.length;

  const isUserHavingApprovedPriorities = !!useSelector(hasStatusInReviews(ReviewType.QUARTER, Status.APPROVED));
  const isUserEligibleToSharePriorities = isUserHavingApprovedPriorities || hasApproved;

  const handleShareSaveBtnClick = async () => {
    setIsConfirmDeclineModalOpen(false);
    setTimeout(() => setIsSuccessModalOpen(true), 500);

    dispatch(
      ReviewSharingActions.startSharing({
        colleagueUuid: info.colleagueUUID,
        cycleUuid: currentCycle,
        code: tenant === Tenant.GENERAL ? 'OBJECTIVE' : currentCode,
      }),
    );
  };

  const handleStopShareClick = () => {
    setIsSuccessModalOpen(true);

    dispatch(
      ReviewSharingActions.stopSharing({
        colleagueUuid: info.colleagueUUID,
        cycleUuid: currentCycle,
        code: tenant === Tenant.GENERAL ? 'OBJECTIVE' : currentCode,
      }),
    );
  };

  const handleViewObjectivesClick = () => {
    setIsViewObjectivesModalOpen(true);
  };

  const { title, description, actionTitle, handleClick, confirm, success, view } = getContent(
    {
      hasApprovedObjective: hasApproved,
      isManager,
      sharedObjectivesCount,
      sharing,
      isShared,
      stopShare,
      isManagerShared,
      onStopShare: handleStopShareClick,
      onViewObjectives: handleViewObjectivesClick,
      onConfirmDecline: setIsConfirmDeclineModalOpen,
    },
    t,
  );

  const notDisplay =
    title === 'N/A' ||
    isCompleted ||
    (!stopShare && !hasApproved && !sharing && !isManager) ||
    (!stopShare && !isUserEligibleToSharePriorities) ||
    (stopShare && !isShared);

  if (notDisplay) {
    return null;
  }

  return (
    <>
      <TileWrapper customStyle={{ ...customStyle }}>
        <div className={css(wrapperStyle)} data-test-id={TEST_ID}>
          <div className={css(headStyle)}>
            <div className={css(headerBlockStyle)}>
              <div className={css({ display: 'flex', alignItems: 'center' })}>
                <Icon graphic={'document'} iconStyles={iconStyle} backgroundRadius={10} />
                <span className={css(titleStyle)}>{title}</span>
              </div>
              <span className={css(descriptionStyle)}>{description}</span>
            </div>
          </div>
          <div className={css(bodyStyle)}>
            <div className={css(bodyBlockStyle)}>
              <Button
                mode='inverse'
                styles={[
                  actionTitle !== t('view_objectives')
                    ? (btnStyle({ theme, isManagerShared }) as Styles)
                    : (btnViewStyle({ theme }) as Styles),
                ]}
                onPress={handleClick}
              >
                {actionTitle}
              </Button>
            </div>
          </div>
        </div>
      </TileWrapper>
      {isConfirmDeclineModalOpen && (
        <ConfirmModal
          title={confirm.title}
          description={confirm.description}
          submitBtnTitle={<Trans i18nKey='share'>Share</Trans>}
          onSave={() => handleShareSaveBtnClick()}
          onCancel={() => setIsConfirmDeclineModalOpen(false)}
          onOverlayClick={() => setIsConfirmDeclineModalOpen(false)}
        />
      )}
      {isSuccessModalOpen && !sharingLoading && (
        <SuccessModal
          title={success.title}
          description={success.description}
          onClose={() => setIsSuccessModalOpen(false)}
          mark={<SuccessMark />}
        />
      )}
      {isViewObjectivesModalOpen && (
        <WrapperModal title={title} onClose={() => setIsViewObjectivesModalOpen(false)}>
          <ShareObjectivesModal manager={manager} description={view.countDescription} />
        </WrapperModal>
      )}
    </>
  );
};

export default ShareWidgetBase;

const wrapperStyle: Rule = ({ theme }) => ({
  padding: '16px',
  color: theme.colors.tescoBlue,
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  flexDirection: 'column',
  display: 'flex',
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
});

const headStyle: Rule = {
  display: 'flex',
};

const headerBlockStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
};

const bodyBlockStyle: Rule = {
  display: 'grid',
  paddingTop: '14px',
};

const titleStyle: Rule = ({ theme }) => {
  return {
    fontStyle: 'normal',
    fontWeight: theme.font.weight.bold,
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

const descriptionStyle: Rule = ({ theme }) => {
  return {
    marginTop: '15px',
    position: 'relative',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    color: colors.base,
  };
};

const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
};

const btnStyle = ({ theme, isManagerShared }) => ({
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
  letterSpacing: '0px',
  color: isManagerShared ? theme.colors.tescoRed : theme.colors.tescoBlue,
  height: '30px',
  background: 'transparent',
  border: `2px solid ${isManagerShared ? theme.colors.tescoRed : theme.colors.tescoBlue}`,
});

const btnViewStyle = ({ theme }) => ({
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
  letterSpacing: '0px',
  height: '30px',
  background: 'transparent',
  color: theme.colors.tescoBlue,
  border: `2px solid ${theme.colors.tescoBlue}`,
});

const iconStyle: Rule = { verticalAlign: 'middle', margin: '0px 10px 0px 0px' };
