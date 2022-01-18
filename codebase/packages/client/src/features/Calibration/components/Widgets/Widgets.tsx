import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyle } from '@dex-ddl/core';

import { useTranslation } from 'components/Translation';
import SecondaryWidget, { Props as SecondaryWidgetProps } from 'features/SecondaryWidget';
import { buildPath } from 'features/Routes';
import { Page } from 'pages';

type Props = {
  onEditClick: () => void;
  onCompareClick: () => void;
  editMode: boolean;
};

const Calibration: FC<Props> = ({ onEditClick, onCompareClick, editMode }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const widgets: SecondaryWidgetProps[] = [
    {
      iconGraphic: 'edit',
      title: editMode ? t('Exit calibration ratings') : t('Edit calibration ratings'),
      date: t('Enter your team`s ratings to see live updates'),
      customStyle: widgetStyle,
      onClick: onEditClick,
      withButton: false,
    },
    {
      iconGraphic: 'calender',
      title: t('Compare to expected distribution or previous ears'),
      customStyle: widgetStyle,
      onClick: onCompareClick,
      withButton: false,
    },
    {
      iconGraphic: 'download',
      title: t('Download'),
      date: t('Save calibration ratings to your device'),
      customStyle: widgetStyle,
      onClick: () => navigate(buildPath(Page.CALIBRATION)),
      withButton: false,
    },
  ];

  return (
    <div data-test-id='calibration-widgets' className={css({ flex: '1 0 216px' })}>
      {widgets.map((props, idx) => (
        <div key={idx} className={css({ marginBottom: '8px' })}>
          <SecondaryWidget {...props} />
        </div>
      ))}
    </div>
  );
};

const widgetStyle = { flex: '2 1 110px', padding: '0 4px 16px' };

export default Calibration;
