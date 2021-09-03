import React, { FC } from 'react';

import { useStyle } from 'styles';

import { TileWrapper as Tile } from '../Tile/TileWrapper';
import Confirmed from './Confirmed.svg';
import Draft from './Draft.svg';
import Pending from './Pending.svg';
import Oval from './Oval.svg';
import { StatusIcon } from './StatusIcon';

type Status = 'pending' | 'draft' | 'confirmed';

const statuses: { [S in Status]: string } = {
  pending: Pending,
  draft: Draft,
  confirmed: Confirmed,
};

export type StepIndicatorProps = {
  currentStep?: number;
  currentStatus?: Status;
  titles?: string[];
  descriptions?: string[];
};

const getIcon = (i: number, currentStep?: number, currentStatus?: Status) => {
  if (currentStep === i && currentStatus) return statuses[currentStatus];
  if (currentStep && currentStep > i) return statuses.confirmed;
};

export const StepIndicatorBasic: FC<StepIndicatorProps> = ({
  currentStep,
  currentStatus,
  titles = [],
  descriptions = [],
}) => {
  const { css, theme } = useStyle();

  const Line: FC<{ active?: boolean }> = ({ active }) => (
    <div
      className={css({
        width: '100%',
        height: '3px',
        background: active ? theme.colors.tescoBlue : theme.colors.backgroundDarkest,
        flex: 1,
      })}
    />
  );

  const Step: FC<{ CurrentStep?: any; first; last }> = ({ CurrentStep, first, last }) => (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1,
      })}
    >
      <StatusIcon icon={Oval} first={first} last={last} />
      {CurrentStep}
    </div>
  );

  const array = titles
    .reduce((arr: Array<JSX.Element>, _, i) => {
      const icon = getIcon(i, currentStep, currentStatus);
      const first = i === 0;
      const last = i === titles.length - 1;
      arr.push(<Line key={`line${i}`} active={!!currentStep && currentStep >= i} />);
      arr.push(
        <Step
          key={`step${i}`}
          first={first}
          last={last}
          CurrentStep={icon && <StatusIcon icon={icon} first={first} last={last} />}
        />,
      );
      return arr;
    }, [])
    .slice(1);

  const titlesArray = titles.map((title, i) => (
    <span className={css(title2Style)} key={`title${i}`}>
      {title}
    </span>
  ));
  const descriptionArray = descriptions.map((title, i) => (
    <span className={css(descriptionStyle)} key={`desc${i}`}>
      {title}
    </span>
  ));

  return (
    <div className={css({ paddingTop: '8px' })}>
      <section className={css({ display: 'flex', alignItems: 'center', paddingTop: '8px' })}>{array}</section>
      <section className={css({ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' })}>
        {titlesArray}
      </section>
      <section className={css({ display: 'flex', justifyContent: 'space-between' })}>{descriptionArray}</section>
    </div>
  );
};

export const StepIndicator: FC<StepIndicatorProps> = ({
  currentStep,
  currentStatus,
  titles = [],
  descriptions = [],
}) => {
  const { css } = useStyle();
  return (
    <Tile>
      <div className={css(wrapperStyle)} data-testid='timeline'>
        <span className={css(titleStyle)}>My Performance Timeline</span>
        <StepIndicatorBasic
          currentStep={currentStep}
          currentStatus={currentStatus}
          titles={titles}
          descriptions={descriptions}
        />
      </div>
    </Tile>
  );
};

const titleStyle = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '20px',
  marginBottom: '20px',
} as React.CSSProperties;

const title2Style = {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '14px',
} as React.CSSProperties;

const descriptionStyle = {
  fontStyle: 'normal',
  fontSize: '14px',
} as React.CSSProperties;

const wrapperStyle = {
  padding: '16px',
} as React.CSSProperties;
