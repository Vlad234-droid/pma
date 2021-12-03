import React, { FC, SetStateAction, useEffect, Dispatch } from 'react';
import { useStyle, Rule, Styles } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, Section, Panel, ExpandButton } from 'components/Accordion';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';
import { FeedbackActions, getPropperNotesByStatusSelector } from '@pma/store';
import { useDispatch, useSelector } from 'react-redux';
import { getPropperTime } from '../../../utils';
import { FeedbackStatus } from '../../../config/enum';
import { filteredByInputSearchHandler, filteredNotesByRadiosBtnsHandler } from '../../../utils';
import defaultImg from '../../../../public/default.png';
import { colleagueUUIDSelector } from '@pma/store';

type filterFeedbacksType = {
  AZ: boolean;
  ZA: boolean;
  newToOld: boolean;
  oldToNew: boolean;
};

type TypecheckedRadio = {
  draft: boolean;
  submitted: boolean;
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
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { css } = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!colleagueUuid) return;
    dispatch(
      FeedbackActions.getAllFeedbacks({
        'colleague-uuid': colleagueUuid,
      }),
    );
  }, [colleagueUuid]);
  const draftedNotes = useSelector(getPropperNotesByStatusSelector(FeedbackStatus.DRAFT)) || [];
  const submittedNotes = useSelector(getPropperNotesByStatusSelector(FeedbackStatus.SUBMITTED)) || [];

  if (checkedRadio.submitted && !submittedNotes.length) {
    return null;
  }
  if (checkedRadio.draft && !draftedNotes.length) {
    return null;
  }

  const getPropperNotes = () => {
    if (checkedRadio.draft && searchValue.length <= 2 && Object.values(filterFeedbacks).every((item) => !item)) {
      return draftedNotes;
    } else if (checkedRadio.draft && searchValue.length >= 2 && Object.values(filterFeedbacks).every((item) => !item)) {
      return filteredByInputSearchHandler(draftedNotes, searchValue);
    } else if (Object.values(filterFeedbacks).some((item) => item === true) && checkedRadio.draft) {
      return filteredNotesByRadiosBtnsHandler(draftedNotes, filterFeedbacks);
    }

    if (checkedRadio.submitted && searchValue.length <= 2 && Object.values(filterFeedbacks).every((item) => !item)) {
      return submittedNotes;
    } else if (
      checkedRadio.submitted &&
      searchValue.length >= 2 &&
      Object.values(filterFeedbacks).every((item) => !item)
    ) {
      return filteredByInputSearchHandler(submittedNotes, searchValue);
    } else if (Object.values(filterFeedbacks).some((item) => item === true) && checkedRadio.submitted) {
      return filteredNotesByRadiosBtnsHandler(submittedNotes, filterFeedbacks);
    }
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
                            <img className={css(Img_style)} alt='photo' src={defaultImg} />
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
                          <ExpandButton />
                        </div>
                      </div>

                      <Panel>
                        <TileWrapper
                          customStyle={{ padding: '24px', margin: '0px 28px 24px 24px', border: '1px solid #E5E5E5' }}
                        >
                          <h2 className={css(Title_style)}>Objective: Provide a posititve customer experience</h2>

                          <div className={css(Info_block_style)}>
                            <h3>Question 1</h3>
                            {item.feedbackItems.map((question) => {
                              return (
                                <p key={question.code}>
                                  {question.code === 'Question 1'
                                    ? question.content !== ''
                                      ? question.content
                                      : '-'
                                    : ''}
                                </p>
                              );
                            })}
                          </div>
                          <div className={css(Info_block_style)}>
                            <h3>Question 2</h3>
                            {item.feedbackItems.map((question) => {
                              return (
                                <p key={question.code}>
                                  {question.code === 'Question 2'
                                    ? question.content !== ''
                                      ? question.content
                                      : '-'
                                    : ''}
                                </p>
                              );
                            })}
                          </div>
                          <div className={css(Info_block_style)}>
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
                        </TileWrapper>
                        {!checkedRadio.submitted && (
                          <IconButton
                            customVariantRules={{ default: iconBtnStyle }}
                            onPress={() => {
                              if (filterModal) setFilterModal(() => false);
                              setFilterFeedbacks(() => ({ AZ: false, ZA: false, newToOld: false, oldToNew: false }));
                              if (focus) setFocus(() => false);
                              draftFeedback(item);
                            }}
                            graphic='edit'
                            iconProps={{ invertColors: false }}
                            iconStyles={iconStyle}
                          >
                            <Trans i18nKey='give_feedback'>Give feedback</Trans>
                          </IconButton>
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
const Title_style: Rule = {
  margin: '0px 0px 16px 0px',
  fontSize: '16px',
  color: '#00539F',
  lineHeight: '20px',
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
  padding: '12px 20px 12px 22px',
  display: 'flex',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.white,
  color: theme.colors.tescoBlue,
  cursor: 'pointer',
  width: '176px',
  border: '1px solid #00539F',
  whiteSpace: 'nowrap',
  marginLeft: 'auto',
  marginRight: '24px',
  marginBottom: '24px',
});

const iconStyle: Rule = {
  marginRight: '12px',
};
export default DraftItem;
