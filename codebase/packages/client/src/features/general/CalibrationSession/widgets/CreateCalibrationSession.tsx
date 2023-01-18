import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Rule, theme } from '@pma/dex-wrapper';

import { Page } from 'pages';

import { useTranslation } from 'components/Translation';
import BaseWidget from 'components/BaseWidget';

import { buildPath } from 'features/general/Routes';
import { role, usePermission } from 'features/general/Permission';

const CreateCalibrationSession: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isPerform = usePermission([role.TALENT_ADMIN]);
  const onClick = () => {
    navigate(buildPath(Page.CREATE_CALIBRATION_SESSION), {
      state: {
        backPath: `${pathname}`,
      },
    });
  };

  return (
    <BaseWidget
      iconGraphic={'add'}
      title={t('create_calibration_session', 'Create calibration session')}
      hover={false}
      withButton={false}
      onClick={onClick}
      customStyle={{
        fontSize: theme.font.fixed.f16.fontSize,
        lineHeight: theme.font.fixed.f16.lineHeight,
        letterSpacing: '0px',
        cursor: 'pointer',
        ...tileWrapperStyles,
        ...(isPerform && { opacity: 0.6, pointerEvents: 'none' }),
        '& span': {
          '&:last-child': {
            fontSize: theme.font.fixed.f16.fontSize,
            marginBottom: '8px',
          },
        },
      }}
    />
  );
};

export default CreateCalibrationSession;

const tileWrapperStyles: Rule = { minWidth: '350px' };
