import React, { FC, useEffect, useState } from 'react';
import { Button, Modal, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { Trans, useTranslation } from 'components/Translation';
import { FilterOption } from 'features/Shared';
import { IconButton } from 'components/IconButton';
import { defaultSerializer } from '../DraftItem';
import DraftList from '../DraftList';
import RadioBtns from '../RadioBtns';
import { Notification } from 'components/Notification';
import { Icon } from 'components/Icon';
import { HelpModalReceiveFeedback, ModalDownloadFeedback } from '../ModalParts';
import { ColleaguesActions, colleagueUUIDSelector, FeedbackActions, ObjectiveActions } from '@pma/store';
import { useDispatch, useSelector } from 'react-redux';
import { FilterModal } from '../../../Shared/components/FilterModal';
import { useNavigate } from 'react-router-dom';
import { FeedbackStatus } from 'config/enum';
import { Page } from 'pages';
import useSubmittedCompletedNotes from '../../hooks/useSubmittedCompletedNotes';

type filterFeedbacksType = {
  AZ: boolean;
  ZA: boolean;
  newToOld: boolean;
  oldToNew: boolean;
};

const ViewFeedback: FC = () => {
  const navigate = useNavigate();
  const { css } = useStyle();
  const dispatch = useDispatch();
  const [helpModalReceiveFeedback, setHelpModalReceiveFeedback] = useState<boolean>(false);
  const [openMainModal, setOpenMainModal] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [checkedRadio, setCheckedRadio] = useState({
    unread: true,
    read: false,
  });

  const colleagueUuid = useSelector(colleagueUUIDSelector);

  // filter
  const [focus, setFocus] = useState(false);
  const [searchValueFilterOption, setSearchValueFilterOption] = useState('');
  const [filterModal, setFilterModal] = useState(false);
  const [filterFeedbacks, setFilterFeedbacks] = useState<filterFeedbacksType>({
    AZ: false,
    ZA: false,
    newToOld: false,
    oldToNew: false,
  });

  const { t } = useTranslation();

  useEffect(() => {
    if (!focus) setSearchValueFilterOption(() => '');
    if (focus) {
      setFilterFeedbacks(() => ({ AZ: false, ZA: false, newToOld: false, oldToNew: false }));
      setFilterModal(() => false);
    }
  }, [focus]);

  const closeHandler = () => {
    setOpenMainModal(() => false);
  };

  // store
  const isReaded = checkedRadio.read && !checkedRadio.unread;
  const searchValue = searchValueFilterOption.replace(/\s+/g, '').toLowerCase();

  const filterFn = (item) => {
    const fullName =
      `${item?.colleagueProfile?.colleague?.profile?.firstName}${item?.colleagueProfile?.colleague?.profile?.lastName}`.toLowerCase();

    return fullName.includes(searchValue) && isReaded === item.read;
  };

  const sortFn = (i1, i2) => {
    const { AZ, ZA, newToOld, oldToNew } = filterFeedbacks;

    let val1 = '';
    let val2 = '';

    const swapVariables = (a, b) => {
      b = [a, (a = b)][0];
      return [a, b];
    };

    switch (true) {
      case AZ || ZA: {
        const firstNameGetter = (item) => item.firstName || '';

        val1 = firstNameGetter(i1);
        val2 = firstNameGetter(i2);

        if (ZA) {
          [val1, val2] = swapVariables(val1, val2);
        }

        break;
      }
      case newToOld || oldToNew: {
        const createdTimeGetter = (item) => String(item.createdTime || '');

        val1 = createdTimeGetter(i1);
        val2 = createdTimeGetter(i2);

        if (newToOld) {
          [val1, val2] = swapVariables(val1, val2);
        }

        break;
      }
    }

    return val1.localeCompare(val2);
  };

  const handleDownloadAllPress = () => {
    setOpenMainModal(true);
  };

  useEffect(() => {
    dispatch(FeedbackActions.clearFeedback());
  }, []);

  useEffect(() => {
    if (!colleagueUuid) {
      return;
    }

    dispatch(
      FeedbackActions.getAllFeedbacks({
        'target-colleague-uuid': colleagueUuid,
        _limit: '300',
      }),
    );
  }, [colleagueUuid]);

  const submittedCompletedNotes = useSubmittedCompletedNotes({
    status: [FeedbackStatus.SUBMITTED, FeedbackStatus.COMPLETED],
    sortFn,
    filterFn,
    serializer: defaultSerializer,
  });

  useEffect(() => {
    if (!submittedCompletedNotes.length) {
      return;
    }

    if (isReaded) {
      submittedCompletedNotes.forEach(
        (item) => item.targetId && dispatch(ObjectiveActions.getReviewByUuid({ uuid: item.targetId })),
      );
    }
  }, [isReaded]);

  return (
    <>
      {helpModalReceiveFeedback && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule]}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => {
              setHelpModalReceiveFeedback(() => false);
            },
            styles: [modalCloseOptionStyle],
          }}
          title={{
            content: 'Feedback',
            styles: [modalTitleOptionStyle],
          }}
        >
          <HelpModalReceiveFeedback setHelpModalReceiveFeedback={setHelpModalReceiveFeedback} />
        </Modal>
      )}
      <div>
        <div className={css(SpaceBeetweenStyled)}>
          <RadioBtns
            checkedRadio={checkedRadio}
            setCheckedRadio={setCheckedRadio}
            focus={focus}
            setFocus={setFocus}
            setFilterModal={setFilterModal}
            filterModal={filterModal}
            setFilterFeedbacks={setFilterFeedbacks}
          />
          <div className={css(FlexCenterStyled)}>
            <IconButton
              graphic='information'
              iconStyles={iconStyle}
              onPress={() => {
                setHelpModalReceiveFeedback(() => true);
              }}
            />
            <FilterOption
              focus={focus}
              customIcon={true}
              searchValue={searchValueFilterOption}
              onFocus={setFocus}
              withIcon={false}
              customStyles={{
                ...(focus ? { padding: '10px 20px 10px 16px' } : { padding: '0px' }),
                ...(focus ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
              }}
              onChange={(e) => setSearchValueFilterOption(() => e.target.value)}
              onSettingsPress={() => {
                setFilterModal((prev) => !prev);
                setFocus(false);
              }}
            />
            <FilterModal
              isOpen={filterModal}
              filter={filterFeedbacks}
              setFilter={setFilterFeedbacks}
              toggleOpen={setFilterModal}
            />
          </div>
        </div>
        <div className={css(ReverseItemsStyled)}>
          <DraftList items={submittedCompletedNotes} />
          <div className={css(ButtonsActionsStyle)}>
            <div className={css(ButtonContainerStyle)}>
              <div className={css({ display: 'inline-flex' })}>
                <Icon
                  graphic='chatSq'
                  iconStyles={{ verticalAlign: 'middle', margin: '2px 10px 0px 0px' }}
                  backgroundRadius={10}
                />
                <span className={css(ShareFeedbackStyled)}>Share feedback</span>
              </div>
              <p className={css(QuestionStyled)}>Give feedback to a colleague</p>
              <Button
                styles={[iconBtnStyle]}
                onPress={() => {
                  navigate(`/${Page.GIVE_FEEDBACK}`);
                }}
              >
                <Trans>Share feedback</Trans>
              </Button>
            </div>
            <div className={css(ButtonContainerStyle)}>
              <div className={css({ display: 'inline-flex' })}>
                <Icon
                  graphic='download'
                  iconStyles={{ verticalAlign: 'middle', margin: '2px 10px 0px 0px' }}
                  backgroundRadius={10}
                />
                <span className={css(SizeStyle)}>Download feedback</span>
              </div>
              <p className={css(SavedStyled)}>Download feedback to your device</p>
              <Button styles={[iconBtnStyle, { maxWidth: '181px !important' }]} onPress={handleDownloadAllPress}>
                <Trans i18nKey='download_feedbacks'>Download feedbacks</Trans>
              </Button>
            </div>
            <Notification
              closable={false}
              graphic='information'
              iconColor='pending'
              text="If you're worried the content of any feedback you`ve received is inappropriate, please contact your line manager or People team as soon as possible."
              customStyle={{
                background: '#FFDBC2',
                marginBottom: '20px',
                marginTop: '16px',
              }}
            />
          </div>
        </div>
      </div>
      {openMainModal && (
        <Modal
          modalPosition={'middle'}
          overlayColor={'tescoBlue'}
          modalContainerRule={[containerRule]}
          closeOptions={{
            content: <Icon graphic='cancel' invertColors={true} />,
            onClose: () => {
              dispatch(ColleaguesActions.clearColleagueList());
              setModalSuccess(() => false);
              setOpenMainModal(() => false);
            },
            styles: [modalCloseOptionStyle],
          }}
          title={{
            content: t('download_your_feedback', 'Download your feedback'),
            styles: [modalTitleOptionStyle],
          }}
        >
          <ModalDownloadFeedback
            setOpenMainModal={setOpenMainModal}
            modalSuccess={modalSuccess}
            setModalSuccess={setModalSuccess}
            closeHandler={closeHandler}
            downloadTitle={t(
              'which_feedback_would_you_like_to_download',
              'Which feedback would you like to download? ',
            )}
            downloadDescription={t(
              'use_the_search_bar_to_look_for_colleagues',
              'Use the search bar to look for colleagues who have given you feedback.',
            )}
          />
        </Modal>
      )}
    </>
  );
};

const SavedStyled: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '4px 0px 0px 0px',
};

const SizeStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#00539F',
};

const FlexCenterStyled: Rule = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
};

const SpaceBeetweenStyled: Rule = () => {
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

const QuestionStyled: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '4px 0px 0px 0px',
};

const ShareFeedbackStyled: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#00539F',
};

const ReverseItemsStyled: Rule = {
  display: 'flex',
  flexWrap: 'wrap-reverse',
  gridGap: '8px',
  marginTop: '34px',
  alignItems: 'stretch',
};

const iconStyle: Rule = {
  marginRight: '2px',
  marginTop: '3px',
};

const ButtonsActionsStyle: Rule = () => {
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

const ButtonContainerStyle: Rule = {
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
    fontWeight: 'bold',
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

export default ViewFeedback;
