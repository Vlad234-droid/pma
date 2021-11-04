import React, { FC, useEffect } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { ReviewWidget, Widgets as ObjectiveWidgets } from 'features/Objectives';
import { Styles, useStyle } from '@dex-ddl/core';

import { DashboardProfile } from 'features/Profile';
import { BasicTile } from 'components/Tile';
import { StepIndicator } from 'components/StepIndicator/StepIndicator';
import { Status } from 'config/enum';
import { Header } from 'components/Header';
import { RouterSwitch } from 'components/RouterSwitch';
import { useSelector } from 'react-redux';
import { getTimelineMetaSelector, getTimelineSelector, TimelineActions } from '@pma/store';
import useDispatch from '../../hooks/useDispatch';
import httpClient from '@pma/api/src/config/client';

const CareerPerformance: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { descriptions, startDates } = useSelector(getTimelineSelector) || {};
  const { loaded, error } = useSelector(getTimelineMetaSelector) || {};

  const dispatch = useDispatch();

  const createReview = () => {
    const url =
      '/colleagues/10000000-0000-0000-0000-000000000000/performance-cycles/10000000-0000-0000-0000-000000000000/review-types/OBJECTIVE/numbers/1';
    const payload = {
      uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      performanceCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      colleagueUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      type: 'OBJECTIVE',
      number: 0,
      properties: {
        mapJson: {
          additionalProp1: 'string',
          additionalProp2: 'string',
          additionalProp3: 'string',
        },
      },
      status: 'DRAFT',
    };
    httpClient.post(url, payload);
  };

  const createTimeline = () => {
    const url = '/processes/10000000-0000-0000-0000-000000000000/metadata';
    const payload = {
      cycle: {
        id: null,
        code: 'GROUPS_HO_S_WL1',
        description: null,
        type: null,
        properties: {},
        cycleType: null,
        reviews: [
          {
            id: 'Activity_05tmtcb',
            code: 'Set\nobjectives',
            description: 'Set\nobjectives',
            type: { id: null, code: 'review', description: null },
            properties: {
              pm_review_type: 'objective',
              pm_type: 'review',
              pm_review_min: '3',
              pm_review_max: '1',
            },
            reviewType: { id: null, code: 'objective', description: null },
            form: {
              id: null,
              code: 'pm_o_1.form',
              description: null,
              type: { id: null, code: 'form', description: null },
              properties: {},
              key: 'camunda-forms:deployment:forms/pm_o_1.form',
              json: '{"schemaVersion": 2,"exporter": {"name": "form-js (https://demo.bpmn.io)","version": "0.4.1"},"components": [{"key": "title","label": "Objective title","type": "textfield","id": "Field_141o520","validate": {"minLength": 10,"required": true,"maxLength": 100}},{"key": "description","label": "Objective description","type": "textfield","id": "Field_05qgsfz","validate": {"required": true,"minLength": 10,"maxLength": 500},"description": "type: textarea"},{"text": "Look back","type": "text","id": "Field_0hu83pj"},{"key": "day_job","label": "Day Job","type": "textfield","id": "Field_17nyw6d","validate": {"required": true,"maxLength": 500,"minLength": 10}},{"key": "behaviours_and_values","label": "Behaviours and Values","type": "textfield","id": "Field_1ug5wco","validate": {"required": true,"minLength": 10,"maxLength": 500}},{"key": "impact","label": "Impact","type": "textfield","id": "Field_12p3spr","validate": {"required": true,"minLength": 10,"maxLength": 500}},{"values": [{"label": "New to Tesco","value": "New to Tesco"},{"label": "Missed","value": "Missed"},{"label": "Met","value": "Met"},{"label": "Exceeded","value": "Exceeded"}],"key": "rating","label": "Rating","type": "select","id": "Field_1ribi5m","validate": {"required": true}},{"text": "Look forward","type": "text","id": "Field_148wy3b"},{"key": "based_on_my_feedback","label": "Based on my feedback, next year I am going to focus my development on:","type": "textfield","id": "Field_15z0fpz","validate": {"required": true,"minLength": 10,"maxLength": 1000}},{"key": "in_the_year_ahead","label": "In the year ahead my priorities are going to be:","type": "textfield","id": "Field_0hww046","validate": {"required": true,"maxLength": 1000,"minLength": 10}},{"text": "Line Manager","type": "text","id": "Field_0s73vfz"},{"key": "my_feedback","label": "My feedback and coaching for you is","type": "textfield","id": "Field_07w2uk5","validate": {"required": true,"minLength": 10,"maxLength": 1000}}],"type": "default","id": "colleague_objectives_form"}',
            },
          },
          {
            id: 'Activity_0mydipm',
            code: 'Approve\nobjectives\nby LM',
            description: 'Approve\nobjectives\nby LM',
            type: { id: null, code: 'review', description: null },
            properties: {
              pm_review_type: 'objective_approval',
              pm_type: 'review',
              pm_review_min: '1',
              pm_review_max: '1',
            },
            reviewType: { id: null, code: 'objective_approval', description: null },
            form: {
              id: null,
              code: 'pm_o_2.form',
              description: null,
              type: { id: null, code: 'form', description: null },
              properties: {},
              key: 'camunda-forms:deployment:forms/pm_o_2.form',
              json: '{"schemaVersion": 2,"exporter": {"name": "form-js (https://demo.bpmn.io)","version": "0.4.1"},"components": [{"values": [{"label": "Approved","value": "true"},{"label": "Declined","value": "false"}],"key": "approved","type": "radio","id": "Field_1q90ywt","validate": {"required": true}},{"key": "reason","label": "Line manager declining reason","type": "textfield","id": "Field_0x6v3ef","validate": {"required": false,"minLength": 10,"maxLength": 1000}}],"type": "default","id": "lm_objectives_approval_form"}',
            },
          },
          {
            id: 'Activity_0y2pi2t',
            code: 'End of Year Review\n(similar to Objectives\nform)',
            description: 'End of Year Review\n(similar to Objectives\nform)',
            type: { id: null, code: 'review', description: null },
            properties: {
              pm_review_type: 'eyr',
              pm_type: 'review',
              pm_review_min: '1',
              pm_review_max: '1',
            },
            reviewType: { id: null, code: 'eyr', description: null },
            form: null,
          },
        ],
      },
    };
    httpClient.post(url, payload);
  };

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
            <StepIndicator
              mainTitle={t('performance_timeline_title', 'My Performance Timeline')}
              currentStatus={'pending'}
              currentStep={0}
              titles={descriptions}
              descriptions={startDates}
            />
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
            <div data-test-id='personal' className={css(basicTileStyle)}>
              <ReviewWidget
                status={Status.AVAILABLE}
                onClick={() => console.log('ReviewWidget')}
                description={t('tiles_description_id_3', 'Your mid-year review form and results will appear here.')}
                customStyle={{ height: '100%' }}
              />
            </div>
            <div data-test-id='feedback' className={css(basicTileStyle)}>
              <ReviewWidget
                status={Status.NOT_AVAILABLE}
                onClick={() => console.log('ReviewWidget')}
                description={t('tiles_description_id_3', 'Your mid-year review form and results will appear here.')}
                customStyle={{ height: '100%' }}
              />
            </div>
          </div>
        </section>
        <section className={css({ marginTop: '32px' })}>
          <div className={css({ margin: '12px 0', fontSize: '20px', lineHeight: '24px', fontWeight: 'bold' })}>
            <Trans i18nKey='useful_resources'>Useful resources</Trans>
          </div>
          <div className={css(wrapperStyle)}>
            <div data-test-id='personal' className={css(basicTileStyle)} onClick={createReview}>
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
            <div data-test-id='personal' className={css(basicTileStyle)} onClick={createTimeline}>
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
