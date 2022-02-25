import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  FeedbackActions as FeedbackActionsGet,
  getNotesArgsSelector,
  getUnReadSubmittedNotesSelector,
  UserActions,
} from '@pma/store';
import { CreateRule, Modal, Rule, Theme, useBreakpoints, useStyle } from '@dex-ddl/core';

import { Trans, useTranslation } from 'components/Translation';
import { Item, Select } from 'components/Form';
import { Chat } from 'components/Icon/graphics/chat';
import { NotiBell } from 'components/Icon/graphics/notiBell';
import { NotiBellCirlceOut } from 'components/Icon/graphics/notiBellCirlceOut';
import { People } from 'components/Icon/graphics/people';
import { IconButton } from 'components/IconButton';
import { Icon } from 'components/Icon';

import { FeedbackStatus } from 'config/enum';
import { useAuthContainer } from 'contexts/authContext';
import { Page } from 'pages';
import { UserprofileAttributes } from 'config/types';

import { TREATMENT_FIELD_OPTIONS } from './config';
import { getSelectedTreatmentValue } from './utils';
import Info360Modal, { FeedbackCard } from './components';
import { ConfigProps } from './config/types';

const FEEDBACK_ACTIONS = 'feedback_actions';

const FeedbackActions: FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthContainer();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const profileAttr: UserprofileAttributes[] = user?.data?.profileAttributes;
  const treatmentValue: string = getSelectedTreatmentValue(profileAttr);

  const [info360Modal, setInfo360Modal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  useEffect(() => {
    if (!colleagueUuid) return;
    dispatch(
      FeedbackActionsGet.getAllFeedbacks({
        _limit: '300',
      }),
    );
  }, [colleagueUuid]);
  const { css, theme } = useStyle();
  const pendingNotes = useSelector(getNotesArgsSelector(FeedbackStatus.PENDING, colleagueUuid)) || [];
  const unReadSubmittedNotes =
    useSelector(getUnReadSubmittedNotesSelector([FeedbackStatus.SUBMITTED, FeedbackStatus.COMPLETED], colleagueUuid)) ||
    [];

  const unReadSubmittedNotesLength = unReadSubmittedNotes?.length || 0;
  const pendingNotesLength = pendingNotes?.length || 0;

  const getIconForUnReadNotes = () => {
    if (unReadSubmittedNotes.length) return <NotiBell />;
    return <NotiBellCirlceOut />;
  };

  const getIconForPendingNotes = () => {
    if (pendingNotes.length) return <NotiBell />;
    return <NotiBellCirlceOut />;
  };

  const cards: ConfigProps[] = [
    {
      id: 1,
      action: t('give_feedback', 'Give feedback'),
      text: t('give_in_the_moment_feedback_to_a_colleague', 'Give in the moment feedback to a colleague'),
      icon: <Chat />,
      iconText: t(
        'your_feedback_will_be_immediately_available_for_your_colleague_to_view',
        'Your feedback will be immediately available for your colleague to view',
      ),
      link: `/${Page.GIVE_FEEDBACK}`,
    },
    {
      id: 2,
      action: t('view_your_feedback', 'View your feedback'),
      text: t(
        'see_the_feedback_your_colleagues_have_shared_with_you',
        'See the feedback your colleagues have shared with you',
      ),
      icon: getIconForUnReadNotes(),
      iconText: t('you_have_new_feedback_to_view', `You have ${unReadSubmittedNotesLength} new feedback to view`, {
        unReadSubmittedNotesLength,
      }),
      link: `/${Page.VIEW_FEEDBACK}`,
    },
    {
      id: 3,
      action: t('respond_to_feedback_requests', 'Respond to feedback requests'),
      text: t(
        'see_and_respond_to_feedback_requests_from_your_colleagues',
        'See and respond to feedback requests from your colleagues',
      ),
      icon: getIconForPendingNotes(),
      iconText: t('you_have_new_feedback_requests', `You have ${pendingNotesLength} new feedback requests`, {
        pendingNotesLength,
      }),
      link: `/${Page.RESPOND_FEEDBACK}`,
    },
    {
      id: 4,
      action: t('request_feedback', 'Request feedback'),
      text: t('ask_for_feedback_from_your_colleagues', 'Ask for feedback from your colleagues'),
      icon: <People />,
      iconText: t('send_new_feedback_requests', 'Send new feedback requests'),
      link: `/${Page.REQUEST_FEEDBACK}`,
    },
  ];

  const handleBtnClick360 = () => {
    window.open('https://feedback.etsplc.com/Tesco360/', '_blank')?.focus();
  };

  const createToneOfVoiceHandler = (e) => {
    if (!e.target) return;
    const { value } = e.target;

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

  if (info360Modal) {
    return (
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
    );
  }

  return (
    <>
      <div data-test-id={FEEDBACK_ACTIONS}>
        <div className={css(InMomentStyle({ mobileScreen }))}>
          <div className={css(CenterFlexStyle)}>
            <h2 className={css(InTheMomentStyle)}>
              <Trans i18nKey='difference_between_everyday_feedback_and_feedback_360'>
                What is the difference between ‘Everyday feedback’ and ‘360 feedback’?
              </Trans>
            </h2>
            <IconButton
              graphic='information'
              iconStyles={{ marginLeft: '8px', marginRight: '20px' }}
              data-test-id='iconButton'
              onPress={() => {
                setInfo360Modal(() => true);
              }}
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
        <div className={css(CardsBlock)}>
          {cards.map((item) => (
            <FeedbackCard card={item} key={item.id} />
          ))}
        </div>
        <div className={css({ marginTop: '32px', maxWidth: '568px' })}>
          <div className={css(IconTextStyle)}>
            <div className={css(VoiceStyle)}>
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
              placeholder={'Choose tone of voice'}
              value={treatmentValue}
              onChange={createToneOfVoiceHandler}
            />
          </Item>
        </div>
      </div>
    </>
  );
};

const VoiceStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
  maxWidth: '450px',
};

const IconTextStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '16px',
};

const InTheMomentStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '20px',
  lineHeight: '24px',
};

const CenterFlexStyle: Rule = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const InMomentStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
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

const CardsBlock: Rule = () => {
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
