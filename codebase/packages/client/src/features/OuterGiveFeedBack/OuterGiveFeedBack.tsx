import React, { FC, useState } from 'react';
import { useStyle, useBreakpoints, Rule, Modal } from '@dex-ddl/core';
import { Radio } from 'components/Form';
import { Trans } from 'components/Translation';
import { FilterOption } from 'features/Shared';
import { IconButton } from 'components/IconButton';
import { Icon } from 'components/Icon';
import { PeopleTypes } from './type';
import { ModalGiveFeedback } from './Modals';
import { DraftItem } from './components';

const OuterGiveFeedBack: FC = () => {
  const { css } = useStyle();

  const [isOpenMainModal, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const [selectedPerson, setSelectedPerson] = useState<PeopleTypes | null>(null);
  const [infoModal, setInfoModal] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);

  const handleBtnClick = (): void => {
    setTitle(() => 'Give feedback');
    setIsOpen(() => true);
  };

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
        answer: '',
      },
      question3: {
        ask: 'How should the colleague act on this feedback?',
        answer: '',
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
        answer: '',
      },
      question3: {
        ask: 'How should the colleague act on this feedback?',
        answer: '',
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
    <>
      <div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
          })}
        >
          <IconButton
            customVariantRules={{ default: iconBtnStyle }}
            onPress={handleBtnClick}
            graphic='add'
            iconProps={{ invertColors: true }}
            iconStyles={iconStyle}
          >
            <Trans i18nKey='give_new_feedback'>Give new feedback</Trans>
          </IconButton>
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
                  <Trans i18nKey='drafts'>Drafts</Trans>
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
                  <Trans i18nKey='submitted'>Submitted</Trans>
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
        <div className={css(Drafts_style)}>
          {drafts.map((item) => (
            <DraftItem key={item.id} item={item} draftFeedback={draftFeedback} />
          ))}
        </div>
      </div>
      {isOpenMainModal && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule]}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => {
              setModalSuccess(() => false);
              setSelectedPerson(() => null);
              setIsOpen(() => false);
              setInfoModal(() => false);
            },
            styles: [modalCloseOptionStyle],
          }}
          title={{
            content: title,
            styles: [modalTitleOptionStyle],
          }}
          onOverlayClick={() => {
            if (infoModal) setInfoModal(() => false);
            if (modalSuccess) setModalSuccess(() => false);
            setSelectedPerson(() => null);
            setIsOpen(() => false);
          }}
        >
          <ModalGiveFeedback
            setIsOpen={setIsOpen}
            isOpenMainModal={isOpenMainModal}
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
            infoModal={infoModal}
            setInfoModal={setInfoModal}
            modalSuccess={modalSuccess}
            setModalSuccess={setModalSuccess}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </Modal>
      )}
    </>
  );
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

const Drafts_style: Rule = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '856px',
  flexGrow: 1,
  marginTop: '24px',
  gap: '8px',
};

//
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
export default OuterGiveFeedBack;
