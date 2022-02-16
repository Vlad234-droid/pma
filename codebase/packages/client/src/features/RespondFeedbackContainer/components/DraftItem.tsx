import React, { FC, useEffect, useCallback } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { useDispatch, useSelector } from 'react-redux';
import { FeedbackActions, ReviewsActions, colleagueUUIDSelector, getNotesArgsSelector } from '@pma/store';
import debounce from 'lodash.debounce';
import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, Section, Panel, ExpandButton } from 'components/Accordion';
import { formatToRelativeDate } from 'utils';
import IconButtonDefault from 'components/IconButtonDefault';
import { FeedbackStatus, Tesco } from 'config/enum';
import { getSortString } from 'utils/feedback';
import defaultImg from 'images/default.png';
import { DraftItemProps } from '../type';
import { NoFeedback } from '../../Feedback/components';
import PendingNotes from './PendingNotes';
import CompletedNotes from './CompletedNotes';

export const TEST_ID = 'test_id';

const DraftItem: FC<DraftItemProps> = ({
  draftFeedback,
  checkedRadio,
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

  const getAllFeedback = useCallback(
    debounce((filter) => {
      dispatch(
        FeedbackActions.getAllFeedbacks({
          _limit: '300',
          'colleague-uuid': colleagueUuid,
          ...(filter.search.length > 2 && { _search: filter.search }),
          _sort: getSortString(filter),
        }),
      );
    }, 300),
    [],
  );

  useEffect(() => {
    if (!colleagueUuid) return;
    getAllFeedback(filterFeedbacks);
  }, [colleagueUuid, filterFeedbacks]);

  useEffect(() => {
    if (pendingNotes.length) {
      for (const item of pendingNotes) {
        if (item.targetId && item.targetId !== Tesco.TescoBank) {
          dispatch(ReviewsActions.getReviewByUuid({ uuid: item.targetId }));
        }
      }
    }
  }, [pendingNotes.length]);

  useEffect(() => {
    if (completedNotes.length) {
      for (const item of completedNotes) {
        if (item.targetId && item.targetId !== Tesco.TescoBank) {
          dispatch(ReviewsActions.getReviewByUuid({ uuid: item.targetId }));
        }
      }
    }
  }, [completedNotes.length]);

  const handleFeedbackBtnClick = (item) => {
    if (filterModal) setFilterModal(() => false);

    setFilterFeedbacks(() => ({ sort: '', search: '' }));

    draftFeedback(item);
  };

  const getPropperNotes = () => {
    if (checkedRadio.completed) return completedNotes;
    return pendingNotes;
  };

  if (checkedRadio?.pending && !getPropperNotes().length) {
    return <NoFeedback />;
  }
  if (checkedRadio?.completed && !getPropperNotes().length) {
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
                          {checkedRadio?.pending && <PendingNotes item={item} />}
                          {checkedRadio?.completed && <CompletedNotes item={item} />}
                        </TileWrapper>
                        {checkedRadio?.completed ? (
                          <></>
                        ) : (
                          checkedRadio?.pending && (
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
