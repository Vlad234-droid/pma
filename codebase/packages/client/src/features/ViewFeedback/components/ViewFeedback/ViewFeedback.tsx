import React, { FC, useEffect, useState } from 'react';
import { Button, Rule, CreateRule, useStyle } from '@pma/dex-wrapper';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ColleaguesActions,
  colleagueUUIDSelector,
  FeedbackActions,
  getLoadedStateSelector,
  ReviewsActions,
} from '@pma/store';

import { Trans, useTranslation } from 'components/Translation';
import { FilterOption } from 'features/Shared';
import { IconButton } from 'components/IconButton';
import { defaultSerializer } from '../DraftItem';
import DraftList from '../DraftList';
import { WrapperModal } from 'features/Modal';

import RadioBtns from '../RadioBtns';
import { Notification } from 'components/Notification';
import { Icon } from 'components/Icon';
import { HelpModalReceiveFeedback, ModalDownloadFeedback } from '../ModalParts';

import { FilterModal } from '../../../Shared/components/FilterModal';
import { FEEDBACK_STATUS_IN, FeedbackStatus, Tesco } from 'config/enum';
import { Page } from 'pages';
import useSubmittedCompletedNotes from '../../hooks/useSubmittedCompletedNotes';
import { buildPath } from 'features/Routes';
import Spinner from 'components/Spinner';

export const WRAPPER = 'wrapper';

type filterFeedbacksType = {
  sort: string;
  search: string;
};

