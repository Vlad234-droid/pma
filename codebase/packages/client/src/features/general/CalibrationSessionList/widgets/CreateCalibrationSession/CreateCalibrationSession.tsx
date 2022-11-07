import React, { FC } from 'react';
import { Rule, theme } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';

import { useTranslation } from 'components/Translation';

import BaseWidget from 'components/BaseWidget';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';

const CreateCalibrationSession: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateToPage = () => navigate(buildPath(Page.CREATE_CALIBRATION_SESSION));

  return (
    <BaseWidget
      iconGraphic={'add'}
      title={t('create_calibration_session', 'Create calibration session')}
      onClick={navigateToPage}
      hover={false}
      withButton={false}
      customStyle={{
        fontSize: theme.font.fixed.f16.fontSize,
        lineHeight: theme.font.fixed.f16.lineHeight,
        letterSpacing: '0px',
        cursor: 'pointer',
        ...tileWrapperStyles,
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
