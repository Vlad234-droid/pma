import React, { FC } from 'react';

import { Rule, useStyle } from '@dex-ddl/core';

import { TileWrapper as Tile } from '../Tile/TileWrapper';
import { StatusIcon } from './StatusIcon';
import { getIcon } from '../../features/MyTeam';
import { Status } from 'config/enum';

export type StepIndicatorProps = {
  mainTitle?: string;
  currentStep?: number;
  currentStatus?: Status;
  titles?: string[];
  descriptions?: string[];
  statuses?: Status[];
};

const getStatus = (i: number, currentStep?: number, currentStatus?: Status) => {
  if (currentStep === i && currentStatus) return Status[currentStatus];
  if (currentStep && currentStep > i) return Status.APPROVED;
};

export const StepIndicatorBasic: FC<StepIndicatorProps> = ({
  currentStep,
  currentStatus,
  titles = [],
  descriptions = [],
  statuses = [],
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
      <StatusIcon graphics='roundCircle' color='base' first={first} last={last} />
      {CurrentStep}
    </div>
  );

  let array: JSX.Element[];
  if (statuses && statuses.length > 0) {
    array = statuses
      .reduce((arr: JSX.Element[], status, i) => {
        const [graphics, color] = getIcon(status);
        const first = i === 0;
        const last = i === statuses.length - 1;
        arr.push(<Line key={`line${i}`} active={!!currentStep && currentStep >= i} />);
        arr.push(
          <Step
            key={`step${i}`}
            first={first}
            last={last}
            CurrentStep={<StatusIcon graphics={graphics} color={color} first={first} last={last} />}
          />,
        );
        return arr;
      }, [])
      .slice(1);
  } else {
    array = titles
      .reduce((arr: JSX.Element[], _, i) => {
        const status = getStatus(i, currentStep, currentStatus);
        const [graphics, color] = getIcon(status);
        const first = i === 0;
        const last = i === titles.length - 1;
        arr.push(<Line key={`line${i}`} active={!!currentStep && currentStep >= i} />);
        arr.push(
          <Step
            key={`step${i}`}
            first={first}
            last={last}
            CurrentStep={graphics && <StatusIcon graphics={graphics} color={color} first={first} last={last} />}
          />,
        );
        return arr;
      }, [])
      .slice(1);
  }

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
  mainTitle = 'My Performance Timeline',
  currentStep,
  currentStatus,
  titles = [],
  descriptions = [],
  statuses = [],
}) => {
  const { css } = useStyle();
  return (
    <Tile>
      <div className={css(wrapperStyle)} data-test-id='timeline'>
        <span className={css(titleStyle)}>{mainTitle}</span>
        <StepIndicatorBasic
          currentStep={currentStep}
          currentStatus={currentStatus}
          titles={titles}
          descriptions={descriptions}
          statuses={statuses}
        />
      </div>
    </Tile>
  );
};

const titleStyle: Rule = ({
  font: {
    fluid: {
      f16: { fontSize },
    },
  },
}) => ({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize,
  marginBottom: '20px',
});

const title2Style: Rule = ({
  font: {
    fluid: {
      f14: { fontSize },
    },
  },
}) => ({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize,
  paddingTop: '8px',
  flex: '1 1 0',
  textAlign: 'center',
  ':first-child': {
    textAlign: 'start',
  },
  ':last-child': {
    textAlign: 'end',
  },
});

const descriptionStyle: Rule = ({
  font: {
    fluid: {
      f14: { fontSize },
    },
  },
}) => ({
  fontStyle: 'normal',
  fontSize,
  flex: '1 1 0',
  textAlign: 'center',
  ':first-child': {
    textAlign: 'start',
  },
  ':last-child': {
    textAlign: 'end',
  },
});

const wrapperStyle = {
  padding: '20px',
};
