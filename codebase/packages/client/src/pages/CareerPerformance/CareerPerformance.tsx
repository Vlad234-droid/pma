import React, { FC, useEffect } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { ReviewWidget, Widgets as ObjectiveWidgets } from 'features/Objectives';
import { Styles, useStyle } from '@dex-ddl/core';
import { DashboardProfile } from 'features/Profile';
import { BasicTile } from 'components/Tile';
import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { ObjectiveType, ReviewType, Status } from 'config/enum';
import { Header } from 'components/Header';
import { RouterSwitch } from 'components/RouterSwitch';
import { useSelector } from 'react-redux';
import {
  colleagueUUIDSelector,
  getTimelineByCodeSelector,
  getTimelineMetaSelector,
  getTimelineSelector,
  TimelineActions,
  timelineTypesAvailabilitySelector,
} from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import Check from '../../../public/Check.jpg';
import Feedback from '../../../public/Feedback.jpg';
import Learning from '../../../public/Learning.jpg';
import Contribution from '../../../public/Contribution.jpg';

const CareerPerformance: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { descriptions, startDates, statuses } = useSelector(getTimelineSelector) || {};
  const { loaded } = useSelector(getTimelineMetaSelector) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector);
  const midYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.MYR));
  const endYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.EYR));
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const canShowMyReview = timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];
  const canShowAnnualReview = !timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded && colleagueUuid) dispatch(TimelineActions.getTimeline({ colleagueUuid }));
  }, [loaded, colleagueUuid]);
  return (
    <>
      <div className={css({ margin: '8px' })}>
        <Header title='Your contribution' />
        <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
          <div />
          <RouterSwitch
            links={[
              { link: 'career-performance', name: 'My profile' },
              { link: 'my-team', name: 'My Team' },
            ]}
          />
          <div />
        </div>
        <div className={css(wrapperStyle)}>
          <div className={css({ flex: '3 1 504px', display: 'flex', flexDirection: 'column', gap: '8px' })}>
            <DashboardProfile />
            {canShowMyReview && (
              <StepIndicator
                mainTitle={t('Contribution timeline')}
                titles={descriptions}
                descriptions={startDates}
                statuses={statuses}
              />
            )}
          </div>
          <div className={css({ display: 'flex', flexDirection: 'column', flex: '1 0 216px', gap: '8px' })}>
            <div data-test-id='more' className={css({ height: '100%' })}>
              <BasicTile
                img='data:image/png;base64,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'
                hover={false}
                title={'If something is not right, please raise a ticket on Colleague Help'}
                imgCustomStyle={{ width: '30px', margin: '10px auto 0px auto' }}
                customStyle={{ background: '#fad919', textAlign: 'center', height: '100%' }}
                icon={true}
              />
            </div>
            <div data-test-id='more' className={css({ height: '100%' })}>
              <BasicTile
                hover={true}
                img='data:image/png;base64,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'
                title={'Whant to understand more about perfomance tools at Tesco?'}
                imgCustomStyle={{ width: '30px', margin: '10px auto 0px auto' }}
                customStyle={{ textAlign: 'center', height: '100%' }}
                icon={true}
              />
            </div>
          </div>
        </div>

        <ObjectiveWidgets />

        <section className={css({ marginTop: '32px' })}>
          <div className={css({ margin: '12px 0', fontSize: '20px', lineHeight: '24px', fontWeight: 'bold' })}>
            <Trans i18nKey='my_reviews'>My reviews</Trans>
          </div>
          <div className={css(wrapperStyle)}>
            {canShowMyReview && (
              <>
                <div data-test-id='personal' className={css(basicTileStyle)}>
                  <ReviewWidget
                    reviewType={ReviewType.MYR}
                    status={Status.STARTED}
                    startDate={midYearReview.startDate}
                    onClick={() => console.log('ReviewWidget')}
                    onClose={() => console.log('ReviewWidget')}
                    title={'Mid-year review'}
                    description={t('Your mid-year review form and results will appear here.')}
                    customStyle={{ height: '100%' }}
                  />
                </div>
                <div data-test-id='feedback' className={css(basicTileStyle)}>
                  <ReviewWidget
                    reviewType={ReviewType.EYR}
                    status={Status.STARTED}
                    startDate={endYearReview.startDate}
                    onClick={() => console.log('ReviewWidget')}
                    onClose={() => console.log('ReviewWidget')}
                    title={'End-year review'}
                    description={'Your end-year review form and results will appear here.'}
                    customStyle={{ height: '100%' }}
                  />
                </div>
              </>
            )}
            {canShowAnnualReview && (
              <div data-test-id='feedback' className={css(basicTileStyle)}>
                <ReviewWidget
                  reviewType={ReviewType.EYR}
                  status={Status.STARTED}
                  onClick={() => console.log('ReviewWidget')}
                  onClose={() => console.log('ReviewWidget')}
                  title={'Annual performance review'}
                  description={'Your end-year review form and results will appear here.'}
                  customStyle={{ height: '100%' }}
                />
              </div>
            )}
          </div>
        </section>
        <section className={css({ marginTop: '32px' })}>
          <div className={css({ margin: '12px 0', fontSize: '20px', lineHeight: '24px', fontWeight: 'bold' })}>
            <Trans i18nKey='useful_resources'>Useful resources</Trans>
          </div>
          <div className={css(wrapperStyle)}>
            <div data-test-id='personal' className={css(basicTileStyle)} onClick={console.log}>
              <BasicTile
                hover={true}
                img={Contribution}
                title={t('Your Contribution')}
                description={t('Click here to find the Your Contribution Guide and other useful resources.')}
                customStyle={{
                  height: '100%',
                }}
              />
            </div>
            <div data-test-id='personal' className={css(basicTileStyle)} onClick={console.log}>
              <BasicTile
                hover={true}
                img={Check}
                title={t('Check-ins and Reviews')}
                description={t('Tile description: Useful guidance on having great performance conversations.')}
                customStyle={{
                  height: '100%',
                }}
              />
            </div>
            <div data-test-id='feedback' className={css(basicTileStyle)}>
              <BasicTile
                hover={true}
                img={Feedback}
                title={t('Feedback at Tesco')}
                description={t('Learn more about giving and receiving great feedback.')}
                customStyle={{
                  height: '100%',
                }}
              />
            </div>
            <div data-test-id='feedback' className={css(basicTileStyle)}>
              <BasicTile
                hover={true}
                img={Learning}
                title={t('Learning')}
                description={t('Click through to access further learning.')}
                customStyle={{
                  height: '100%',
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const wrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
} as Styles;

const basicTileStyle = {
  flex: '1 0 216px',
} as Styles;

export default CareerPerformance;
