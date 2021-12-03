import React, { FC, useEffect, Dispatch, SetStateAction } from 'react';
import { useStyle, Rule, Styles } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, Section, Panel, ExpandButton } from 'components/Accordion';
import { IconButton, Position } from 'components/IconButton';
import { Trans } from 'components/Translation';
import { useDispatch, useSelector } from 'react-redux';
import { FeedbackActions, ObjectiveActions, getReviewByUuidS, getPropperNotesByStatusSelector } from '@pma/store';
import { getPropperTime } from '../../../utils';
import { FeedbackStatus } from '../../../config/enum';
import { filteredByInputSearchHandler, filteredNotesByRadiosBtnsHandler } from '../../../utils';
import defaultImg from '../../../../public/default.png';
import { colleagueUUIDSelector } from '@pma/store';

export const TEST_ID = 'test_id';

enum TargetType {
  OBJECTIVE = 'Objective',
}
type filterFeedbacksType = {
  AZ: boolean;
  ZA: boolean;
  newToOld: boolean;
  oldToNew: boolean;
};
type TypecheckedRadio = {
  pending: boolean;
  completed: boolean;
};
type DraftItemProps = {
  draftFeedback: (id: number) => void;
  checkedRadio: TypecheckedRadio;
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
  searchValue,
  focus,
  setFocus,
  filterModal,
  setFilterModal,
  setFilterFeedbacks,
  filterFeedbacks,
}) => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const pendingNotes = useSelector(getPropperNotesByStatusSelector(FeedbackStatus.PENDING)) || [];
  const completedNotes = useSelector(getPropperNotesByStatusSelector(FeedbackStatus.COMPLETED)) || [];
  const review = useSelector(getReviewByUuidS) || [];
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  useEffect(() => {
    if (!colleagueUuid) return;
    dispatch(
      FeedbackActions.getAllFeedbacks({
        'colleague-uuid': colleagueUuid,
      }),
    );
  }, [colleagueUuid]);

  useEffect(() => {
    if (pendingNotes.length) {
      for (const item of pendingNotes) {
        if (item.targetId) {
          dispatch(ObjectiveActions.getReviewByUuid({ uuid: item.targetId }));
        }
      }
    }
  }, [pendingNotes.length]);

  useEffect(() => {
    if (completedNotes.length) {
      for (const item of completedNotes) {
        if (item.targetId) {
          dispatch(ObjectiveActions.getReviewByUuid({ uuid: item.targetId }));
        }
      }
    }
  }, [completedNotes.length]);

  if (checkedRadio.pending && !pendingNotes.length) {
    return null;
  }
  if (checkedRadio.completed && !completedNotes.length) {
    return null;
  }

  const getPropperNotes = () => {
    if (checkedRadio.completed && searchValue.length <= 2 && Object.values(filterFeedbacks).every((item) => !item)) {
      return completedNotes;
    } else if (
      checkedRadio.completed &&
      searchValue.length >= 2 &&
      Object.values(filterFeedbacks).every((item) => !item)
    ) {
      return filteredByInputSearchHandler(completedNotes, searchValue);
    } else if (Object.values(filterFeedbacks).some((item) => item === true) && checkedRadio.completed) {
      return filteredNotesByRadiosBtnsHandler(completedNotes, filterFeedbacks);
    }

    if (checkedRadio.pending && searchValue.length <= 2 && Object.values(filterFeedbacks).every((item) => !item)) {
      return pendingNotes;
    } else if (
      checkedRadio.pending &&
      searchValue.length >= 2 &&
      Object.values(filterFeedbacks).every((item) => !item)
    ) {
      return filteredByInputSearchHandler(pendingNotes, searchValue);
    } else if (Object.values(filterFeedbacks).some((item) => item === true) && checkedRadio.pending) {
      return filteredNotesByRadiosBtnsHandler(pendingNotes, filterFeedbacks);
    }
  };

  const getPropperTargetType = (targetType, targetId) => {
    const capitalType = TargetType[targetType].charAt(0).toUpperCase() + TargetType[targetType].slice(1);

    let targetTypeStr = '';
    review.forEach((item) => {
      if (item.uuid === targetId) {
        targetTypeStr = item.title;
      }
    });

    return `“${capitalType}: ${targetTypeStr}”`;
  };

  return (
    <>
      {getPropperNotes()?.map((item) => (
        <div key={item.uuid}>
          <TileWrapper>
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
                    <Section defaultExpanded={false}>
                      <div className={css(Draft_Styles)}>
                        <div className={css(Block_info)}>
                          <div className={css({ alignSelf: 'flex-start' })}>
                            <img className={css(Img_style)} src={defaultImg} alt='photo' />
                          </div>
                          <div className={css({ marginLeft: '16px' })}>
                            <h3
                              className={css(Names_Style)}
                            >{`${item?.targetColleagueProfile?.colleague?.profile?.firstName} ${item?.targetColleagueProfile?.colleague?.profile?.lastName}`}</h3>
                            <p
                              className={css(Industry_Style)}
                            >{`${item?.targetColleagueProfile?.colleague?.workRelationships[0].job.name}, ${item?.targetColleagueProfile?.colleague?.workRelationships[0].department?.name}`}</p>
                          </div>
                        </div>
                        <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
                          <div className={css({ marginRight: '26px' })}>{getPropperTime(item.updatedTime)}</div>
                          <div data-test-id={TEST_ID}>
                            <ExpandButton />
                          </div>
                        </div>
                      </div>

                      <Panel>
                        <TileWrapper
                          boarder={false}
                          customStyle={{
                            padding: '16px',
                            margin: '0px 28px 16px 24px',
                            borderRadius: '10px',
                            background: '#F3F9FC',
                          }}
                        >
                          {checkedRadio.pending && (
                            <>
                              <h3 className={css(Tile_title)}>Your colleague has requested feedback from you on:</h3>
                              <h3 className={css(Sphere_resond_style)}>
                                {getPropperTargetType(item.targetType, item.targetId)}
                              </h3>
                              <p className={css(Question_style)}>Can you give them feedback on this objective?</p>
                            </>
                          )}
                          {checkedRadio.completed && (
                            <>
                              <h3 className={css(Sphere_resond_style)}>
                                {getPropperTargetType(item.targetType, item.targetId)}
                              </h3>
                              <div className={css(Info_block_style)}>
                                <h3>Question 1</h3>
                                {item.feedbackItems.map((question) => {
                                  return (
                                    <p key={question.code}>{question.code === 'Question 1' && question.content}</p>
                                  );
                                })}
                              </div>
                              <div className={css(Info_block_style)}>
                                <h3>Question 2</h3>
                                {item.feedbackItems.map((question) => {
                                  return (
                                    <p key={question.code}>{question.code === 'Question 2' && question.content}</p>
                                  );
                                })}
                              </div>
                              <div className={css(Info_block_style)}>
                                <h3>Anything else?</h3>
                                {item.feedbackItems.map((question) => {
                                  return (
                                    <p key={question.code}>{question.code === 'Anything else?' && question.content}</p>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </TileWrapper>
                        {checkedRadio.completed ? (
                          <></>
                        ) : (
                          checkedRadio.pending && (
                            <IconButton
                              customVariantRules={{ default: iconBtnStyle }}
                              iconPosition={Position.RIGHT}
                              onPress={() => {
                                if (filterModal) setFilterModal(() => false);
                                setFilterFeedbacks(() => ({ AZ: false, ZA: false, newToOld: false, oldToNew: false }));
                                if (focus) setFocus(() => false);
                                draftFeedback(item);
                              }}
                              graphic='arrowRight'
                              iconProps={{ invertColors: false }}
                            >
                              <Trans>Give feedback</Trans>
                            </IconButton>
                          )
                        )}
                      </Panel>
                    </Section>
                  </>
                )}
              </BaseAccordion>
            </Accordion>
          </TileWrapper>
        </div>
      ))}
    </>
  );
};

const Draft_Styles: Rule = {
  padding: '24px',
  display: 'flex',
  justifyContent: 'space-between',
};

const Block_info: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};

const Img_style: Rule = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
};
const Names_Style: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  margin: '0px',
  color: '#00539F',
};
const Industry_Style: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '4px 0px 0px 0px',
};

const Tile_title: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px 0px 4px 0px',
};

const Sphere_resond_style: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#00539F',
  margin: '0px 0px 16px 0px',
};
const Question_style: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '0px',
};
const Info_block_style: Rule = {
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
  padding: '12px 7px 12px 20px',
  display: 'flex',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
  width: '176px',
  border: '1px solid #00539F',
  whiteSpace: 'nowrap',
  marginLeft: 'auto',
  marginRight: '24px',
  marginBottom: '24px',
  fontWeight: 'bold',
});

export default DraftItem;
