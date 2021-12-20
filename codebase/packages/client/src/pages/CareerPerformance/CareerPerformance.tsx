import React, { FC, useEffect } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { ReviewWidget, Widgets as ObjectiveWidgets } from 'features/Objectives';
import { Styles, useStyle } from '@dex-ddl/core';
import { DashboardProfile } from 'features/Profile';
import { BasicTile } from 'components/Tile';
import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { ObjectiveType, ReviewType } from 'config/enum';
import { RouterSwitch } from 'components/RouterSwitch';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  colleagueUUIDSelector,
  getTimelineByCodeSelector,
  getTimelineMetaSelector,
  getTimelineSelector,
  isManager,
  TimelineActions,
  timelineTypesAvailabilitySelector,
} from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import Check from '../../../public/Check.jpg';
import Feedback from '../../../public/Feedback.jpg';
import Learning from '../../../public/Learning.jpg';
import Contribution from '../../../public/Contribution.jpg';
import { Icon } from 'components/Icon';
import { Page } from '../types';

const CareerPerformance: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { descriptions, startDates, statuses } = useSelector(getTimelineSelector) || {};
  const { loaded } = useSelector(getTimelineMetaSelector) || {};
  const timelineTypes = useSelector(timelineTypesAvailabilitySelector);
  const midYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.MYR));
  const endYearReview = useSelector(getTimelineByCodeSelector(ObjectiveType.EYR));
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const isRoleManager = useSelector(isManager);
  const canShowMyReview = timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];
  const canShowAnnualReview = !timelineTypes[ReviewType.MYR] && timelineTypes[ReviewType.EYR];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded && colleagueUuid) dispatch(TimelineActions.getTimeline({ colleagueUuid }));
  }, [loaded, colleagueUuid]);

  const handleBtnHelp = () => {
    window.open('https://www.ourtesco.com/colleague/help', '_blank')?.focus();
  };
  return (
    <>
      <div className={css({ display: 'flex', justifyContent: 'space-between' })}>
        <div />
        {isRoleManager && (
          <RouterSwitch
            links={[
              { link: 'career-performance', name: 'My profile' },
              { link: 'my-team', name: 'My Team' },
            ]}
          />
        )}
        <div />
      </div>
      <div className={css(wrapperStylee)}>
        <div className={css({ flex: '3 1 504px', display: 'flex', flexDirection: 'column', gap: '8px' })}>
          <Link to={Page.PROFILE}>
            <DashboardProfile />
          </Link>
          {canShowMyReview && (
            <StepIndicator
              mainTitle={t('Your Contribution timeline')}
              titles={descriptions}
              descriptions={startDates}
              statuses={statuses}
            />
          )}
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 216px',
            gap: '8px',
            alignItems: 'stretch',
          })}
        >
          <div data-test-id='more' className={css({ height: '112%' })} onClick={handleBtnHelp}>
            <BasicTile
              img={<Icon graphic='settingsGear' />}
              hover={false}
              title={"Something doesn't look right? Raise a ticket on colleague help."}
              imgCustomStyle={{ width: '30px', margin: '10px auto 0px auto' }}
              customStyle={{
                background: '#fad919',
                textAlign: 'center',
                height: '100%',
              }}
              icon={true}
              link={'https://www.ourtesco.com/colleague/help'}
            />
          </div>
          <div data-test-id='more' className={css({ height: '100%' })}>
            <BasicTile
              hover={true}
              img={<Icon graphic='question' />}
              title={'Want to learn more about Your Contribution at Tesco?'}
              imgCustomStyle={{ width: '30px', margin: '8px auto 0px auto' }}
              customStyle={{ textAlign: 'center', height: '100%', maxHeight: '142px' }}
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
                  status={midYearReview?.status}
                  startDate={midYearReview?.startDate}
                  onClick={() => console.log('ReviewWidget')}
                  onClose={() => console.log('ReviewWidget')}
                  title={'Mid-year review'}
                  description={t("Complete this once you've had your mid-year conversation with your line manager.")}
                  customStyle={{ height: '100%' }}
                />
              </div>
              <div data-test-id='feedback' className={css(basicTileStyle)}>
                <ReviewWidget
                  reviewType={ReviewType.EYR}
                  status={endYearReview?.status}
                  startDate={endYearReview?.startDate}
                  onClick={() => console.log('ReviewWidget')}
                  onClose={() => console.log('ReviewWidget')}
                  title={'Year-end review'}
                  description={"Complete this once you've had your year-end conversation with your line manager."}
                  customStyle={{ height: '100%' }}
                />
              </div>
            </>
          )}
          {canShowAnnualReview && (
            <div data-test-id='feedback' className={css(basicTileStyle)}>
              <ReviewWidget
                reviewType={ReviewType.EYR}
                status={endYearReview?.status}
                onClick={() => console.log('ReviewWidget')}
                onClose={() => console.log('ReviewWidget')}
                title={'Annual performance review'}
                description={"Complete this once you've had your year-end conversation with your line manager."}
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
              description={t('Click here to find the Your Contribution Guide.')}
              customStyle={{
                height: '100%',
              }}
            />
          </div>
          <div data-test-id='personal' className={css(basicTileStyle)} onClick={console.log}>
            <BasicTile
              hover={true}
              img={Check}
              title={t('Everyday conversations')}
              description={t('Useful guidance on having great performance conversations')}
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
              description={t('Click here to find the Your Contribution Guide.')}
              customStyle={{
                height: '100%',
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

const wrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
  height: '100%',
} as Styles;

const wrapperStylee = {
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '8px',
  marginTop: '8px',
} as Styles;

const basicTileStyle = {
  flex: '1 0 216px',
} as Styles;

export default CareerPerformance;
