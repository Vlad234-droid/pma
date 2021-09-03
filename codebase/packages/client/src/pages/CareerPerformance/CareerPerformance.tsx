import React, { FC } from 'react';
import { useStyle } from 'styles';

import { DashboardProfile } from 'features/Profile';
import { BasicTile } from '../../components/Tile';

import { Widgets as ObjectiveWidgets } from 'features/Objectives';
import { StepIndicator } from '../../components/StepIndicator/StepIndicator';

const CareerPerformance: FC = () => {
  const { css } = useStyle();
  return (
    <>
      <div className={css(wrapperStyle)}>
        <div className={css({ flex: '3 1 504px', display: 'flex', flexDirection: 'column', gap: '8px' })}>
          <DashboardProfile />
          <StepIndicator
            currentStatus={'pending'}
            currentStep={0}
            titles={['Set objectives', 'Mid-year review', 'End year review']}
            descriptions={['April 2021', 'September 2022', 'March 2022']}
          />
        </div>
        <div data-testid='more' className={css(basicTileStyle)}>
          <BasicTile
            hover={true}
            img='https://digitalcontent.api.tesco.com/v2/media/ghs-mktg/d5606eb3-af6b-4200-a7b4-a59e72a20ad9/2321-GHS-743x430-GM-TescoHome.jpeg'
            title='Want to understand more about performance tools at Tesco?'
            description='Urna laoreet viverra convallis gravida eu justo. Tincidunt tristique nisl est.'
          />
        </div>
      </div>
      <ObjectiveWidgets />

      <section className={css({ marginTop: '32px' })}>
        <h3 className={css({ margin: '12px 0' })}>My reviews</h3>
        <div className={css(wrapperStyle)}>
          <div data-testid='personal' className={css(basicTileStyle)}>
            <BasicTile
              hover={true}
              title='Mid-year review'
              description='Your mid-year review form and results will appear here.'
              event='The form will be available in Sept 2021'
            />
          </div>
          <div data-testid='feedback' className={css(basicTileStyle)}>
            <BasicTile
              hover={true}
              title='Mid-year review'
              description='Your mid-year review form and results will appear here.'
              event='The form will be available in Sept 2021'
            />
          </div>
        </div>
      </section>
      <section className={css({ marginTop: '32px' })}>
        <h3 className={css({ margin: '12px 0' })}>Useful resources </h3>
        <div className={css(wrapperStyle)}>
          <div data-testid='personal' className={css(basicTileStyle)}>
            <BasicTile
              hover={true}
              img='https://digitalcontent.api.tesco.com/v2/media/ghs-mktg/d5606eb3-af6b-4200-a7b4-a59e72a20ad9/2321-GHS-743x430-GM-TescoHome.jpeg'
              title='Want to understand more about performance tools at Tesco?'
              description='Urna laoreet viverra convallis gravida eu justo. Tincidunt tristique nisl est.'
            />
          </div>
          <div data-testid='feedback' className={css(basicTileStyle)}>
            <BasicTile
              hover={true}
              img='https://digitalcontent.api.tesco.com/v2/media/ghs-mktg/d5606eb3-af6b-4200-a7b4-a59e72a20ad9/2321-GHS-743x430-GM-TescoHome.jpeg'
              title='Want to understand more about performance tools at Tesco?'
              description='Urna laoreet viverra convallis gravida eu justo. Tincidunt tristique nisl est.'
            />
          </div>
          <div data-testid='feedback' className={css(basicTileStyle)}>
            <BasicTile
              hover={true}
              img='https://digitalcontent.api.tesco.com/v2/media/ghs-mktg/d5606eb3-af6b-4200-a7b4-a59e72a20ad9/2321-GHS-743x430-GM-TescoHome.jpeg'
              title='Want to understand more about performance tools at Tesco?'
              description='Urna laoreet viverra convallis gravida eu justo. Tincidunt tristique nisl est.'
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
  alignItems: 'stretch',
} as React.CSSProperties;

const basicTileStyle = {
  flex: '1 0 216px',
} as React.CSSProperties;

export default CareerPerformance;
