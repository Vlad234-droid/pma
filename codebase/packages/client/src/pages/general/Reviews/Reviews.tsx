import React, { FC, useEffect, useMemo } from 'react';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { colleagueUUIDSelector, timelinesMetaSelector, timelineTypesAvailabilitySelector } from '@pma/store';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useTranslation } from 'components/Translation';
import { ReviewsSection, CompletedReviewsSection, ReviewFilesSection } from 'features/general/Review';
import { tenant as T, useTenant } from 'features/general/Permission';
import { ShareWidget } from 'features/general/ShareWidget';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages/general/types';
import { useHeaderContainer } from 'contexts/headerContext';
import { ReviewType } from 'config/enum';

export const TEST_ID = 'objectives-pave';

const ObjectivesPage: FC = () => {
  const tenant = useTenant();
  const { css, matchMedia } = useStyle();
  const navigate = useNavigate();
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector(colleagueUuid)) || {};
  const { t } = useTranslation();
  const canShowReviewTitle =
    (!timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR]) || !timelineTypes[ReviewType.OBJECTIVE];

  const { loading } = useSelector(timelinesMetaSelector);
  const { setLinkTitle } = useHeaderContainer();

  useEffect(() => {
    if (Object.keys(timelineTypes).length && canShowReviewTitle)
      setLinkTitle({ [Page.REVIEWS_VIEW]: t('reviews', 'Reviews') });
  }, [Object.keys(timelineTypes).length]);

  const Objectives = useMemo(
    () => React.lazy(() => import(`features/${tenant}/Objectives`).then((module) => ({ default: module.default }))),
    [],
  );

  const CreateButton = useMemo(
    () =>
      React.lazy(() =>
        import(`features/${tenant}/CreateUpdateObjectives`).then((module) => ({ default: module.CreateButton })),
      ),
    [],
  );

  const Timeline = useMemo(
    () => React.lazy(() => import(`features/${tenant}/Timeline`).then((module) => ({ default: module.default }))),
    [],
  );

  const Widget = useMemo(
    () =>
      React.lazy(() =>
        // @ts-ignore
        tenant === T.GENERAL
          ? import('features/general/StrategicDrivers').then((module) => ({ default: module.OrganizationWidget }))
          : import('features/bank/Objectives').then((module) => ({ default: module.BusinessObjectives })),
      ),
    [],
  );

  const Shortcuts = useMemo(
    () =>
      //@ts-ignore
      tenant === T.BANK
        ? React.lazy(() => import('features/bank/Objectives').then((module) => ({ default: module.ShortcutsSection })))
        : () => null,
    [],
  );

  const handleWidgetClick = () => {
    // @ts-ignore
    if (tenant === T.GENERAL) {
      navigate(buildPath(Page.STRATEGIC_DRIVERS));
    } else {
      window.open('https://tescobank.sharepoint.com/sites/intranet/learn/ourbig6hub/Pages/default.aspx');
    }
  };

  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  return (
    <div>
      <div>{loading ? null : <CreateButton withIcon />}</div>
      <div className={css(bodyBlockStyles({ mobileScreen }))}>
        <div className={css(bodyWrapperStyles)}>
          <Timeline colleagueUuid={colleagueUuid} />
          <Objectives />
          <ReviewsSection colleagueUuid={colleagueUuid} />
          <CompletedReviewsSection />
          <ReviewFilesSection colleagueUuid={colleagueUuid} />
          <Shortcuts />
        </div>
        <div className={css(widgetsBlock)}>
          <ShareWidget stopShare={true} sharing={false} customStyle={shareWidgetStyles} />
          <ShareWidget stopShare={false} sharing={true} customStyle={shareWidgetStyles} />
          <Widget customStyle={organizationWidgetStyles} onClick={handleWidgetClick} />
        </div>
      </div>
    </div>
  );
};

const bodyBlockStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: mobileScreen ? 'column' : 'row',
  gap: '20px',
});

const bodyWrapperStyles: Rule = () => ({
  display: 'flex',
  flex: '3 1 70%',
  flexWrap: 'nowrap',
  alignItems: 'stretch',
  flexDirection: 'column',
  width: '100%',
});

const widgetsBlock: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  gap: '20px',
  flex: '1 1 30%',
};

const shareWidgetStyles: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
  width: '100%',
});

const organizationWidgetStyles: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  flex: '1 1 30%',
  display: 'flex',
  flexDirection: 'column',
});

export default ObjectivesPage;
