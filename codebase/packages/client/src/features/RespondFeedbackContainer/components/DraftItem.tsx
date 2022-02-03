import React, { FC, useEffect } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { useDispatch, useSelector } from 'react-redux';
import { FeedbackActions, ObjectiveActions, colleagueUUIDSelector, getNotesArgsSelector } from '@pma/store';

import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, Section, Panel, ExpandButton } from 'components/Accordion';
import { filteredByInputSearchHandler, filteredNotesByRadiosBtnsHandler, formatToRelativeDate } from 'utils';
import IconButtonDefault from 'components/IconButtonDefault';
import { FeedbackStatus, Tesco } from 'config/enum';

import defaultImg from 'images/default.png';
import { DraftItemProps } from '../type';
import { NoFeedback } from '../../Feedback/components';
import PendingNotes from './PendingNotes';
import CompletedNotes from './CompletedNotes';

export const TEST_ID = 'test_id';

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
  const colleagueUuid = useSelector(colleagueUUIDSelector);

  const pendingNotes = useSelector(getNotesArgsSelector(FeedbackStatus.PENDING, colleagueUuid)) || [];
  const completedNotes = useSelector(getNotesArgsSelector(FeedbackStatus.COMPLETED, colleagueUuid)) || [];

  useEffect(() => {
    if (!colleagueUuid) return;
    dispatch(
      FeedbackActions.getAllFeedbacks({
        'colleague-uuid': colleagueUuid,
        _limit: '300',
      }),
    );
  }, [colleagueUuid]);

  useEffect(() => {
    if (pendingNotes.length) {
      for (const item of pendingNotes) {
        if (item.targetId && item.targetId !== Tesco.TescoBank) {
          dispatch(ObjectiveActions.getReviewByUuid({ uuid: item.targetId }));
        }
      }
    }
  }, [pendingNotes.length]);

  useEffect(() => {
    if (completedNotes.length) {
      for (const item of completedNotes) {
        if (item.targetId && item.targetId !== Tesco.TescoBank) {
          dispatch(ObjectiveActions.getReviewByUuid({ uuid: item.targetId }));
        }
      }
    }
  }, [completedNotes.length]);

  const handleFeedbackBtnClick = (item) => {
    if (filterModal) setFilterModal(() => false);

    setFilterFeedbacks(() => ({ AZ: false, ZA: false, newToOld: false, oldToNew: false }));

    if (focus) setFocus(() => false);

    draftFeedback(item);
  };

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

  if (checkedRadio.pending && !getPropperNotes().length) {
    return <NoFeedback />;
  }
  if (checkedRadio.completed && !getPropperNotes().length) {
    return <NoFeedback />;
  }

  return (
    <>
      {getPropperNotes()?.map((item) => (
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
                    <Section defaultExpanded={false}>
                      <div className={css(DraftStyles)}>
                        <div className={css(BlockInfo)}>
                          <div className={css({ alignSelf: 'flex-start' })}>
                            <img className={css(ImgStyle)} src={defaultImg} alt='photo' />
                          </div>
                          <div className={css({ marginLeft: '16px' })}>
                            <h3
                              className={css(NamesStyle)}
                            >{`${item?.targetColleagueProfile?.colleague?.profile?.firstName} ${item?.targetColleagueProfile?.colleague?.profile?.lastName}`}</h3>
                            <p
                              className={css(IndustryStyle)}
                            >{`${item?.targetColleagueProfile?.colleague?.workRelationships[0].job.name}, ${item?.targetColleagueProfile?.colleague?.workRelationships[0].department?.name}`}</p>
                          </div>
                        </div>
                        <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
                          <div className={css({ marginRight: '26px' })}>{formatToRelativeDate(item.updatedTime)}</div>
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
                            margin: '24px 24px 24px 0px',
                            borderRadius: '10px',
                            background: '#F3F9FC',
                            width: 'auto',
                          }}
                        >
                          {checkedRadio.pending && <PendingNotes item={item} />}
                          {checkedRadio.completed && <CompletedNotes item={item} />}
                        </TileWrapper>
                        {checkedRadio.completed ? (
                          <></>
                        ) : (
                          checkedRadio.pending && (
                            <div className={css(wrapperBtnStyle)}>
                              <IconButtonDefault graphic='arrowRight' onClick={() => handleFeedbackBtnClick(item)} />
                            </div>
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

const wrapperBtnStyle: Rule = {
  marginLeft: 'auto',
  marginRight: '24px',
};

export default DraftItem;
