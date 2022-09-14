import React, { useMemo } from 'react';
import { CreateRule, Styles, useStyle } from '@pma/dex-wrapper';
import { useNavigate, useParams } from 'react-router-dom';

import { UserObjectives } from 'features/general/Objectives';
import { ColleagueProfileWidget } from 'features/general/Profile';
import { useTranslation } from 'components/Translation';
import { ShareWidget } from 'features/general/ShareWidget';
import { buildPath } from 'features/general/Routes';
import { CompletedReviewsSection, ReviewFilesSection, ReviewsSection } from 'features/general/Review';
import { useToast, Variant } from 'features/general/Toast';

import { tenant as T, useTenant } from 'features/general/Permission';
import { Page } from 'pages/general/types';

const UserObjectivesPage = () => {
  const { css, matchMedia } = useStyle();
  const { t } = useTranslation();
  const { addToast } = useToast();
  const tenant = useTenant();
  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();

  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  const handleClick = () => {
    addToast({
      id: Date.now().toString(),
      title: t('do_you_know', 'Do you know?'),
      variant: Variant.INFO,
      description: t(
        'that_you_can_submit',
        'That you can submit new objectives at anytime during the performance cycle?',
      ),
    });
  };

  const handleWidgetClick = () => {
    // @ts-ignore
    if (tenant === T.GENERAL) {
      navigate(buildPath(Page.STRATEGIC_DRIVERS));
    } else {
      window.open('https://tescobank.sharepoint.com/sites/intranet/learn/ourbig6hub/Pages/default.aspx');
    }
  };

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

  return (
    <div className={css(bodyBlockStyles({ mobileScreen }))}>
      <div className={css(mainBlockStyles({ mobileScreen }))}>
        <ColleagueProfileWidget />
        <div data-test-id={'test-step-indicator'} onClick={handleClick} className={css(timelineWrapperStyles)}>
          <Timeline colleagueUuid={uuid} />
        </div>
      </div>
      <div className={css(rightAsideWrapperStyles({ mobileScreen }))}>
        <div className={css(widgetsBlock)}>
          <Widget onClick={handleWidgetClick} />
          <ShareWidget stopShare={true} customStyle={shareWidgetStyles} />
        </div>
      </div>
      <div className={css(mainBlockStyles({ mobileScreen }))}>
        <UserObjectives />
        <ReviewsSection colleagueUuid={uuid as string} />
        <CompletedReviewsSection />
        <ReviewFilesSection colleagueUuid={uuid} />
      </div>
    </div>
  );
};

const bodyBlockStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'flex-start',
  flexDirection: mobileScreen ? 'column' : 'row',
  flexWrap: 'wrap',
  gap: '10px',
});

const widgetsBlock: Styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  gap: '10px',
  paddingBottom: '20px',
};

const rightAsideWrapperStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  flex: `${mobileScreen ? '0 0 100%' : '0 1 calc(30% - 20px)'}`,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const mainBlockStyles: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  flex: `${mobileScreen ? '0 0 100%' : '0 1 70%'}`,
  width: '100%',
  gap: '10px',
  display: 'flex',
  flexDirection: 'column',
});

const timelineWrapperStyles: Styles = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
};

const shareWidgetStyles: Styles = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
  width: '100%',
};

export default UserObjectivesPage;
