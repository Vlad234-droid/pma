import React, { FC } from 'react';
import { Trans, useTranslation } from 'components/Translation';
import { ReviewWidget, Widgets as ObjectiveWidgets } from 'features/Objectives';
// import i18n from 'utils/i18next';
import { Styles, useStyle } from '@dex-ddl/core';

import { DashboardProfile } from 'features/Profile';
import { BasicTile } from 'components/Tile';
import { StepIndicator } from 'components/StepIndicator/StepIndicator';

// const App = () => {
//   const changeLanguage = (code) => {
//     i18n.changeLanguage(code);
//   };
//
//   return (
//     <div>
//       <button
//         type='button'
//         onClick={() => {
//           changeLanguage('de');
//         }}
//       >
//         test de
//       </button>
//
//       <button type='button' onClick={() => changeLanguage('en')}>
//         test en
//       </button>
//     </div>
//   );
// };

const CareerPerformance: FC = () => {
  const { css } = useStyle();
  const { t } = useTranslation();
  return (
    <>
      {/*<App />*/}
      <div className={css({ margin: '8px' })}>
        <div className={css(wrapperStyle)}>
          <div className={css({ flex: '3 1 504px', display: 'flex', flexDirection: 'column', gap: '8px' })}>
            <DashboardProfile />
            <StepIndicator
              mainTitle={t('performance_timeline_title', 'My Performance Timeline')}
              currentStatus={'pending'}
              currentStep={0}
              titles={[
                t('set_objectives', 'Set objectives'),
                t('mid_year_review', 'Mid-year review'),
                t('end_year_review', 'End year review'),
              ]}
              descriptions={['April 2021', 'September 2022', 'March 2022']}
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
          <h3 className={css({ margin: '12px 0' })}>
            <Trans i18nKey='my_reviews'>My reviews</Trans>
          </h3>
          <div className={css(wrapperStyle)}>
            <div data-test-id='personal' className={css(basicTileStyle)}>
              <ReviewWidget
                onClick={() => console.log('ReviewWidget')}
                description={t('tiles_description_id_3', 'Your mid-year review form and results will appear here.')}
                customStyle={{ height: '182px' }}
              />
            </div>
            <div data-test-id='feedback' className={css(basicTileStyle)}>
              <BasicTile
                hover={true}
                title={t('tiles_title_id_3', 'Mid-year review')}
                description={t('tiles_description_id_3', 'Your mid-year review form and results will appear here.')}
                event={t('tiles_event_id_3', 'The form will be available in Sept 2021')}
                customStyle={{ height: '182px' }}
              />
            </div>
          </div>
        </section>
        <section className={css({ marginTop: '32px' })}>
          <h3 className={css({ margin: '12px 0' })}>
            <Trans i18nKey='useful_resources'>Useful resources</Trans>
          </h3>
          <div className={css(wrapperStyle)}>
            <div data-test-id='personal' className={css(basicTileStyle)}>
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
