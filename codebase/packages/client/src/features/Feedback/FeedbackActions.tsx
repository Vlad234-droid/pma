import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FeedbackActions as FeedbackActionsGet,
  colleagueUUIDSelector,
  UserActions,
  getNotesArgsSelector,
  getUnReadSubmittedNotesSelector,
} from '@pma/store';
import { CreateRule, Icon as IconCore, Modal, Rule, Theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import * as Yup from 'yup';

import { Trans } from 'components/Translation';
import { Item, Select } from 'components/Form';
import { Chat } from 'components/Icon/graphics/chat';
import { NotiBell } from 'components/Icon/graphics/notiBell';
import { NotiBellCirlceOut } from 'components/Icon/graphics/notiBellCirlceOut';
import { People } from 'components/Icon/graphics/people';
import Info360Modal, { FeedbackCard } from './components';
import { ConfigProps } from './type';
import { GenericItemField } from 'components/GenericForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createObjectivesSchema } from './config';
import { IconButton } from 'components/IconButton';
import { Icon } from 'components/Icon';

import { FeedbackStatus } from 'config/enum';
import { useAuthContainer } from 'contexts/authContext';
import { Page } from 'pages';

const FEEDBACK_ACTIONS = 'feedback_actions';

const FeedbackActions: FC = () => {
  const { user } = useAuthContainer();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const profileAttr = user?.data?.profileAttributes;

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

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createObjectivesSchema),
  });

  const getProppeIconForunReadNotes = () => {
    if (unReadSubmittedNotes.length) return <NotiBell />;
    return <NotiBellCirlceOut />;
  };

  const getProppeIconForPendingNotes = () => {
    if (pendingNotes.length) return <NotiBell />;
    return <NotiBellCirlceOut />;
  };

  const cards: ConfigProps[] = [
    {
      id: 1,
      action: 'Give feedback',
      text: 'Give in the moment feedback to a colleague',
      icon: <Chat />,
      iconText: 'Your feedback will be immediately available for your colleague to view',
      modalTitle: 'Give feedback',
      link: `/${Page.GIVE_FEEDBACK}`,
    },
    {
      id: 2,
      action: 'View your feedback',
      text: 'See the feedback your colleagues have shared with you',
      icon: getProppeIconForunReadNotes(),
      iconText: `You have ${unReadSubmittedNotes?.length || 0} new feedback to view`,
      link: '/feedback/view-feedback',
    },
    {
      id: 3,
      action: 'Respond to feedback requests',
      text: 'See and respond to feedback requests from your colleagues',
      icon: getProppeIconForPendingNotes(),
      iconText: pendingNotes.length
        ? `You have ${pendingNotes.length} new feedback requests`
        : 'You have 0 new feedback requests',
      link: '/feedback/respond-feedback',
    },
    {
      id: 4,
      action: 'Request feedback',
      text: 'Ask for feedback from your colleagues',
      icon: <People />,
      iconText: 'Send new feedback requests',
      link: '/feedback/request-feedback',
    },
  ];

  const handleBtnClick360 = () => {
    window.open('https://feedback.etsplc.com/Tesco360/', '_blank')?.focus();
  };

  const field_options = [
    { value: 'id_1', label: 'Direct and simple' },
    { value: 'id_2', label: 'Friendly and constructive' },
    { value: 'id_3', label: 'Informative and detailed' },
    { value: 'id_4', label: 'I don`t have a preference' },
  ];

  const checkForVoiceValue = () => profileAttr?.find((item) => item?.name === 'voice')?.value ?? 'id_1';

  const createToneOfVoiceHandler = (inputValue) => {
    if (!inputValue) return;
    const findedValue = field_options?.find((item) => item.value === inputValue)?.value;
    const payload = {
      colleagueUuid,
      name: 'voice',
      value: findedValue,
      type: 'STRING',
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
          content: 'Feedback',
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
            <h2 className={css(InTheMomentStyle)}>Learn more about your feedback options:</h2>
            <IconButton
              graphic='information'
              iconStyles={{ marginLeft: '8px' }}
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
              <Trans>360 Feedback</Trans>
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
              <IconCore
                graphic='information'
                title='This will be shared with feedback providers when they are giving you feedback to guide them on how you’d like to receive it. You can update this at any time if your preference changes.'
              />
            </div>
          </div>
          <form>
            <GenericItemField
              name={`treatment_options`}
              methods={methods}
              Wrapper={({ children }) => <Item withIcon={false}>{children}</Item>}
              Element={Select}
              options={field_options}
              placeholder={'Choose tone of voice'}
              value={checkForVoiceValue()}
              onChange={(value) => {
                createToneOfVoiceHandler(value);
              }}
            />
          </form>
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