const ViewFeedback: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const dispatch = useDispatch();
  const [helpModalReceiveFeedback, setHelpModalReceiveFeedback] = useState<boolean>(false);
  const [openMainModal, setOpenMainModal] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [checkedRadio, setCheckedRadio] = useState({
    unread: true,
    read: false,
  });

  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { loaded } = useSelector(getLoadedStateSelector);

  // filter
  const [focus, setFocus] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [filterFeedbacks, setFilterFeedbacks] = useState<filterFeedbacksType>({
    sort: '',
    search: '',
  });

  useEffect(() => {
    if (focus) {
      setFilterModal(() => false);
    }
  }, [focus]);

  const closeHandler = () => {
    setOpenMainModal(() => false);
  };

  // store
  const isReaded = checkedRadio.read && !checkedRadio.unread;
  const searchValue = filterFeedbacks.search.replace(/\s+/g, '').toLowerCase();

  const filterFn = (item) => {
    const fullName =
      `${item?.colleagueProfile?.colleague?.profile?.firstName}${item?.colleagueProfile?.colleague?.profile?.lastName}`.toLowerCase();

    return fullName.includes(searchValue) && isReaded === item.read;
  };

  const sortFn = (i1, i2) => {
    let val1 = '';
    let val2 = '';

    const swapVariables = (a, b) => {
      b = [a, (a = b)][0];
      return [a, b];
    };

    function sortAZ() {
      const firstNameGetter = (item) => item.firstName || '';

      val1 = firstNameGetter(i1);
      val2 = firstNameGetter(i2);

      if (filterFeedbacks.sort === 'ZA') {
        [val1, val2] = swapVariables(val1, val2);
      }
    }

    function sortByTime() {
      const createdTimeGetter = (item) => String(item.createdTime || '');

      val1 = createdTimeGetter(i1);
      val2 = createdTimeGetter(i2);

      if (filterFeedbacks.sort === 'newToOld') {
        [val1, val2] = swapVariables(val1, val2);
      }
    }

    if (filterFeedbacks.sort === 'AZ' || filterFeedbacks.sort === 'ZA') {
      sortAZ();
    }

    if (filterFeedbacks.sort === 'newToOld' || filterFeedbacks.sort === 'oldToNew') {
      sortByTime();
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
      FeedbackActions.getViewFeedback({
        'target-colleague-uuid': colleagueUuid,
        _limit: '300',
        status_in: [FEEDBACK_STATUS_IN.SUBMITTED, FEEDBACK_STATUS_IN.COMPLETED],
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
        (item) =>
          item.targetId &&
          item.targetId !== Tesco.TescoBank &&
          dispatch(ReviewsActions.getReviewByUuid({ uuid: item.targetId })),
      );
    }
  }, [isReaded]);

  return (
    <>
      {helpModalReceiveFeedback && (
        <WrapperModal
          title={t('feedback', 'Feedback')}
          onClose={() => {
            setHelpModalReceiveFeedback(() => false);
          }}
        >
          <HelpModalReceiveFeedback setHelpModalReceiveFeedback={setHelpModalReceiveFeedback} />
        </WrapperModal>
      )}
      <div data-test-id={WRAPPER}>
        <div className={css(spaceBetweenStyled({ mobileScreen }))}>
          <RadioBtns
            checkedRadio={checkedRadio}
            setCheckedRadio={setCheckedRadio}
            focus={focus}
            setFocus={setFocus}
            setFilterModal={setFilterModal}
            filterModal={filterModal}
            setFilterFeedbacks={setFilterFeedbacks}
          />
          <div className={css(flexCenterStyled)}>
            <IconButton
              data-test-id={'informationn'}
              graphic='information'
              iconStyles={iconStyle}
              onPress={() => {
                setHelpModalReceiveFeedback(() => true);
              }}
            />
            <FilterOption
              focus={focus}
              customIcon={true}
              searchValue={filterFeedbacks.search}
              onFocus={setFocus}
              withIcon={false}
              customStyles={{
                ...(focus ? { padding: '10px 20px 10px 16px' } : { padding: '0px' }),
                ...(focus ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
              }}
              onChange={(e) => setFilterFeedbacks({ ...filterFeedbacks, search: e.target.value })}
              onSettingsPress={() => {
                setFilterModal((prev) => !prev);
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
        <div className={css(reverseItemsStyled)}>
          {!loaded ? <Spinner /> : <DraftList items={submittedCompletedNotes} />}
          <div className={css(buttonsActionsStyle({ mobileScreen }))}>
            <div className={css(buttonContainerStyle)}>
              <div className={css({ display: 'inline-flex' })}>
                <Icon
                  graphic='chatSq'
                  iconStyles={{ verticalAlign: 'middle', margin: '2px 10px 0px 0px' }}
                  backgroundRadius={10}
                />
                <span className={css(shareFeedbackStyled)}>
                  <Trans i18nKey='give_feedback'>Give Feedback</Trans>
                </span>
              </div>
              <p className={css(questionStyled)}>
                <Trans i18nKey='give_feedback_to_a_colleague'>Give feedback to a colleague</Trans>
              </p>
              <Button
                styles={[iconBtnStyle]}
                onPress={() => {
                  navigate(buildPath(Page.GIVE_FEEDBACK));
                }}
              >
                <Trans i18nKey='give_feedback'>Give Feedback</Trans>
              </Button>
            </div>
            <div className={css(buttonContainerStyle)}>
              <div className={css({ display: 'inline-flex' })}>
                <Icon
                  graphic='download'
                  iconStyles={{ verticalAlign: 'middle', margin: '2px 10px 0px 0px' }}
                  backgroundRadius={10}
                />
                <span className={css(sizeStyle)}>
                  <Trans i18nKey='download_feedback'>Download feedback</Trans>
                </span>
              </div>
              <p className={css(savedStyled)}>
                <Trans i18nKey='download_feedback_to_your_device'>Download feedback to your device</Trans>
              </p>
              <Button
                data-test-id={'download-feedback'}
                styles={[iconBtnStyle, { maxWidth: 'fit-content !important' }]}
                onPress={handleDownloadAllPress}
              >
                <Trans i18nKey='download_feedbacks'>Download feedback</Trans>
              </Button>
            </div>
            <Notification
              closable={false}
              graphic='information'
              iconColor='pending'
              text={t(
                'worried_the_content_of_any_feedback',
                "If you're worried the content of any feedback you`ve received is inappropriate, please contact your line manager or People team as soon as possible.",
              )}
              customStyle={notificationStyles}
            />
          </div>
        </div>
      </div>
      {openMainModal && (
        <WrapperModal
          title={t('download_your_feedback', 'Download your feedback')}
          onClose={() => {
            dispatch(ColleaguesActions.clearColleagueList());
            setModalSuccess(() => false);
            setOpenMainModal(() => false);
          }}
        >
          <ModalDownloadFeedback
            setOpenMainModal={setOpenMainModal}
            modalSuccess={modalSuccess}
            setModalSuccess={setModalSuccess}
            closeHandler={closeHandler}
            downloadTitle={t(
              'which_feedback_would_you_like_to_download',
              'Which feedback would you like to download? ',
            )}
            downloadDescription={t(
              'use_the_search_bar_to_look_for_colleagues',
              'Use the search bar to look for colleagues who have given you feedback.',
            )}
          />
        </WrapperModal>
      )}
    </>
  );
};

const notificationStyles: Rule = ({ theme }) => {
  return {
    background: '#FFDBC2',
    marginBottom: theme.spacing.s5,
    marginTop: theme.spacing.s4,
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: theme.spacing.s0,
  };
};

const savedStyled: Rule = ({ theme }) => {
  return {
    fontWeight: 'normal',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: theme.spacing.s0,
    margin: `4px ${theme.spacing.s0} ${theme.spacing.s0} ${theme.spacing.s0}`,
  };
};

const sizeStyle: Rule = ({ theme }) => {
  return {
    fontWeight: theme.font.weight.bold,
    fontSize: theme.font.fixed.f18.fontSize,
    lineHeight: theme.font.fixed.f18.lineHeight,
    letterSpacing: theme.spacing.s0,
    color: theme.colors.tescoBlue,
  };
};

const flexCenterStyled: Rule = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
};

const spaceBetweenStyled: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    display: 'flex',
    flexWrap: mobileScreen ? 'wrap' : 'nowrap',
    ...(mobileScreen && { flexBasis: '250px' }),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.s6,
  });

