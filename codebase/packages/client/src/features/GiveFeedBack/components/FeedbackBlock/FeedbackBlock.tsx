import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { useSelector } from 'react-redux';
import { getLoadedStateSelector } from '@pma/store';
import { Page } from 'pages';

import { Accordion, BaseAccordion, Panel, Section } from 'components/Accordion';
import IconButtonDefault from 'components/IconButtonDefault';
import { FeedbackProfileInfo, NoFeedback } from 'features/Feedback/components';
import { TileWrapper } from 'components/Tile';
import Spinner from 'components/Spinner';

import { paramsReplacer } from 'utils';
import { Trans, useTranslation } from 'components/Translation';

type Props = {
  list: Array<any>;
  canEdit: boolean;
};

// TODO: Extract duplicate 12
const FeedbackBlock: FC<Props> = ({ list, canEdit }) => {
  const { loaded } = useSelector(getLoadedStateSelector);

  const { css } = useStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!loaded) return <Spinner />;
  if (loaded && !list.length) return <NoFeedback />;

  //TODO: this is hard to read. Extract pieces to separate components
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
                      <FeedbackProfileInfo
                        firstName={item?.targetColleagueProfile?.colleague?.profile?.firstName}
                        lastName={item?.targetColleagueProfile?.colleague?.profile?.lastName}
                        job={item?.targetColleagueProfile?.colleague?.workRelationships[0]?.job?.name}
                        department={item?.targetColleagueProfile?.colleague?.workRelationships[0]?.department?.name}
                        updatedTime={item.updatedTime}
                      />

                      <Panel>
                        <TileWrapper customStyle={tileWrapperStyle}>
                          <div className={css(infoBlockStyle)}>
                            <h3>
                              <Trans i18nKey='looking_back_at_what_you_seen'>
                                Looking back at what you&apos;ve seen recently, what would you like to say to this
                                colleague about what they&apos;ve delivered or how they&apos;ve gone about it?
                              </Trans>
                            </h3>
                            {item.feedbackItems.map((question) => {
                              return (
                                <p className={css(wordBreakStyle)} key={question.code}>
                                  {question.code === `${t('question', 'Question')} 1`
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
                              <Trans i18nKey='looking_forward_what_should_this_colleague_do_more'>
                                Looking forward, what should this colleague do more (or less) of in order to be at their
                                best?
                              </Trans>
                            </h3>
                            {item.feedbackItems.map((question) => {
                              return (
                                <p className={css(wordBreakStyle)} key={question.code}>
                                  {question.code === `${t('question', 'Question')} 2`
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
                              <Trans i18nKey='add_any_other_comments_you_would_like_to_share_with_your_colleague'>
                                Add any other comments you would like to share with your colleague.
                              </Trans>
                            </h3>
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

const infoBlockStyle: Rule = ({ theme }) =>
  ({
    marginBottom: theme.spacing.s4,
    '& > h3': {
      margin: theme.spacing.s0,
      fontWeight: theme.font.weight.bold,
      fontSize: theme.spacing.s3_5,
    },
    '& > p': {
      margin: theme.spacing.s0,
      fontSize: theme.spacing.s3_5,
    },
  } as Styles);

const wrapperBtnStyle: Rule = {
  marginLeft: 'auto',
};

const tileWrapperStyle: Rule = ({ theme }) => ({
  width: 'auto',
  padding: theme.spacing.s6,
  margin: `${theme.spacing.s6} 28px ${theme.spacing.s6} ${theme.spacing.s0}`,
  // @ts-ignore
  border: `2px solid ${theme.colors.lightGray}`,
});

export default FeedbackBlock;
