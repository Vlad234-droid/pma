import React, { FC } from 'react';
import { useStyle } from '@pma/dex-wrapper';

import { useTranslation } from 'components/Translation';
import SecondaryWidget, { Props as SecondaryWidgetProps } from 'features/general/SecondaryWidget';

type Props = {
  onEditClick: () => void;
  onCompareClick: () => void;
  editMode: boolean;
  compareMode: boolean;
};

const Calibration: FC<Props> = ({ onEditClick, onCompareClick, editMode, compareMode }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const widgets: SecondaryWidgetProps[] = [
    {
      iconGraphic: 'edit',
      title: editMode
        ? t('exit_calibration_ratings', 'Exit calibration ratings')
        : t('edit_calibration_ratings', 'Edit calibration ratings'),
      data: t('enter_ratings', 'Enter your team`s ratings to see live updates'),
      customStyle: widgetStyle,
      onClick: onEditClick,
      withButton: false,
    },
    {
      iconGraphic: 'calender',
      title: t('compare_to_expected', 'Compare to expected distribution or previous years'),
      customStyle: widgetStyle,
      onClick: onCompareClick,
      withButton: false,
    },
    {
      iconGraphic: 'download',
      title: t('download', 'Download'),
      data: t('save_calibration_ratings', 'Save calibration ratings to your device'),
      customStyle: widgetStyle,
      onClick: () => console.log('download'),
      withButton: false,
    },
  ];

  return (
    <div data-test-id='calibration-widgets' className={css({ flex: '1 0 216px' })}>
      {widgets.map((props, idx) => {
        if (compareMode && !idx) return;

        return (
          <div key={idx} className={css({ marginBottom: '8px' })}>
            <SecondaryWidget {...props} />
          </div>
        );
      })}
    </div>
  );
};

const widgetStyle = { flex: '2 1 110px', padding: '0 4px 16px' };

export default Calibration;
