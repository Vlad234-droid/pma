import React, { FC, useState } from 'react';
import { Trans } from 'components/Translation';
import { Radio, Item, Select } from 'components/Form';
import { Icon as IconCore, useStyle, Rule, useBreakpoints, Modal } from '@dex-ddl/core';
import { Chat } from '../../components/Icon/graphics/chat';
import { NotiBell } from '../../components/Icon/graphics/notiBell';
import { People } from '../../components/Icon/graphics/people';
import Info360Modal, { FeedbackCard } from './components';
import { ConfigProps } from './type';
import { GenericItemField } from '../../components/GenericForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createObjectivesSchema } from './config';
import { IconButton } from '../../components/IconButton';
import { Icon } from '../../components/Icon';

const FEEDBACK_ACTIONS = 'feedback_actions';

const FeedbackActions: FC = () => {
  const { css, theme } = useStyle();
  const [info360Modal, setInfo360Modal] = useState<boolean>(false);

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createObjectivesSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = methods;

  const onSubmit = async (data) => {
    console.log('data', data);
    reset();
  };

  const cards: ConfigProps[] = [
    {
      id: 1,
      action: 'Give feedback',
      text: 'Share in the moment feedback with your colleagues',
      icon: <Chat />,
      iconText: 'The feedback will be able to your colleague',
      modalTitle: 'Give feedback',
      link: '/give-feedback',
    },
    {
      id: 2,
      action: 'View your feedback',
      text: 'See the feedback your colleagues have shared with you',
      icon: <NotiBell />,
      iconText: 'The feedback will be able to your colleague',
      link: '/view-feedback',
    },
    {
      id: 3,
      action: 'Respond to feedback requests',
      text: 'See and respond to feedback requests from your colleagues',
      icon: <NotiBell />,
      iconText: 'You have 2 new feedback requests',
      link: '/respond-feedback',
    },
    {
      id: 4,
      action: 'Request feedback',
      text: 'Ask for feedback from your colleagues',
      icon: <People />,
      iconText: 'Direct request to your colleagues',
      link: '/request-feedback',
    },
  ];

  const handleBtnClick360 = () => {
    window.open('https://feedback.etsplc.com/Tesco360/', '_blank')?.focus();
  };

  const handleModal360 = (): void => {
    setInfo360Modal(() => true);
  };

  const field_options = [
    { value: 'id_1', label: 'Be direct' },
    { value: 'id_2', label: 'Treat me kindly' },
    { value: 'id_3', label: 'Be kind but direct' },
  ];

  return (
    <>
      {!info360Modal ? (
        <div data-test-id={FEEDBACK_ACTIONS}>
          <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h2 className={css({ fontWeight: 'bold', fontSize: '20px', lineHeight: '24px' })}>
                Feedback in the moment
              </h2>
              <IconButton
                graphic='information'
                iconStyles={{ marginLeft: '8px' }}
                onPress={handleModal360}
                data-test-id='iconButton'
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
                <Trans i18nKey='give_new_feedback'>360 Feedback</Trans>
              </IconButton>
            </div>
          </div>
          <div className={css(CardsBlock)}>
            {cards.map((item) => (
              <FeedbackCard card={item} key={item.id} />
            ))}
          </div>
          <div className={css({ marginTop: '32px', width: '568px' })}>
            <div className={css({ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' })}>
              <div className={css({ fontWeight: 'bold', fontSize: '20px', lineHeight: '24px', maxWidth: '450px' })}>
                What tone of voice would you prefer to receive feedback in?
              </div>
              <div>
                <IconCore graphic='information' />
              </div>
            </div>
            <form>
              <GenericItemField
                name={`treatment_options`}
                methods={methods}
                Wrapper={({ children }) => <Item withIcon={false}>{children}</Item>}
                Element={Select}
                options={field_options}
                placeholder={'Choose feedback type'}
                value='id_2'
              />
            </form>
          </div>
        </div>
      ) : (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule]}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => {
              setInfo360Modal(() => false);
            },
            styles: [modalCloseOptionStyle],
          }}
          title={{
            content: 'Feedbackl',
            styles: [modalTitleOptionStyle],
          }}
          onOverlayClick={() => {
            setInfo360Modal(() => false);
          }}
        >
          <Info360Modal setInfo360Modal={setInfo360Modal} />
        </Modal>
      )}
    </>
  );
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
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
});

const iconStyle: Rule = {
  marginRight: '10px',
};
const containerRule: Rule = ({ colors }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...(mobileScreen
      ? { borderRadius: '24px 24px 0 0 ', padding: '16px 0 84px' }
      : { borderRadius: '32px', padding: `40px 0 102px` }),
    width: '640px',
    height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
    marginTop: '72px',
    marginBottom: mobileScreen ? 0 : '30px',
    background: colors.white,
    cursor: 'default',
    overflow: 'auto',
  };
};

const modalCloseOptionStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
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

const modalTitleOptionStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
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
