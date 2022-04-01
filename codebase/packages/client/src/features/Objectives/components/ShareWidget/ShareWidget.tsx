import React, { FC, useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { Button, colors, Rule, Styles, useStyle } from '@pma/dex-wrapper';

import { TileWrapper } from 'components/Tile';
import { Icon, SuccessMark } from 'components/Icon';
import { ConfirmModal, WrapperModal } from 'features/Modal';
import { ShareObjectivesModal } from '../Modal';
import SuccessModal from 'components/SuccessModal';
import { ReviewType, Status } from 'config/enum';
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';
import { usePermission, role } from 'features/Permission';

import * as T from '../../types';
import { transformReviewsToObjectives } from '../../utils';

import {
  currentUserSelector,
  getAllSharedObjectives,
  getReviewSchema,
  hasStatusInReviews,
  isSharedSelector,
  ObjectiveSharingActions,
} from '@pma/store';

export type Props = {
  customStyle?: React.CSSProperties | {};
  stopShare?: boolean;
  sharing?: boolean;
};

export const TEST_ID = 'share-widget';

const ShareWidget: FC<Props> = ({ customStyle, stopShare, sharing }) => {
  const dispatch = useDispatch();
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const [isConfirmDeclineModalOpen, setIsConfirmDeclineModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isViewObjectivesModalOpen, setIsViewObjectivesModalOpen] = useState(false);
  const [objectives, setObjectives] = useState<T.Objective[]>([]);

  // TODO: add selectors
  const { info } = useSelector(currentUserSelector);
  const isShared = useSelector(isSharedSelector);
  const hasApprovedObjective = useSelector(hasStatusInReviews(ReviewType.OBJECTIVE, Status.APPROVED));
  const { components = [] } = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const sharedObjectives = useSelector(getAllSharedObjectives);
  const formElements = components.filter((component) => component.type != 'text');
  const isManager = usePermission([role.LINE_MANAGER]);

  const pathParams = useMemo(() => ({ colleagueUuid: info.colleagueUUID, cycleUuid: 'CURRENT' }), [info.colleagueUUID]);
  const manager = info.manager;

  const isManagerShared = isManager && isShared;
  const sharedObjectivesCount = sharedObjectives.length;
  const formElementsCount = formElements.length;
  const isValidPathParams = pathParams.colleagueUuid;

  const handleShareSaveBtnClick = async () => {
    setIsConfirmDeclineModalOpen(false);
    setTimeout(() => setIsSuccessModalOpen(true), 500);

    dispatch(ObjectiveSharingActions.startSharing(pathParams));
  };

  const handleStopShareBtnClick = () => {
    setIsSuccessModalOpen(true);

    dispatch(ObjectiveSharingActions.stopSharing(pathParams));
  };

  const handleViewObjectivesBtnClick = () => {
    setIsViewObjectivesModalOpen(true);
  };

  useEffect(() => {
    dispatch(ObjectiveSharingActions.getSharings(pathParams));
  }, []);

  useEffect(() => {
    isValidPathParams && isManager && dispatch(ObjectiveSharingActions.checkSharing(pathParams));
  }, [isManager, isValidPathParams]);

  useEffect(() => {
    isValidPathParams && !isManager && dispatch(ObjectiveSharingActions.getSharings(pathParams));
  }, [isManager, isValidPathParams]);

  useEffect(() => {
    sharedObjectivesCount && setObjectives(transformReviewsToObjectives(sharedObjectives, formElements));
  }, [sharedObjectivesCount, formElementsCount]);

  const [content, setContent] = useState<[string, string, string, () => void]>(['', '', '', Function]);

  useEffect(() => {
    setContent(getContent());
  }, [hasApprovedObjective, isManager, sharedObjectivesCount, isShared, isManagerShared]);

  const getContent = (): [string, string, string, () => void] => {
    if (stopShare && sharedObjectivesCount) {
      return [
        t('shared_objectives', 'Shared objectives'),
        t(
          'you_have_shared_objectives_from_your_manager',
          `You have ${sharedObjectivesCount} shared objective(s) from your manager.`,
          { count: sharedObjectivesCount },
        ),
        t('view_objectives', 'View'),
        () => {
          handleViewObjectivesBtnClick();
        },
      ];
    }
    if (!stopShare && isManagerShared) {
      return [
        t('share_objectives', 'Share Objectives'),
        t('share_objectives_on_description', 'You are currently sharing your objectives with your team'),
        t('stop_sharing', 'Stop sharing'),
        () => {
          handleStopShareBtnClick();
        },
      ];
    }

    if (sharing && isManager && hasApprovedObjective) {
      return [
        t('share_objectives', 'Share Objectives'),
        t('share_objectives_off_description', 'Make all objectives and measures visible to your team'),
        t('share_to_team', 'Share to team'),
        () => {
          setIsConfirmDeclineModalOpen(true);
        },
      ];
    }
    return ['N/A', 'N/A', 'N/A', () => null];
  };

  const [title, description, actionTitle, handleBtnClick] = content;
  const isDisplayed =
    title === 'N/A' || (!stopShare && !hasApprovedObjective && !sharing && !isManager && !hasApprovedObjective);

  if (isDisplayed) {
    return null;
  }

  return (
    <>
      <TileWrapper customStyle={{ ...customStyle }}>
        <div className={css(wrapperStyle)} data-test-id={TEST_ID}>
          <div className={css(headStyle)}>
            <div className={css(headerBlockStyle)}>
              <div className={css({ display: 'flex', alignItems: 'center' })}>
                <Icon
                  graphic={'document'}
                  iconStyles={{ verticalAlign: 'middle', margin: '0px 10px 0px 0px' }}
                  backgroundRadius={10}
                />
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
                onPress={handleBtnClick}
              >
                {actionTitle}
              </Button>
            </div>
          </div>
        </div>
      </TileWrapper>
      {isConfirmDeclineModalOpen && (
        <ConfirmModal
          title={t('share_objectives', 'Share Objectives')}
          description={t(
            'are_you_sure_you_want_to_make_your_objectives_visible',
            'Are you sure you want to make your objectives visible?',
          )}
          submitBtnTitle={<Trans i18nKey='share'>Share</Trans>}
          onSave={() => handleShareSaveBtnClick()}
          onCancel={() => setIsConfirmDeclineModalOpen(false)}
          onOverlayClick={() => setIsConfirmDeclineModalOpen(false)}
        />
      )}
      {isSuccessModalOpen && (
        <SuccessModal
          title='Objectives shares'
          description={
            isShared
              ? t('your_objectives_have_been_visible', 'Your objectives have been made visible to your team.')
              : t('you_have_stopped_sharing_your_objectives', 'You have stopped sharing your objectives to your team.')
          }
          onClose={() => setIsSuccessModalOpen(false)}
          mark={<SuccessMark />}
        />
      )}
      {isViewObjectivesModalOpen && (
        <WrapperModal
          title={t('shared_objectives', 'Shared objectives')}
          onClose={() => setIsViewObjectivesModalOpen(false)}
        >
          <ShareObjectivesModal manager={manager} objectives={objectives} />
        </WrapperModal>
      )}
    </>
  );
};

const wrapperStyle: Rule = ({ theme }) => ({
  padding: '16px',
  backgroundColor: theme.colors.white,
  color: theme.colors.tescoBlue,
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  flexDirection: 'column',
  display: 'flex',
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

const titleStyle: Rule = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '16px',
};

const descriptionStyle: Rule = {
  marginTop: '15px',
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  color: colors.base,
};

const bodyStyle: Rule = {
  flexWrap: 'wrap',
  gap: '16px 8px',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
};

const btnStyle = ({ theme, isManagerShared }) => ({
  fontSize: '14px',
  color: isManagerShared ? theme.colors.tescoRed : theme.colors.tescoBlue,
  height: '30px',
  background: 'transparent',
  border: `1px solid ${isManagerShared ? theme.colors.tescoRed : theme.colors.tescoBlue}`,
});

const btnViewStyle = ({ theme }) => ({
  fontSize: '14px',
  height: '30px',
  background: 'transparent',
  color: theme.colors.tescoBlue,
  border: `1px solid ${theme.colors.tescoBlue}`,
});

export default ShareWidget;
