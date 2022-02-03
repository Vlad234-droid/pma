import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyle, Rule, Styles, colors } from '@dex-ddl/core';

import { NoFeedback } from 'features/Feedback/components';
import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, Section, Panel, ExpandButton } from 'components/Accordion';
import { formatToRelativeDate, paramsReplacer } from 'utils';
import { Page } from 'pages';
import IconButtonDefault from 'components/IconButtonDefault';

import defaultImg from 'images/default.png';

type Props = {
  list: Array<any>;
  canEdit: boolean;
};

const FeedbackBlock: FC<Props> = ({ list, canEdit }) => {
  const { css } = useStyle();
  const navigate = useNavigate();

  if (!list.length) {
    return <NoFeedback />;
  }

  return (
    <>
      {list.map((item) => (
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
                      <div className={css(draftStyles)}>
                        <div className={css(blockInfo)}>
                          <div className={css({ alignSelf: 'flex-start' })}>
                            <img className={css(imgStyle)} alt='photo' src={defaultImg} />
                          </div>
                          <div className={css({ marginLeft: '16px' })}>
                            <h3
                              className={css(namesStyle)}
                            >{`${item?.targetColleagueProfile?.colleague?.profile?.firstName} ${item?.targetColleagueProfile?.colleague?.profile?.lastName}`}</h3>
                            <p
                              className={css(industryStyle)}
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
                            margin: '24px 28px 24px 0px',
                            border: `1px solid ${colors.backgroundDarkest}`,
                          }}
                        >
                          <div className={css(infoBlockStyle)}>
                            <h3>
                              Looking back at what you&apos;ve seen recently, what would you like to say to this
                              colleague about what they&apos;ve delivered or how they&apos;ve gone about it?
                            </h3>
                            {item.feedbackItems.map((question) => {
                              return (
                                <p className={css(wordBreakStyle)} key={question.code}>
                                  {question.code === 'Question 1'
                                    ? question.content !== ''
                                      ? question.content
                                      : '-'
                                    : ''}
                                </p>
                              );
                            })}
                          </div>
                          <div className={css(infoBlockStyle)}>
                            <h3>
                              Looking forward, what should this colleague do more (or less) of in order to be at their
                              best?
                            </h3>
                            {item.feedbackItems.map((question) => {
                              return (
                                <p className={css(wordBreakStyle)} key={question.code}>
                                  {question.code === 'Question 2'
                                    ? question.content !== ''
                                      ? question.content
                                      : '-'
                                    : ''}
                                </p>
                              );
                            })}
                          </div>
                          <div className={css(infoBlockStyle)}>
                            <h3>Add any other comments you would like to share with your colleague.</h3>
                            {item.feedbackItems.map((question) => {
                              return (
                                <p className={css(wordBreakStyle)} key={question.code}>
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
                        {canEdit && (
                          <div className={css(wrapperBtnStyle)}>
                            <IconButtonDefault
                              graphic='arrowRight'
                              onClick={() =>
                                navigate(paramsReplacer(`/${Page.GIVE_NEW_FEEDBACK}`, { ':uuid': item.uuid }))
                              }
                            />
                          </div>
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

const wordBreakStyle: Rule = {
  wordBreak: 'break-all',
};

const draftStyles: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
};

const blockInfo: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};

const imgStyle: Rule = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
};
const namesStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  margin: '0px',
  color: '#00539F',
};
const industryStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '4px 0px 0px 0px',
};

const infoBlockStyle: Rule = {
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

const wrapperBtnStyle: Rule = {
  marginLeft: 'auto',
};

export default FeedbackBlock;