const questionStyled: Rule = ({ theme }) => ({
  fontWeight: 'normal',
  fontSize: theme.spacing.s4,
  lineHeight: theme.spacing.s5,
  margin: `4px ${theme.spacing.s0} ${theme.spacing.s0} ${theme.spacing.s0}`,
});

const shareFeedbackStyled: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  fontSize: '18px',
  lineHeight: '22px',
  color: theme.colors.tescoBlue,
});

const reverseItemsStyled: Rule = ({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap-reverse',
  gridGap: theme.spacing.s2,
  marginTop: '34px',
  alignItems: 'stretch',
});

const iconStyle: Rule = {
  marginRight: '2px',
  marginTop: '3px',
};

const buttonsActionsStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    width: mobileScreen ? '100%' : '400px',
    flex: '1 0 250px',
    '& > div': {
      '&:nth-child(2)': {
        marginTop: theme.spacing.s4,
      },
    },
  });

const buttonContainerStyle: Rule = ({ theme }) => ({
  background: theme.colors.white,
  boxShadow: '3px 3px 1px 1px rgba(0, 0, 0, 0.05)',
  borderRadius: theme.spacing.s2_5,
  padding: '26px',
});

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: `${theme.spacing.s2} ${theme.spacing.s4}`,
  display: 'flex',
  height: '34px',
  borderRadius: '32px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.white,
  color: '#00539F',
  cursor: 'pointer',
  border: '2px solid #00539F',
  maxWidth: 'fit-content',
  marginLeft: 'auto',
  marginTop: theme.spacing.s4,
  whiteSpace: 'nowrap',
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
  letterSpacing: theme.spacing.s0,
  fontWeight: theme.font.weight.bold,
});

export default ViewFeedback;
