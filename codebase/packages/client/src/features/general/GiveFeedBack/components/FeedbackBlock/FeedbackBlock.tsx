import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useSelector } from 'react-redux';
import { getLoadedStateSelector } from '@pma/store';
import { Page } from 'pages';

import { Accordion, BaseAccordion, Panel, Section } from 'components/Accordion';
import IconButtonDefault from 'components/IconButtonDefault';
import { FeedbackProfileInfo } from 'features/general/Feedback/components';
import { TileWrapper } from 'components/Tile';
import Spinner from 'components/Spinner';
import { Plug } from 'components/Plug';

import { paramsReplacer } from 'utils';
import { useTranslation } from 'components/Translation';
import FeedbackItem from './FeedbackItem';
import { buildPath } from '../../../Routes';

type Props = {
  list: Array<any>;
  canEdit: boolean;
  plugElement?: JSX.Element;
};

const FeedbackBlock: FC<Props> = ({ list, canEdit, plugElement }) => {
  const { loaded } = useSelector(getLoadedStateSelector);

  const { css } = useStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!loaded) return <Spinner />;
  if (loaded && !list.length)
    return (
      plugElement || <Plug text={t('no_feedback_records_to_be_displayed', 'No feedback records to be displayed.')} />
    );

  return (
    <>
      {list?.map((item) => (
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
                          <FeedbackItem
                            item={item}
                            title={t(
                              'looking_back_at_what_you_seen',
                              'Looking back at what you&apos;ve seen recently, what would you like to say to this colleague about what they&apos;ve delivered or how they&apos;ve gone about it?',
                            )}
                            itemCodeText={`${t('question', 'Question')} 1`}
                          />

                          <FeedbackItem
                            item={item}
                            title={t(
                              'looking_forward_what_should_this_colleague_do_more',
                              'Looking forward, what should this colleague do more (or less) of in order to be at their best?',
                            )}
                            itemCodeText={`${t('question', 'Question')} 2`}
                          />

                          <FeedbackItem
                            item={item}
                            title={t(
                              'add_any_other_comments_you_would_like_to_share_with_your_colleague',
                              'Add any other comments you would like to share with your colleague.',
                            )}
                            itemCodeText={t('anything_else', 'Anything else?')}
                          />
                        </TileWrapper>
                        {canEdit && (
                          <div className={css(wrapperBtnStyle)}>
                            <IconButtonDefault
                              graphic='arrowRight'
                              onClick={() => {
                                navigate(buildPath(paramsReplacer(Page.GIVE_NEW_FEEDBACK, { ':uuid': item.uuid })));
                              }}
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
