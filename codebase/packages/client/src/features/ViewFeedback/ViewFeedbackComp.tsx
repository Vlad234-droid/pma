import React, { FC, useState } from 'react';
import { Button, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { Radio } from 'components/Form';
import { Trans } from 'components/Translation';
import { FilterOption } from 'features/Shared';
import { IconButton } from 'components/IconButton';
import { PeopleTypes } from './type';
import { DraftItem } from './components';
import { Notification } from 'components/Notification';
import { Icon } from 'components/Icon';

const ViewFeedbackComp: FC = () => {
  const { css } = useStyle();

  const [, setIsOpen] = useState<boolean>(false);
  const [, setTitle] = useState<string>('');
  const [, setSearchValue] = useState<string>('');

  const [, setSelectedPerson] = useState<PeopleTypes | null>(null);

  const drafts = [
    {
      id: 1,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Vlad',
      l_name: 'Baryshpolets',
      title: 'Objective: Provide a posititve customer experience ',
      question1: {
        ask: 'What strengths does this colleague have?',
        answer:
          'Iaculis amet, nec quis congue aliquam facilisis et amet et. Quam magna ut ultricies enim id morbi. Est enim ipsum commodo quis dolor pellentesque. Massa elit quis vitae libero donec.',
      },
      question2: {
        ask: 'What should the colleague improve on?',
        answer:
          'Iaculis amet, nec quis congue aliquam facilisis et amet et. Quam magna ut ultricies enim id morbi. Est enim ipsum commodo quis dolor pellentesque. Massa elit quis vitae libero donec. ',
      },
      question3: {
        ask: 'How should the colleague act on this feedback?',
        answer:
          'Fermentum risus netus vestibulum est. Accumsan et, convallis magna consequat amet et. Turpis tortor pulvinar quisque eget.',
      },
    },
    {
      id: 2,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Andrey',
      l_name: 'Sorokov',
      title: 'Objective: Provide a posititve customer experience ',
      question1: {
        ask: 'What strengths does this colleague have?',
        answer:
          'Iaculis amet, nec quis congue aliquam facilisis et amet et. Quam magna ut ultricies enim id morbi. Est enim ipsum commodo quis dolor pellentesque. Massa elit quis vitae libero donec.',
      },
      question2: {
        ask: 'What should the colleague improve on?',
        answer:
          'Fermentum risus netus vestibulum est. Accumsan et, convallis magna consequat amet et. Turpis tortor pulvinar quisque eget.',
      },
      question3: {
        ask: 'How should the colleague act on this feedback?',
        answer:
          'Fermentum risus netus vestibulum est. Accumsan et, convallis magna consequat amet et. Turpis tortor pulvinar quisque eget.',
      },
    },
  ];

  const draftFeedback = (id: number): void => {
    const findSelectedDraft = drafts.filter((item) => id === item.id);
    const [selectedDraft] = findSelectedDraft;
    console.log('selectedDraft', selectedDraft);
    setSearchValue(() => `${selectedDraft.f_name} ${selectedDraft.l_name}`);
    setTitle(() => 'Give feedback');
    setSelectedPerson(() => ({
      id: selectedDraft.id,
      img: selectedDraft.img,
      f_name: selectedDraft.f_name,
      l_name: selectedDraft.l_name,
    }));
    setIsOpen(() => true);
  };
  return (
    <div>
      <div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
          })}
        >
          <div className={css({ display: 'flex', marginRight: '129px' })}>
            <div className={css({ padding: '0px 10px' })}>
              <label
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                })}
              >
                <Radio type='radio' name='status' value='option1' checked={true} />
                <span
                  className={css({
                    fontSize: '16px',
                    lineHeight: '20px',
                    padding: '0px 5px',
                  })}
                >
                  <Trans i18nKey='drafts'>Unread</Trans>
                </span>
              </label>
            </div>
            <div className={css({ padding: '0px 10px' })}>
              <label
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                })}
              >
                <Radio type='radio' name='status' value='option2' />
                <span
                  className={css({
                    fontSize: '16px',
                    lineHeight: '20px',
                    padding: '0px 5px',
                  })}
                >
                  <Trans i18nKey='submitted'>Read</Trans>
                </span>
              </label>
            </div>
          </div>
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
            })}
          >
            <IconButton graphic='information' iconStyles={iconStyle} />
            <FilterOption />
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            flexWrap: 'wrap-reverse',
            gridGap: '8px',
            marginTop: '34px',
            alignItems: 'stretch',
          })}
        >
          <div className={css(Drafts_style)}>
            {drafts.map((item) => (
              <DraftItem key={item.id} item={item} draftFeedback={draftFeedback} />
            ))}
          </div>
          <div className={css(Buttons_actions_style)}>
            <div className={css(Button_container_style)}>
              <div className={css({ display: 'inline-flex' })}>
                <Icon
                  graphic='chatSq'
                  iconStyles={{ verticalAlign: 'middle', margin: '2px 10px 0px 0px' }}
                  backgroundRadius={10}
                />
                <span
                  className={css({
                    fontWeight: 'bold',
                    fontSize: '18px',
                    lineHeight: '22px',
                    color: '#00539F',
                  })}
                >
                  Share feedback
                </span>
              </div>
              <p
                className={css({
                  fontWeight: 'normal',
                  fontSize: '16px',
                  lineHeight: '20px',
                  margin: '4px 0px 0px 0px',
                })}
              >
                Why not give feedback back to your colleagues?
              </p>
              <Button
                styles={[iconBtnStyle]}
                onPress={() => {
                  console.log('hello');
                }}
              >
                <Trans i18nKey='share_feedback'>Share feedback</Trans>
              </Button>
            </div>
            <div className={css(Button_container_style)}>
              <div className={css({ display: 'inline-flex' })}>
                <Icon
                  graphic='download'
                  iconStyles={{ verticalAlign: 'middle', margin: '2px 10px 0px 0px' }}
                  backgroundRadius={10}
                />
                <span
                  className={css({
                    fontWeight: 'bold',
                    fontSize: '18px',
                    lineHeight: '22px',
                    color: '#00539F',
                  })}
                >
                  Download feedback
                </span>
              </div>
              <p
                className={css({
                  fontWeight: 'normal',
                  fontSize: '16px',
                  lineHeight: '20px',
                  margin: '4px 0px 0px 0px',
                })}
              >
                Save feedback to your device
              </p>
              <Button
                styles={[iconBtnStyle, { maxWidth: '161px !important' }]}
                onPress={() => {
                  console.log('hello');
                }}
              >
                <Trans i18nKey='download_feedback'>Download feedback</Trans>
              </Button>
            </div>
            <Notification
              graphic='information'
              iconColor='pending'
              text='If you feel feedback is [x.y.z.] – please speak to your line manager or people team.'
              customStyle={{
                background: '#FFDBC2',
                marginBottom: '20px',
                marginTop: '16px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const iconStyle: Rule = {
  marginRight: '10px',
};

const Buttons_actions_style: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    minWidth: mobileScreen ? '100%' : '400px',
    flex: '1 0 250px',
    '& > div': {
      '&:nth-child(2)': {
        marginTop: '8px',
      },
    },
  };
};

const Drafts_style: Rule = {
  flex: '3 1 676px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const Button_container_style: Rule = {
  height: '150px',
  background: '#FFFFFF',
  boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
  borderRadius: '10px',
  padding: '26px',
};

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '8px 16px',
  display: 'flex',
  height: '34px',
  borderRadius: '32px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.white,
  color: '#00539F',
  cursor: 'pointer',
  border: '1px solid #00539F',
  maxWidth: '134px',
  marginLeft: 'auto',
  marginTop: '16px',
  whiteSpace: 'nowrap',
  fontSize: '14px',
  fontWeight: 'bold',
});

export default ViewFeedbackComp;
