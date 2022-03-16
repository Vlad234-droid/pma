import React, { FC, useEffect } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { useSelector, useDispatch } from 'react-redux';
import { getLoadedStateSelector, ReviewsActions } from '@pma/store';
import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, Section, Panel, ExpandButton } from 'components/Accordion';
import { formatToRelativeDate, paramsReplacer } from 'utils';
import IconButtonDefault from 'components/IconButtonDefault';
import { FeedbackStatus, Tesco } from 'config/enum';
import defaultImg from 'images/default.png';
import { DraftItemProps } from '../../type';
import { NoFeedback } from '../../../Feedback/components';
import PendingNotes from '../PendingNotes';
import CompletedNotes from '../CompletedNotes';
import { useNavigate } from 'react-router-dom';
import { Page } from 'pages';

export const TEST_ID = 'expand_button';

const DraftItem: FC<DraftItemProps> = ({ status, list, canEdit }) => {
  const { css } = useStyle();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (list.length) {
      for (const item of list) {
        if (item.targetId && item.targetId !== Tesco.TescoBank) {
          dispatch(ReviewsActions.getReviewByUuid({ uuid: item.targetId }));
        }
      }
    }
  }, [list.length]);

  const { loaded } = useSelector(getLoadedStateSelector);

  if (!loaded) return null;

  if (!list.length) return <NoFeedback />;

  return (
    <>
      {list.map((item) => (
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
                      <div className={css(draftStyles)}>
                        <div className={css(blockInfo)}>
                          <div className={css({ alignSelf: 'flex-start' })}>
                            <img className={css(imgStyle)} src={defaultImg} alt='photo' />
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
                          {status === FeedbackStatus.PENDING && <PendingNotes item={item} />}
                          {status === FeedbackStatus.COMPLETED && <CompletedNotes item={item} />}
                        </TileWrapper>
                        {canEdit && (
                          <div className={css(wrapperBtnStyle)}>
                            <IconButtonDefault
                              graphic='arrowRight'
                              onClick={() => {
                                navigate(paramsReplacer(`/${Page.RESPOND_NEW_FEEDBACK}`, { ':uuid': item.uuid }));
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

const wrapperBtnStyle: Rule = {
  marginLeft: 'auto',
  marginRight: '24px',
};

export default DraftItem;
