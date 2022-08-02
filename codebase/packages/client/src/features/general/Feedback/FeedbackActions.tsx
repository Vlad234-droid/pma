import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colleagueUUIDSelector, FeedbackActions as FeedbackActionsGet, UserActions } from '@pma/store';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router';
import { Trans, useTranslation } from 'components/Translation';
import { Item, Select } from 'components/Form';
import { IconButton } from 'components/IconButton';
import { Icon } from 'components/Icon';
import WrapperModal from 'features/general/Modal/components/WrapperModal';
import { useAuthContainer } from 'contexts/authContext';
import { getCards, TREATMENT_FIELD_OPTIONS } from './config';
import { getSelectedTreatmentValue } from './utils';
import { FeedbackCard } from './components';
import { Info360Modal } from './Modals';

export const FEEDBACK_ACTIONS = 'feedback_actions';

const FeedbackActions: FC = () => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthContainer();
  //@ts-ignore
  const { profileAttributes = [] }: { profileAttributes: Array<any> } = user || {};
  const treatmentValue: string = getSelectedTreatmentValue(profileAttributes);

  const [info360Modal, setInfo360Modal] = useState<boolean>(false);
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  useEffect(() => {
    dispatch(FeedbackActionsGet.getRequestedFeedbacks({}));
    dispatch(FeedbackActionsGet.getGivenFeedbacks({}));
  }, []);

  const handleBtnClick360 = () => {
    window.open('https://feedback.etsplc.com/Tesco360/', '_blank')?.focus();
  };

  const createToneOfVoiceHandler = (value) => {
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
    <>
      {info360Modal && (
        <WrapperModal title={t('everyday_feedback', 'Everyday Feedback')} onClose={() => setInfo360Modal(false)}>
          <Info360Modal setInfo360Modal={setInfo360Modal} />
        </WrapperModal>
      )}
      <div data-test-id={FEEDBACK_ACTIONS}>
        <div className={css(inMomentStyle({ mobileScreen }))}>
          <div className={css(CenterFlexStyle)}>
            <h2 className={css(inTheMomentStyle)}>
              <Trans i18nKey='difference_between_everyday_feedback_and_feedback_360'>
                What is the difference between ‘Everyday feedback’ and ‘360 feedback’?
              </Trans>
            </h2>
            <IconButton
              graphic='information'
              iconStyles={{ marginLeft: '8px', marginRight: '20px' }}
              data-test-id='iconButton'
              onPress={() => setInfo360Modal(true)}
            />
          </div>

          <div>
            <IconButton
              customVariantRules={{ default: iconBtnStyle }}
              onPress={handleBtnClick360}
              graphic='add'
              iconProps={{ invertColors: true }}
              iconStyles={iconStyle}
            >
              <Trans i18nKey='feedback_360'>360 Feedback</Trans>
            </IconButton>
          </div>
        </div>
        <div className={css(cardBlockStyle)}>
          {getCards(navigate).map((item) => (
            <FeedbackCard {...item} key={item.id} />
          ))}
        </div>
        <div className={css({ marginTop: '32px', maxWidth: '568px' })}>
          <div className={css(iconTextStyle)}>
            <div className={css(voiceStyle)}>
              Do you have a preference in the way you&apos;d like to receive feedback?
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
              onChange={({ target: { value } }) => {
                createToneOfVoiceHandler(value);
              }}
            />
          </Item>
        </div>
      </div>
    </>
  );
};

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

const inTheMomentStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f20.fontSize,
  lineHeight: theme.font.fixed.f20.lineHeight,
  letterSpacing: '0px',
});

const CenterFlexStyle: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const inMomentStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
  if (mobileScreen) {
    return {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };
  }
  return { letterSpacing: '0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
};

const cardBlockStyle: Rule = () => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexBasis: '400px',
    marginTop: '16px',
  };
};

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '12px 20px 12px 22px',
  display: 'flex',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  whiteSpace: 'nowrap',
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
});

const iconStyle: Rule = {
  marginRight: '10px',
};

export default FeedbackActions;
