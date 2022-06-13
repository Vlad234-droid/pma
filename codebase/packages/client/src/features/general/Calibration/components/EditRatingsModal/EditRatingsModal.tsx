import React, { FC, useEffect, useState } from 'react';
import { Styles, useStyle } from '@pma/dex-wrapper';

import { Employee } from 'config/types';
import { ConfirmModal } from 'features/general/Modal';
import { Trans, useTranslation } from 'components/Translation';
import { Item, Select } from 'components/Form';
import { Rating } from 'config/enum';
import { ColleagueInfo } from 'features/general/MyTeam';

import { getRatingsOptions, getRatingValues } from '../../mock';

type Props = {
  employee: Employee;
  onClose: () => void;
  onSave: (rating: Rating) => void;
};

const EditRatingsModal: FC<Props> = ({ employee, onClose, onSave }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const [overallRating, setOverallRating] = useState<Rating>();
  const [whatRating, setWhatRating] = useState<Rating>();
  const [howRating, setHowRating] = useState<Rating>();
  const options = getRatingsOptions();
  const ratingValue = getRatingValues();

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

  const overall = t('overall_rating_is', `Your colleague's overall rating is`);
  const label = `${overall}: ${overallRating}`;
  return (
    <ConfirmModal
      title={t('edit_calibration', 'Edit calibration')}
      onCancel={onClose}
      onSave={handleSave}
      submitBtnTitle={<Trans i18nKey='save_change'>Save change</Trans>}
      canSubmit={!!whatRating && !!howRating}
    >
      <div data-test-id='edit-rating-modal' className={css({ padding: '16px 0 32px' })}>
        <>
          {employee && (
            <div className={css({ padding: '0 0 16px' })}>
              <ColleagueInfo
                firstName={employee.firstName}
                lastName={employee.lastName}
                jobName={employee.jobName}
                businessType={employee.businessType}
              />
            </div>
          )}
          <div className={css(Label)}>{t('select_what_rating', "Select your colleague's 'What' rating")}</div>
          <Item withIcon={false}>
            <Select
              options={options}
              placeholder={t('please_select', 'Please select')}
              onChange={(value) => setWhatRating(value as Rating)}
              name='declineReasonWhat'
            />
          </Item>
        </>
        <>
          <div className={css(Label)}>{t('select_how_rating', `Select your colleague's 'How' rating`)}</div>
          <Item withIcon={false}>
            <Select
              options={options}
              placeholder={t('please_select', 'Please select')}
              onChange={(value) => setHowRating(value as Rating)}
              name='declineReasonHow'
            />
          </Item>
        </>
        <div className={css(Label)}>{label}</div>
      </div>
    </ConfirmModal>
  );
};

export default EditRatingsModal;

const Label = ({ theme }) =>
  ({
    fontSize: `${theme.font.fixed.f16.fontSize}`,
    lineHeight: `${theme.font.fixed.f18.lineHeight}`,
    marginBottom: '8px',
    fontWeight: '600',
  } as Styles);
