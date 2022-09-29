import React, { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colleagueUUIDSelector, UserActions } from '@pma/store';
import { TREATMENT_FIELD_OPTIONS } from 'features/general/Feedback/config';
import { getSelectedTreatmentValue } from 'features/general/Feedback/utils';
import { useAuthContainer } from 'contexts/authContext';
import { Icon } from 'components/Icon';
import { Item, Select } from 'components/Form';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useTranslation } from 'components/Translation';

const FeedbackPreference: FC = () => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useAuthContainer();
  //@ts-ignore
  const { profileAttributes = [] }: { profileAttributes: Array<any> } = user || {};
  const treatmentValue: string = getSelectedTreatmentValue(profileAttributes);
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const handleChangeToneOfVoiceHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (!value) return;

    const payload = {
      colleagueUuid,
      name: 'voice',
      type: 'STRING',
      value,
    };
    if (profileAttributes.find((item) => item?.name === 'voice')) {
      dispatch(UserActions.updateProfileAttribute([payload]));
      return;
    }

    dispatch(UserActions.createProfileAttribute([payload]));
  };

  return (
    <div className={css({ marginTop: '32px', maxWidth: '568px' })}>
      <div className={css(iconTextStyle)}>
        <div className={css(voiceStyle)}>
          {t('preference_to_receive_feedback', 'Do you have a preference in the way you’d like to receive feedback?')}
        </div>
        <div className={css({ cursor: 'pointer' })}>
          <Icon
            graphic='information'
            title={t(
              'this_will_be_shared_with_feedback_providers_when_they_are_giving_you_feedback',
              'This will be shared with feedback providers when they are giving you feedback to guide them on how you’d like to receive it. You can update this at any time if your preference changes.',
            )}
          />
        </div>
      </div>
      <Item withIcon={false}>
        <Select
          options={TREATMENT_FIELD_OPTIONS}
          name={'treatment-options'}
          placeholder={t('choose_tone_of_voice', 'Choose tone of voice')}
          value={treatmentValue}
          //@ts-ignore
          onChange={handleChangeToneOfVoiceHandler}
        />
      </Item>
    </div>
  );
};

export default FeedbackPreference;

const voiceStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f20.fontSize,
  lineHeight: theme.font.fixed.f20.lineHeight,
  letterSpacing: '0px',
  maxWidth: '450px',
});

const iconTextStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
};
