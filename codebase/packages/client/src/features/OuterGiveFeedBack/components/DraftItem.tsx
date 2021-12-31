import React, { FC, SetStateAction, useEffect, Dispatch } from 'react';
import { useStyle, Rule, Styles, colors } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, Section, Panel, ExpandButton } from 'components/Accordion';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';
import { FeedbackActions, getPropperNotesByStatusSelector, colleagueUUIDSelector } from '@pma/store';
import { useDispatch, useSelector } from 'react-redux';
import { FeedbackStatus } from '../../../config/enum';
import { filteredByInputSearchHandler, filteredNotesByRadiosBtnsHandler, formatToRelativeDate } from '../../../utils';
import defaultImg from '../../../../public/default.png';
import { NoFeedback } from '../../Feedback/components';

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

  if (checkedRadio.submitted && !getPropperNotes().length) {
    return <NoFeedback />;
  }
  if (checkedRadio.draft && !getPropperNotes().length) {
    return <NoFeedback />;
  }

  return (
    <>
      {getPropperNotes()?.map((item) => (
        <div key={item.uuid}>
          <TileWrapper customStyle={{ padding: '24px' }}>
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
                            <img className={css(ImgStyle)} alt='photo' src={defaultImg} />
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
                          <ExpandButton />
                        </div>
                      </div>

                      <Panel>
                        <TileWrapper
                          customStyle={{
                            width: 'auto',
                            padding: '24px',
                            margin: '0px 28px 24px 24px',
                            border: `1px solid ${colors.backgroundDarkest}`,
                          }}
                        >
                          <h2 className={css(TitleStyle)}>Objective: Provide a posititve customer experience</h2>

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
                              setFilterFeedbacks(() => ({
                                AZ: false,
                                ZA: false,
                                newToOld: false,
                                oldToNew: false,
                              }));
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
  marginTop: '24px',
});

const iconStyle: Rule = {
  marginRight: '12px',
};
export default DraftItem;
