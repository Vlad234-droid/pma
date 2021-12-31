import React, { FC, useEffect, Dispatch, SetStateAction } from 'react';
import { Rule, Styles, useStyle, colors } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';
import { useDispatch, useSelector } from 'react-redux';
import {
  FeedbackActions,
  getReviewByUuidS,
  ObjectiveActions,
  getPropperNotesByStatusSelector,
  colleagueUUIDSelector,
} from '@pma/store';
import { FeedbackStatus, TargetTypeReverse } from '../../../config/enum';
import { filteredByInputSearchHandler, filteredNotesByRadiosBtnsHandler, formatToRelativeDate } from '../../../utils';
import defaultImg from '../../../../public/default.png';
import { NoFeedback } from '../../Feedback/components';

type filterFeedbacksType = {
  AZ: boolean;
  ZA: boolean;
  newToOld: boolean;
  oldToNew: boolean;
};

type DraftItemProps = {
  draftFeedback: (id: number) => void;
  checkedRadio: { read: boolean; unread: boolean };
  searchValue: string;
  focus: boolean;
  setFocus: Dispatch<SetStateAction<boolean>>;
  filterModal: boolean;
  setFilterModal: Dispatch<SetStateAction<boolean>>;
  setFilterFeedbacks: Dispatch<SetStateAction<filterFeedbacksType>>;
  filterFeedbacks: filterFeedbacksType;
};

