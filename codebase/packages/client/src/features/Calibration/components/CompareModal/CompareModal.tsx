import React, { FC, useState } from 'react';
import { useStyle, Rule, Styles } from '@dex-ddl/core';

import { ConfirmModal } from 'features/Actions';
import { Trans, useTranslation } from 'components/Translation';
import { Radio } from 'components/Form';

type Props = {
  onClose: () => void;
  onSave: (checked: string) => void;
  mode: string;
  options: { id: string; label: string; text: string }[];
};

// TODO: load prev years data for comparison
const CompareModal: FC<Props> = ({ onClose, onSave, mode, options }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [checked, setChecked] = useState<string>(mode);

  const handleSave = () => {
    onSave(checked);
  };

  const handleCompareChange = (value: string) => {
    setChecked(value);
  };

  return (
    <ConfirmModal
      title={`${t('compare', 'Compare')} ${new Date().getFullYear()} ${t(
        'calibration_submission',
        'calibration submission',
      )}`}
      onClose={onClose}
      onSave={handleSave}
      submitBtnTitle={<Trans i18nKey='compare'>Compare</Trans>}
    >
      <div data-test-id='compare-modal' className={css({ padding: '10px 0 48px' })}>
        <div className={css(Label)}>
          {t('choose_data_to_compare', 'Choose the data you would like to compare the 2021 calibration to:')}
        </div>
        <div>
          {options.map(({ id, text }) => (
            <label
              key={id}
              className={css({
                display: 'flex',
                alignItems: 'center',
                marginBottom: '24px',
              })}
            >
              <Radio id={id} name={text} checked={checked === text} onChange={() => handleCompareChange(text)} />
              <span
                className={css({
                  fontSize: '16px',
                  lineHeight: '20px',
                  padding: '0px 5px',
                })}
              >
                {text}
              </span>
            </label>
          ))}
        </div>
      </div>
    </ConfirmModal>
  );
};

export default CompareModal;

const Label = ({ theme }) =>
  ({
    fontSize: `${theme.font.fixed.f18.fontSize}`,
    lineHeight: `${theme.font.fixed.f18.lineHeight}`,
    marginBottom: '36px',
  } as Styles);
