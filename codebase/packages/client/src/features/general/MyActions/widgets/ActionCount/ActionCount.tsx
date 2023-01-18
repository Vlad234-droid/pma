import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { colors, fontWeight, Rule, useStyle } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, getEmployeesWithReviewStatuses, ManagersActions } from '@pma/store';

import { Status } from 'config/enum';
import { TileWrapper } from 'components/Tile';
import { useTranslation } from 'components/Translation';
import { Icon } from 'components/Icon';
import useDispatch from 'hooks/useDispatch';

const ActionCount: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const pendingEmployee = useSelector((state) => getEmployeesWithReviewStatuses(state, Status.PENDING)) || [];
  const draftEmployee = useSelector((state) => getEmployeesWithReviewStatuses(state, Status.DRAFT)) || [];

  const waitingCount = pendingEmployee.length;
  const draftCount = draftEmployee.length;

  useEffect(() => {
    if (colleagueUuid) {
      dispatch(
        ManagersActions.getManagerReviews({
          colleagueUuid,
          'colleague-cycle-status_in': [Status.STARTED, Status.FINISHING, Status.FINISHED],
          'review-status_in': [Status.DRAFT],
          'review-type_nin': ['CALIBRATION'],
          status: Status.DRAFT,
        }),
      );
      dispatch(
        ManagersActions.getManagerReviews({
          colleagueUuid,
          'colleague-cycle-status_in': [Status.STARTED, Status.FINISHING, Status.FINISHED],
          'review-status_in': [Status.WAITING_FOR_APPROVAL, Status.WAITING_FOR_COMPLETION],
          'review-type_nin': ['CALIBRATION'],
          status: Status.PENDING,
        }),
      );
    }
  }, [colleagueUuid]);

  return (
    <>
      <TileWrapper customStyle={tileWrapperStyles}>
        <div data-test-id='actions' className={css(wrapperStyles)}>
          <div className={css(iconStyles)}>
            <Icon graphic={'clock'} color={'black'} />
          </div>
          <div className={css(titleStyles)}>{t('objectives_and_reviews', 'Objectives & Reviews')}</div>
          <div className={css(contentStyles)}>
            <div className={css(blockStyles)}>
              <div className={css(countStyles, { color: colors.pending })}>{waitingCount}</div>
              <div className={css(subtitleStyles)}>{t('your_pending_actions', 'Your pending actions')}</div>
            </div>
            <div className={css(blockStyles)}>
              <div className={css(countStyles, { color: colors.base })}>{draftCount}</div>
              <div className={css(subtitleStyles)}>
                {t('your_colleagues_pending_actions', 'Your colleagues pending actions')}
              </div>
            </div>
          </div>
        </div>
      </TileWrapper>
    </>
  );
};

export default ActionCount;

const tileWrapperStyles: Rule = { minWidth: '350px' };

const wrapperStyles: Rule = {
  textAlign: 'center',
  padding: '24px',
};

const titleStyles: Rule = ({ theme }) => ({
  display: 'block',
  fontSize: `${theme.font.fixed.f20.fontSize}`,
  lineHeight: `${theme.font.fixed.f20.lineHeight}`,
  letterSpacing: '0px',
  paddingBottom: '10px',
  fontWeight: fontWeight.bold,
});

const iconStyles: Rule = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '10px',
};

const contentStyles: Rule = {
  justifyContent: 'space-around',
  display: 'flex',
};

const blockStyles: Rule = { display: 'inline-block' };

const subtitleStyles: Rule = ({ theme }) => ({
  maxWidth: '128px',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
  letterSpacing: '0px',
  color: colors.base,
});

const countStyles: Rule = ({ theme }) => ({
  fontSize: `${theme.font.fixed.f28.fontSize}`,
  lineHeight: `${theme.font.fixed.f28.lineHeight}`,
  letterSpacing: '0px',
  fontWeight: fontWeight.bold,
});
