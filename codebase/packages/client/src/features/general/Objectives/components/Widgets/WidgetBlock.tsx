import React from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router-dom';
import { ShareWidget } from 'features/general/ShareWidget';
import { OrganizationWidget } from 'features/general/OrganizationWidget';
import { Page } from 'pages';
import { buildPath } from 'features/general/Routes';
import { usePermissionByTenant, tenant } from 'features/general/Permission';

export const WidgetBlock = () => {
  const navigate = useNavigate();
  const { css } = useStyle();

  const hasPermission = usePermissionByTenant([tenant.GENERAL]);
  return (
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
  );
};

const widgetsBlock: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  gap: '20px',
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
