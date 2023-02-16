import React, { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { colors, CreateRule, fontWeight, Rule, useStyle } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, getAllEmployees, ManagersActions } from '@pma/store';

import { Status } from 'config/enum';
import { TileWrapper } from 'components/Tile';
import { useTranslation } from 'components/Translation';
import useDispatch from 'hooks/useDispatch';
import { Icon } from 'components/Icon';
import { isDateFromISOAfterNow, isDateFromISOBeforeNow } from 'utils';

const ActionCount: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const colleagues = useSelector((state) => getAllEmployees(state, 'ALL')) || [];

  const waitingCount = useMemo(() => {
    const colleaguesWithCalibration = colleagues.filter(({ timeline }) => {
      const calibrationPoint = timeline.find(({ code, status }) => code === 'CALIBRATION' && status === 'STARTED');
      if (!calibrationPoint) return false;
      const { status, startTime, endTime } = calibrationPoint;

      return (
        ![Status.NOT_STARTED, Status.COMPLETED].includes(status) &&
        isDateFromISOAfterNow(startTime) &&
        isDateFromISOBeforeNow(endTime)
      );
    });

    const colleaguesToSubmit = colleaguesWithCalibration.filter(({ reviews }) => {
      const calibrationReview = reviews.find(({ type }) => {
        return type === 'CALIBRATION';
      });

      if (!calibrationReview) return true;
      return calibrationReview.status === 'DRAFT';
    });
    return colleaguesToSubmit.length;
  }, [colleagues]);

  useEffect(() => {
    if (colleagueUuid) {
      dispatch(
        ManagersActions.getManagerCalibrations({
          colleagueUuid,
          'colleague-cycle-status_in': [Status.STARTED, Status.FINISHING, Status.FINISHED],
          'review-status_in': [Status.WAITING_FOR_APPROVAL],
          'review-type_in': ['CALIBRATION'],
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
            <Icon graphic={'rating'} color={'black'} />
          </div>
          <div className={css(titleStyles)}>{t('calibration_ratings_tile', 'Calibration Ratings')}</div>
          <div className={css(contentStyles)}>
            <div className={css(countStyles({ shouldColorText: waitingCount > 0 }))}>{waitingCount}</div>
          </div>
          <div>{t('colleagues_pending_submission', 'Colleagues ratings are pending submission')}</div>
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

const iconStyles: Rule = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '10px',
};

const titleStyles: Rule = ({ theme }) => ({
  display: 'block',
  fontSize: `${theme.font.fixed.f20.fontSize}`,
  lineHeight: `${theme.font.fixed.f20.lineHeight}`,
  letterSpacing: '0px',
  paddingBottom: '10px',
  fontWeight: fontWeight.bold,
});

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

const countStyles: CreateRule<{ shouldColorText?: boolean }> =
  ({ shouldColorText }) =>
  ({ theme }) => ({
    fontSize: `${theme.font.fixed.f28.fontSize}`,
    lineHeight: `${theme.font.fixed.f28.lineHeight}`,
    letterSpacing: '0px',
    fontWeight: fontWeight.bold,
    color: shouldColorText ? colors.pending : colors.base,
  });
