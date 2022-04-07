import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colleagueUUIDSelector, FeedbackActions as FeedbackActionsGet, UserActions } from '@pma/store';
import { CreateRule, Modal, Rule, Theme, useStyle } from '@pma/dex-wrapper';
import { Trans, useTranslation } from 'components/Translation';
import { Item, Select } from 'components/Form';
import { IconButton } from 'components/IconButton';
import { Icon } from 'components/Icon';
import { useAuthContainer } from 'contexts/authContext';
import { getCards, TREATMENT_FIELD_OPTIONS } from './config';
import { getSelectedTreatmentValue } from './utils';
import { FeedbackCard } from './components';
import { Info360Modal } from './Modals';

export const FEEDBACK_ACTIONS = 'feedback_actions';

const FeedbackActions: FC = () => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useAuthContainer();
  const profileAttr = user?.data?.profileAttributes;
  const treatmentValue: string = getSelectedTreatmentValue(profileAttr);

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
    if (profileAttr?.find((item) => item?.name === 'voice')) {
      dispatch(UserActions.updateProfileAttribute([payload]));
      return;
    }

    dispatch(UserActions.createProfileAttribute([payload]));
  };

  return (
    <>
      {info360Modal && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule({ theme, mobileScreen })]}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => {
              setInfo360Modal(() => false);
            },
            styles: [modalCloseOptionStyle({ mobileScreen })],
          }}
          title={{
            content: t('everyday_feedback', 'Everyday Feedback'),
            styles: [modalTitleOptionStyle({ theme, mobileScreen })],
          }}
        >
          <Info360Modal setInfo360Modal={setInfo360Modal} />
        </Modal>
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

          <div className={css({ maxWidth: '174px' })}>
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
          {getCards().map((item) => (
            <FeedbackCard card={item} key={item.id} />
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

const voiceStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  maxWidth: '450px',
};

const iconTextStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
};

const inTheMomentStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
};

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
  return { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
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
const containerRule: CreateRule<{ theme: Theme; mobileScreen }> = ({ theme, mobileScreen }) => {
  return {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...(mobileScreen
      ? { borderRadius: '24px 24px 0 0 ', padding: '16px 0 54px' }
      : { borderRadius: '32px', padding: `40px 0 72px` }),
    width: '640px',
    height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
    marginTop: '72px',
    marginBottom: mobileScreen ? 0 : '30px',
    background: theme.colors.white,
    cursor: 'default',
    overflow: 'auto',
  };
};

// TODO: Extract duplicate 13
const modalCloseOptionStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
  return {
    display: 'inline-block',
    height: '24px',
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'fixed',
    top: '22px',
    right: mobileScreen ? '20px' : '40px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

// TODO: Extract duplicate 14
const modalTitleOptionStyle: CreateRule<{ theme: Theme; mobileScreen: boolean }> = ({ theme, mobileScreen }) => {
  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    fontWeight: theme.font.weight.bold,
    ...(mobileScreen
      ? {
          fontSize: '20px',
          lineHeight: '24px',
        }
      : {
          fontSize: '24px',
          lineHeight: '28px',
        }),
  };
};
export default FeedbackActions;
