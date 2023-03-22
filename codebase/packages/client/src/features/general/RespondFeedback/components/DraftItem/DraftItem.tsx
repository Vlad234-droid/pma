import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { getLoadedStateSelector, ReviewsActions } from '@pma/store';

import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, Panel, Section } from 'components/Accordion';
import IconButtonDefault from 'components/IconButtonDefault';
import CompletedNotes from '../CompletedNotes';
import { Page } from 'pages';
import { FeedbackProfileInfo } from 'features/general/Feedback/components';
import PendingNotes from '../PendingNotes';
import { Plug } from 'components/Plug';
import { useTranslation } from 'components/Translation';

import { paramsReplacer } from 'utils';
import { FeedbackStatus, Tesco } from 'config/enum';
import { DraftItemProps } from '../../type';
import { buildPath } from 'features/general/Routes';

export const TEST_ID = 'expand_button';

const DraftItem: FC<DraftItemProps> = ({ status, list, canEdit, plugElement }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  if (!list.length)
    return (
      plugElement || <Plug text={t('no_feedback_records_to_be_displayed', 'No feedback records to be displayed.')} />
    );

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
                      <FeedbackProfileInfo
                        firstName={item?.targetColleagueProfile?.colleague?.profile?.firstName}
                        lastName={item?.targetColleagueProfile?.colleague?.profile?.lastName}
                        job={item?.targetColleagueProfile?.colleague?.workRelationships[0]?.job?.name}
                        department={item?.targetColleagueProfile?.colleague?.workRelationships[0]?.department?.name}
                        updatedTime={item.updatedTime}
                      />

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
                              onClick={() =>
                                navigate(buildPath(paramsReplacer(Page.RESPOND_NEW_FEEDBACK, { ':uuid': item.uuid })))
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

const wrapperBtnStyle: Rule = {
  marginLeft: 'auto',
  marginRight: '24px',
};

export default DraftItem;
