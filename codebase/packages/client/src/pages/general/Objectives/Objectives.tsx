import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';

import Timeline from 'features/general/Timeline';
import Objectives, { MyReviewsSection, CompletedReviewsSection, ReviewFilesSection } from 'features/general/Objectives';
import { tenant as T, usePermissionByTenant, useTenant } from 'features/general/Permission';
import { ShareWidget } from 'features/general/ShareWidget';
import { OrganizationWidget } from 'features/general/OrganizationWidget';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages/general/types';

export const TEST_ID = 'objectives-pave';

const ObjectivesPage: FC = () => {
  const tenant = useTenant();
  const { css, matchMedia } = useStyle();
  const navigate = useNavigate();
  const hasPermission = usePermissionByTenant([T.GENERAL]);

  const Block = useMemo(
    () =>
      React.lazy(() =>
        import(`features/${tenant}/ObjectivesForm`).then((module) => ({ default: module.CreateButton })),
      ),
    [],
  );

  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;

  return (
    <div>
      <div>
        <Block withIcon />
      </div>
      <div className={css(bodyBlockStyles({ mobileScreen }))}>
        <div className={css(bodyWrapperStyles)}>
          <Timeline />
          <Objectives />
          <MyReviewsSection />
          <CompletedReviewsSection />
          <ReviewFilesSection />
        </div>
        <div className={css(widgetsBlock)}>
          <ShareWidget stopShare={true} sharing={false} customStyle={shareWidgetStyles} />
          <ShareWidget stopShare={false} sharing={true} customStyle={shareWidgetStyles} />
          {hasPermission && (
            <OrganizationWidget
              customStyle={organizationWidgetStyles}
              onClick={() => navigate(buildPath(Page.STRATEGIC_DRIVERS))}
            />
          )}
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
