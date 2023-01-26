import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';

import useColleagueTenant from 'hooks/useColleagueTenant';
import { ColleagueProfileWidget } from 'features/general/Profile';
import { ShareWidget } from 'features/general/ShareWidget';
import { buildPath } from 'features/general/Routes';
import { CompletedReviewsSection, ReviewFilesSection, ReviewsSection } from 'features/general/Review';
import { useTenant, Tenant, usePermission, role } from 'features/general/Permission';
import { SubmitCalibrationRatingsWidget } from 'features/general/CreateCalibrationRatings';
import { Page } from 'pages/general/types';
import Spinner from 'components/Spinner';

const UserObjectivesPage = () => {
  const { css, matchMedia } = useStyle();
  const tenant = useTenant();
  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();
  const { tenant: userTenant, loading, loaded } = useColleagueTenant(uuid as string);
  const isLineManager = usePermission([role.LINE_MANAGER]);

  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  const handleWidgetClick = () => {
    // @ts-ignore
    if (tenant === Tenant.GENERAL) {
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
        tenant === Tenant.GENERAL
          ? import('features/general/StrategicDrivers').then((module) => ({ default: module.OrganizationWidget }))
          : import('features/bank/Objectives').then((module) => ({ default: module.BusinessObjectives })),
      ),
    [],
  );

  const UserObjectives = useMemo(
    () =>
      userTenant
        ? React.lazy(() =>
            import(`features/${userTenant}/Objectives`).then((module) => ({ default: module.UserObjectives })),
          )
        : () => null,
    [userTenant],
  );

  if (loading && !loaded) return <Spinner fullHeight />;

  return (
    <div className={css(bodyBlockStyles({ mobileScreen }))}>
      <div className={css(mainBlockStyles({ mobileScreen }))}>
        {/*// @ts-ignore */}
        <ColleagueProfileWidget uuid={uuid} />
        <div data-test-id={'test-step-indicator'} className={css(timelineWrapperStyles)}>
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
        <ReviewsSection colleagueUuid={uuid as string} isUserView={false} />
        {/*<CompletedReviewsSection colleagueUuid={uuid} />*/}
        <ReviewFilesSection colleagueUuid={uuid} />
        <div className={css(widgetsContainer)}>
          {isLineManager && <SubmitCalibrationRatingsWidget userUuid={uuid as string} />}
        </div>
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

const widgetsContainer: Rule = {
  display: 'flex',
  margin: '30px 0',
  gap: '10px',
};

export default UserObjectivesPage;