const DraftItem: FC<DraftItemProps> = ({
  draftFeedback,
  checkedRadio,
  focus,
  setFocus,
  filterModal,
  setFilterModal,
  setFilterFeedbacks,
  filterFeedbacks,
  searchValue,
}) => {
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const { css } = useStyle();
  const dispatch = useDispatch();
  const submittedCompletedNotes = useSelector(getPropperNotesByStatusSelector(FeedbackStatus.SUBMITTED)) || [];
  const unReadNotes = submittedCompletedNotes.filter((item) => !item.read) || [];
  const readNotes = submittedCompletedNotes.filter((item) => item.read) || [];
  const review = useSelector(getReviewByUuidS) || [];

  useEffect(() => {
    if (!colleagueUuid) return;
    dispatch(
      FeedbackActions.getAllFeedbacks({
        'target-colleague-uuid': colleagueUuid,
      }),
    );
  }, [colleagueUuid]);

  useEffect(() => {
    if (unReadNotes.length && checkedRadio.unread) {
      dispatch(FeedbackActions.readFeedback({ uuid: unReadNotes[0].uuid }));
    }
  }, [unReadNotes.length]);

  useEffect(() => {
    if (unReadNotes.length) {
      for (const item of unReadNotes) {
        if (item.targetId) {
          dispatch(ObjectiveActions.getReviewByUuid({ uuid: item.targetId }));
        }
      }
    }
  }, [unReadNotes.length]);

  useEffect(() => {
    if (readNotes.length) {
      for (const item of readNotes) {
        if (item.targetId) {
          dispatch(ObjectiveActions.getReviewByUuid({ uuid: item.targetId }));
        }
      }
    }
  }, [readNotes.length]);

  const getPropperNotes = () => {
    if (checkedRadio.unread && searchValue.length <= 2 && Object.values(filterFeedbacks).every((item) => !item)) {
      return unReadNotes;
    } else if (
      checkedRadio.unread &&
      Object.values(filterFeedbacks).every((item) => !item) &&
      searchValue.length >= 2
    ) {
      return filteredByInputSearchHandler(unReadNotes, searchValue);
    } else if (Object.values(filterFeedbacks).some((item) => item === true) && checkedRadio.unread) {
      return filteredNotesByRadiosBtnsHandler(unReadNotes, filterFeedbacks);
    }
    if (checkedRadio.read && searchValue.length <= 2 && Object.values(filterFeedbacks).every((item) => !item)) {
      return readNotes;
    } else if (checkedRadio.read && searchValue.length >= 2 && Object.values(filterFeedbacks).every((item) => !item)) {
      return filteredByInputSearchHandler(readNotes, searchValue);
    } else if (Object.values(filterFeedbacks).some((item) => item === true) && checkedRadio.read) {
      return filteredNotesByRadiosBtnsHandler(readNotes, filterFeedbacks);
    }
  };

  const markAsReadFeedback = (uuid) => {
    if (checkedRadio.unread) {
      dispatch(FeedbackActions.readFeedback({ uuid }));
    }
  };

  const getPropperTargetType = (targetType, targetId) => {
    const capitalType =
      TargetTypeReverse[targetType] &&
      TargetTypeReverse[targetType].charAt(0).toUpperCase() + TargetTypeReverse[targetType].slice(1);

    if (capitalType) {
      let targetTypeStr = '';
      review.forEach((item) => {
        if (item.uuid === targetId) {
          targetTypeStr = item.title;
        }
      });

      return `“${capitalType}${targetTypeStr !== '' ? ':' : ''}${`${
        targetTypeStr !== '' ? ` ${targetTypeStr}` : `${targetTypeStr}`
      }`}”`;
    }
    return '';
  };

  if (checkedRadio.unread && !getPropperNotes().length) {
    return <NoFeedback />;
  }
  if (checkedRadio.read && !getPropperNotes().length) {
    return <NoFeedback />;
  }

  return (
    <>
      {getPropperNotes()?.map((item, i) => {
        return (
          <div key={item.uuid}>
            <TileWrapper customStyle={{ padding: '24px 24px 24px 24px' }}>
              <Accordion
                id={`draft-accordion-${item.uuid}`}
                customStyle={{
                  borderBottom: 'none',
                  marginTop: 0,
                }}
              >
                <BaseAccordion id={`draft-base-accordion-${item.uuid}`}>
                  {() => (
                    <>
                      <Section defaultExpanded={checkedRadio.unread ? !i : false}>
                        <div className={css(DraftStyles)}>
                          <div className={css(BlockInfo)}>
                            <div className={css({ alignSelf: 'flex-start' })}>
                              <img className={css(ImgStyle)} src={defaultImg} alt='photo' />
                            </div>
                            <div className={css({ marginLeft: '16px' })}>
                              <h3
                                className={css(NamesStyle)}
                              >{`${item?.colleagueProfile?.colleague?.profile?.firstName} ${item?.colleagueProfile?.colleague?.profile?.lastName}`}</h3>
                              <p
                                className={css(IndustryStyle)}
                              >{`${item?.colleagueProfile?.colleague?.workRelationships[0].job.name}, ${item?.colleagueProfile?.colleague?.workRelationships[0].department?.name}`}</p>
                            </div>
                          </div>
                          <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
                            <div className={css({ marginRight: '26px' })}>{formatToRelativeDate(item.updatedTime)}</div>
                            <ExpandButton onClick={(expanded) => expanded && markAsReadFeedback(item.uuid)} />
                          </div>
                        </div>

                        <Panel>
                          <TileWrapper
                            customStyle={{
                              width: 'auto',
                              padding: '24px',
                              margin: '0px 28px 28px 24px',
                              border: `1px solid ${colors.backgroundDarkest}`,
                            }}
                          >
                            <h2 className={css(TitleStyle)}>{getPropperTargetType(item.targetType, item.targetId)}</h2>
                            <>
                              <div className={css(InfoBlockStyle)}>
                                <h3>Question 1</h3>
                                {item.feedbackItems.map((question) => {
                                  return (
                                    <p key={question.code}>{question.code === 'Question 1' && question.content}</p>
                                  );
                                })}
                              </div>
                              <div className={css(InfoBlockStyle)}>
                                <h3>Question 2</h3>
                                {item.feedbackItems.map((question) => {
                                  return (
                                    <p key={question.code}>{question.code === 'Question 2' && question.content}</p>
                                  );
                                })}
                              </div>
                              <div className={css(InfoBlockStyle)}>
                                <h3>Anything else?</h3>
                                {item.feedbackItems.map((question) => {
                                  return (
                                    <p key={question.code}>
                                      {question.code === 'Anything else?'
                                        ? question.content !== ''
                                          ? question.content
                                          : '-'
                                        : ''}
                                    </p>
                                  );
                                })}
                              </div>
                            </>
                          </TileWrapper>
                          <IconButton
                            customVariantRules={{ default: iconBtnStyle }}
                            onPress={() => {
                              if (focus) setFocus(() => false);
                              if (filterModal) setFilterModal(() => false);
                              setFilterFeedbacks(() => ({ AZ: false, ZA: false, newToOld: false, oldToNew: false }));

                              draftFeedback(item.id);
                            }}
                            graphic='share'
                            iconProps={{ invertColors: false }}
                            iconStyles={iconStyle}
                          >
                            <Trans>Share</Trans>
                          </IconButton>
                        </Panel>
                      </Section>
                    </>
                  )}
                </BaseAccordion>
              </Accordion>
            </TileWrapper>
          </div>
        );
      })}
    </>
  );
};

const DraftStyles: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
};

const BlockInfo: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};

const ImgStyle: Rule = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
};
const NamesStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  margin: '0px',
  color: '#00539F',
};
const IndustryStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '4px 0px 0px 0px',
};
const TitleStyle: Rule = {
  margin: '0px 0px 16px 0px',
  fontSize: '16px',
  color: '#00539F',
  lineHeight: '20px',
};
const InfoBlockStyle: Rule = {
  marginBottom: '16px',
  '& > h3': {
    margin: '0px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  '& > p': {
    margin: '0px',
    fontSize: '14px',
  },
} as Styles;

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '12px 20px 12px 14px',
  display: 'flex',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '111px',
  fontWeight: 'bold',
  outline: 0,
  background: theme.colors.white,
  color: theme.colors.tescoBlue,
  cursor: 'pointer',
  width: '176px',
  border: '1px solid #00539F',
  whiteSpace: 'nowrap',
  marginLeft: 'auto',
  marginRight: '24px',
});

const iconStyle: Rule = {
  marginRight: '12px',
};
export default DraftItem;
