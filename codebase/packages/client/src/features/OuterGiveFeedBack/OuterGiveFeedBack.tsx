import React, { FC, useState } from 'react';
import { useStyle, useBreakpoints, Rule, Modal } from '@dex-ddl/core';
import { Radio } from 'components/Form';
import { Trans } from 'components/Translation';
import { yupResolver } from '@hookform/resolvers/yup';
import { createGiveFeedbackSchema } from './config';
import * as Yup from 'yup';
import { FilterOption } from 'features/Shared';
import { IconButton } from 'components/IconButton';
import { Icon } from 'components/Icon';
import { useForm } from 'react-hook-form';
import { PeopleTypes, TypefeedbackItems } from './type';
import { ModalGiveFeedback } from './Modals';
import { DraftItem } from './components';
import { getFindedColleguesS, ColleaguesActions } from '@pma/store';
import { useDispatch, useSelector } from 'react-redux';

const OuterGiveFeedBack: FC = () => {
  const findedColleagues = useSelector(getFindedColleguesS) || [];
  const dispatch = useDispatch();
  const { css } = useStyle();
  const [isOpenMainModal, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedPerson, setSelectedPerson] = useState<PeopleTypes | null>(null);
  const [infoModal, setInfoModal] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [feedbackItemsS, setFeedbackItems] = useState<TypefeedbackItems[] | []>([]);

  const [checkedRadio, setCheckedRadio] = useState({
    draft: true,
    submitted: false,
  });
  const [, isBreakpoint] = useBreakpoints();
  const medium = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  const small = isBreakpoint.small || isBreakpoint.xSmall;

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createGiveFeedbackSchema),
  });

  const handleBtnClick = (): void => {
    setTitle(() => 'Give feedback');
    setIsOpen(() => true);
  };

  const draftFeedback = (selectedNote): void => {
    setFeedbackItems(() => selectedNote.feedbackItems);

    setSearchValue(
      () =>
        `${selectedNote.targetColleagueProfile?.colleague?.profile?.firstName} ${selectedNote.targetColleagueProfile?.colleague?.profile?.lastName}`,
    );
    setTitle(() => 'Give feedback');
    setSelectedPerson(() => {
      return {
        ...selectedNote.targetColleagueProfile.colleague,
        uuid: selectedNote.uuid,
      };
    });
    setIsOpen(() => true);
  };

  return (
    <>
      <div>
        <div className={css(header_styled)}>
          <IconButton
            customVariantRules={{ default: iconBtnStyle }}
            onPress={handleBtnClick}
            graphic='add'
            iconProps={{ invertColors: true }}
            iconStyles={iconStyle}
          >
            <Trans i18nKey='give_new_feedback'>Give new feedback</Trans>
          </IconButton>

          <div
            className={css({
              display: 'flex',
              order: medium ? 1 : 0,
              gap: '10px',
              ...(medium && { flexBasis: '816px', marginTop: '24px' }),
            })}
          >
            <div className={css({ padding: '0px 10px 0px 0px', cursor: 'pointer' })}>
              <label
                htmlFor='draft'
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                })}
              >
                <Radio
                  type='radio'
                  name='status'
                  value='option1'
                  checked={checkedRadio.draft}
                  id='draft'
                  onChange={() => {
                    setCheckedRadio(() => {
                      return {
                        draft: true,
                        submitted: false,
                      };
                    });
                  }}
                />
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
            <div className={css({ padding: '0px 10px', cursor: 'pointer' })}>
              <label
                htmlFor='submitted'
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                })}
              >
                <Radio
                  type='radio'
                  name='status'
                  value='option2'
                  checked={checkedRadio.submitted}
                  id='submitted'
                  onChange={() => {
                    setCheckedRadio(() => {
                      return {
                        draft: false,
                        submitted: true,
                      };
                    });
                  }}
                />
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
              ...(small && { flexBasis: '300px', marginTop: '24px' }),
            })}
          >
            <IconButton graphic='information' iconStyles={iconStyle} />
            <FilterOption />
          </div>
        </div>
        <div className={css(Drafts_style)}>
          <DraftItem draftFeedback={draftFeedback} checkedRadio={checkedRadio} />
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
              if (findedColleagues.length) {
                dispatch(ColleaguesActions.clearGettedCollegues());
              }
              setModalSuccess(() => false);
              setSelectedPerson(() => null);
              setIsOpen(() => false);
              setInfoModal(() => false);
              setFeedbackItems(() => []);
            },
            styles: [modalCloseOptionStyle],
          }}
          title={{
            content: title,
            styles: [modalTitleOptionStyle],
          }}
          onOverlayClick={() => {
            if (findedColleagues.length) {
              dispatch(ColleaguesActions.clearGettedCollegues());
            }
            if (infoModal) setInfoModal(() => false);
            if (modalSuccess) setModalSuccess(() => false);
            setSelectedPerson(() => null);
            setIsOpen(() => false);
            setFeedbackItems(() => []);
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
            methods={methods}
            feedbackItemsS={feedbackItemsS}
            setFeedbackItems={setFeedbackItems}
          />
        </Modal>
      )}
    </>
  );
};

const header_styled: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const medium = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    display: 'flex',
    flexWrap: medium ? 'wrap' : 'nowrap',
    ...(medium && { flexBasis: '250px' }),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '24px',
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
