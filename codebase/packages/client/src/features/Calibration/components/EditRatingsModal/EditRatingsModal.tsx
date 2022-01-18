import React, { FC, useState, useEffect } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';

import { Employee } from 'config/types';
import ConfirmModal from 'components/ConfirmModal';
import { Trans, useTranslation } from 'components/Translation';
import { Item, Select } from 'components/Form';
import { Rating } from 'config/enum';

type Props = {
  employee: Employee,
  onClose: () => void,
  onSave: (rating: Rating) => void;
};

const options = [
  { value: Rating.OUTSTANDING, label: Rating.OUTSTANDING },
  { value: Rating.GREAT, label: Rating.GREAT },
  { value: Rating.SATISFACTORY, label: Rating.SATISFACTORY },
  { value: Rating.BELOW_EXPECTED, label: Rating.BELOW_EXPECTED },
];

const ratingValue = {
  [Rating.BELOW_EXPECTED]: 1,
  [Rating.SATISFACTORY]: 2,
  [Rating.GREAT]: 3,
  [Rating.OUTSTANDING]: 4,
};

const EditRatingsModal: FC<Props> = ({ employee, onClose, onSave }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [overallRating, setOverallRating] = useState<Rating>();
  const [whatRating, setWhatRating] = useState<Rating>();
  const [howRating, setHowRating] = useState<Rating>();

  useEffect(() => {
    const what = whatRating;
    const how = howRating;

    let overall;

    if (what && how) {
      overall = ratingValue[what] < ratingValue[how] ? what : how;
    } else {
      overall = what || how || '';
    }

    setOverallRating(overall);
  }, [whatRating, howRating]);

  const handleSave = () => {
    overallRating && onSave(overallRating);
  };

  return (
    <ConfirmModal
      title={t('edit_calibration', 'Edit calibration')}
      onClose={onClose}
      onSave={handleSave}
      employee={employee}
      submitBtnText={<Trans i18nKey='save_change'>Save change</Trans>}
      canSubmit={!!overallRating}
    >
      <div className={css({ padding: '32px 0' })}>
        <>
          <div className={css(Label)}>
            {t('select_what_rating', 'Select your colleague\'s \'What\' rating')}
          </div>
          <Item withIcon={false}>
            <Select
              options={options}
              placeholder={t('please_select', 'Please select')}
              onChange={(e) => setWhatRating((e.target as HTMLInputElement).value as Rating)}
              name='declineReason'
            />
          </Item>
        </>
        <>
          <div className={css(Label)}>
            {t('select_how_rating', 'Select your colleague\'s \'How\' rating')}
          </div>
          <Item withIcon={false}>
            <Select
              options={options}
              placeholder={t('please_select', 'Please select')}
              onChange={(e) => setHowRating((e.target as HTMLInputElement).value as Rating)}
              name='declineReason'
            />
          </Item>
        </>
        <div className={css(Label)}>{`${t('overall_rating_is', 'Your colleague\'s overall rating is:')} ${overallRating}`}</div>
      </div>
    </ConfirmModal>
  )
};

export default EditRatingsModal;

const Label: Rule = {
  fontSize: '16px',
  lineHeight: '20px',
  marginBottom: '8px',
  fontWeight: '600',
};
