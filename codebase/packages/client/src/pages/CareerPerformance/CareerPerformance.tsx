import React, { FC, useEffect } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { ReviewWidget, Widgets as ObjectiveWidgets } from 'features/Objectives';
import { Styles, useStyle } from '@dex-ddl/core';

import { DashboardProfile } from 'features/Profile';
import { BasicTile } from 'components/Tile';
import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { ObjectiveType, Status } from 'config/enum';
import { Header } from 'components/Header';
import { RouterSwitch } from 'components/RouterSwitch';
import { useSelector } from 'react-redux';
import {
  getTimelineMetaSelector,
  getTimelineSelector,
  timelineTypesAvailabilitySelector,
  TimelineActions,
} from '@pma/store';
import useDispatch from 'hooks/useDispatch';

const CareerPerformance: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { descriptions, startDates, statuses } = useSelector(getTimelineSelector) || {};
  const { loaded } = useSelector(getTimelineMetaSelector) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector);
  const canShowMyReview = timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];
  const canShowAnnualReview = !timelineTypes[ObjectiveType.MYR] && timelineTypes[ObjectiveType.EYR];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) dispatch(TimelineActions.getTimeline());
  }, [loaded]);
  return (
    <>
      <div className={css({ margin: '8px' })}>
        <Header title='Performance Overview' />
        <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
          <div />
          <RouterSwitch
            links={[
              { link: 'career-performance', name: 'My  View' },
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
                mainTitle={t('performance_timeline_title', 'My Performance Timeline')}
                titles={descriptions}
                descriptions={startDates}
                statuses={statuses}
              />
            )}
          </div>
          <div data-test-id='more' className={css(basicTileStyle)}>
            <BasicTile
              hover={true}
              img='https://digitalcontent.api.tesco.com/v2/media/ghs-mktg/d5606eb3-af6b-4200-a7b4-a59e72a20ad9/2321-GHS-743x430-GM-TescoHome.jpeg'
              title={t('tiles_title_id_1', 'Want to understand more about performance tools at Tesco?')}
              description={t(
                'tiles_description_id_1',
                'Urna laoreet viverra convallis gravida eu justo. Tincidunt tristique nisl est.',
              )}
            />
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
                    status={Status.AVAILABLE}
                    onClick={() => console.log('ReviewWidget')}
                    title={'Mid-year review'}
                    description={t('tiles_description_id_3', 'Your mid-year review form and results will appear here.')}
                    customStyle={{ height: '100%' }}
                  />
                </div>
                <div data-test-id='feedback' className={css(basicTileStyle)}>
                  <ReviewWidget
                    status={Status.NOT_AVAILABLE}
                    onClick={() => console.log('ReviewWidget')}
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
                  status={Status.NOT_AVAILABLE}
                  onClick={() => console.log('ReviewWidget')}
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
                img='https://digitalcontent.api.tesco.com/v2/media/ghs-mktg/d5606eb3-af6b-4200-a7b4-a59e72a20ad9/2321-GHS-743x430-GM-TescoHome.jpeg'
                title={t('tiles_title_id_4', 'Want to understand more about performance tools at Tesco?')}
                description={t(
                  'tiles_description_id_4',
                  'Urna laoreet viverra convallis gravida eu justo. Tincidunt tristique nisl est.',
                )}
              />
            </div>
            <div data-test-id='personal' className={css(basicTileStyle)} onClick={console.log}>
              <BasicTile
                hover={true}
                img='https://digitalcontent.api.tesco.com/v2/media/ghs-mktg/d5606eb3-af6b-4200-a7b4-a59e72a20ad9/2321-GHS-743x430-GM-TescoHome.jpeg'
                title={t('tiles_title_id_4', 'Want to understand more about performance tools at Tesco?')}
                description={t(
                  'tiles_description_id_4',
                  'Urna laoreet viverra convallis gravida eu justo. Tincidunt tristique nisl est.',
                )}
              />
            </div>
            <div data-test-id='feedback' className={css(basicTileStyle)}>
              <BasicTile
                hover={true}
                img='https://digitalcontent.api.tesco.com/v2/media/ghs-mktg/d5606eb3-af6b-4200-a7b4-a59e72a20ad9/2321-GHS-743x430-GM-TescoHome.jpeg'
                title={t('tiles_title_id_4', 'Want to understand more about performance tools at Tesco?')}
                description={t(
                  'tiles_description_id_4',
                  'Urna laoreet viverra convallis gravida eu justo. Tincidunt tristique nisl est.',
                )}
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
  alignItems: 'stretch',
} as Styles;

const basicTileStyle = {
  flex: '1 0 216px',
} as Styles;

export default CareerPerformance;
