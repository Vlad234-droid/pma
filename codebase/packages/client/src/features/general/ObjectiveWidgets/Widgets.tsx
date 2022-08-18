import React, { FC, useEffect } from 'react';
import { Styles, theme, useStyle } from '@pma/dex-wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  earlyDataPDPSelector,
  getTimelineByReviewTypeSelector,
  metaPDPSelector,
  PDPActions,
  schemaMetaPDPSelector,
  timelineTypesAvailabilitySelector,
} from '@pma/store';

import { Page } from 'pages';
import { useTranslation } from 'components/Translation';
import BaseWidget, { Props as SecondaryWidgetProps } from 'components/BaseWidget';
import { buildPath } from 'features/general/Routes';
import { Props, widgetTypes } from './configs/type';
import { ReviewType } from 'config/enum';
import { DATE_STRING_FORMAT, formatDateString, Tenant } from 'utils';
import Spinner from 'components/Spinner';
import { USER } from 'config/constants';
import { MainWidget } from 'features/general/MainWidget';
import { useTenant } from '../Permission';

const Widgets: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { css } = useStyle();
  const { t } = useTranslation();
  const tenant = useTenant();

  const timelineObjective = useSelector(getTimelineByReviewTypeSelector(ReviewType.OBJECTIVE, USER.current));
  const timelineMYR = useSelector(getTimelineByReviewTypeSelector(ReviewType.MYR, USER.current));
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(USER.current));
  const status = timelineObjective?.summaryStatus;
  const nextReviewDate = timelineMYR?.startTime || null;
  const canShowObjectives = Tenant.GENERAL === tenant && timelineTypes[ReviewType.OBJECTIVE];
  const canShowQuarter = Tenant.BANK === tenant && timelineTypes[ReviewType.QUARTER];
  const canShowMainWidget = canShowObjectives || canShowQuarter;
  const dates = useSelector(earlyDataPDPSelector) || '';
  const pdpSelector = useSelector(schemaMetaPDPSelector)?.goals || [];
  const meta = useSelector(metaPDPSelector);
  const addedDatePDP = dates && pdpSelector.length ? formatDateString(dates, DATE_STRING_FORMAT) : '';

  useEffect(() => {
    if (pdpSelector.length) {
      dispatch(PDPActions.getEarlyAchievementDate({}));
    }
  }, [pdpSelector]);

  const widgets: SecondaryWidgetProps[] = [
    {
      iconGraphic: 'list',
      title: t('personal_development_plan', 'Personal Development Plan'),
      type: widgetTypes.PDP,
      customStyle: { flex: '2 1 110px' },
      onClick: () => navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN)),
    },
    {
      iconGraphic: 'chat',
      title: t('feedback', 'Feedback'),
      type: widgetTypes.FEEDBACK,
      customStyle: { flex: '2 1 110px' },
      onClick: () => navigate(buildPath(Page.FEEDBACKS)),
    },
    {
      iconGraphic: 'edit',
      title: t('My Notes'),
      type: widgetTypes.NOTES,
      customStyle: { flex: '2 1 110px' },
      onClick: () => navigate(buildPath(Page.NOTES)),
    },
  ];

  return (
    <div className={css(wrapperStyle)}>
      {meta?.loading ? (
        <Spinner />
      ) : (
        <>
          {canShowMainWidget && (
            <MainWidget
              status={status}
              statistic={timelineObjective?.statistics}
              nextReviewDate={nextReviewDate}
              customStyle={{
                flex: '4 1 500px',
                fontSize: theme.font.fixed.f16.fontSize,
                lineHeight: theme.font.fixed.f16.lineHeight,
                letterSpacing: '0px',
              }}
            />
          )}

          {widgets.map((props, idx) => {
            if (props.type === widgetTypes.PDP) {
              return (
                <BaseWidget
                  customStyle={{
                    fontSize: theme.font.fixed.f16.fontSize,
                    lineHeight: theme.font.fixed.f16.lineHeight,
                    letterSpacing: '0px',
                  }}
                  key={idx}
                  {...props}
                  date={addedDatePDP}
                />
              );
            }

            return (
              <BaseWidget
                customStyle={{
                  fontSize: theme.font.fixed.f16.fontSize,
                  lineHeight: theme.font.fixed.f16.lineHeight,
                  letterSpacing: '0px',
                }}
                key={idx}
                {...props}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
} as Styles;

export default Widgets;
