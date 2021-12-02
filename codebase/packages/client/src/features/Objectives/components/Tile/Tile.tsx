import React, { FC } from 'react';
import { Rule, Styles, useStyle, CreateRule } from '@dex-ddl/core';

import { TileWrapper } from 'components/Tile';

type Explanation = {
  title: string;
  steps: string[];
};

type Props = {
  id: string;
  title?: string;
  subTitle?: string;
  description?: string;
  explanations: Explanation[];
  withSpacing?: boolean;
};

const ObjectiveTile: FC<Props> = ({ id, title, subTitle, description, explanations, withSpacing = true }) => {
  return (
    <TileWrapper key={id} customStyle={tileWrapperStyles} boarder={true}>
      <div style={{ padding: '24px' }}>
        <ObjectiveTileHeader {...{ title, subTitle, description, withSpacing }} />
        <ObjectiveTileExplanations explanations={explanations} />
      </div>
    </TileWrapper>
  );
};

export const ObjectiveTileHeader: FC<Pick<Props, 'title' | 'subTitle' | 'description' | 'withSpacing'>> = ({
  title,
  subTitle,
  description,
  withSpacing = false,
}) => {
  const { css } = useStyle();

  return (
    <>
      {title && <h3 className={css(titleStyles)}>{title}</h3>}
      {subTitle && <h4 className={css(subTitleStyles({ withSpacing }))}>{subTitle}</h4>}
      <p className={css(descriptionStyles({ withSpacing }))}>{description}</p>
    </>
  );
};

export const ObjectiveTileExplanations: FC<Pick<Props, 'explanations' | 'withSpacing'>> = ({
  explanations,
  withSpacing = false,
}) => {
  const { css } = useStyle();

  return (
    <>
      {explanations.map(({ title, steps }, idx) => (
        <div className={css(explanationStyles)} key={idx}>
          <h4 className={css(explanationSubTitleStyles({ withSpacing }))}>{title}</h4>
          <div className={css(listStyles)}>
            {steps.map((step, idx) => (
              <div className={css(explanationDescriptionStyles)} key={idx}>
                {step}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

const tileWrapperStyles: Rule = () => ({ marginBottom: '10px' });

const titleStyles: Rule = ({ theme }) => ({
  margin: 0,
  fontSize: '18px',
  lineHeight: '22px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
});

const subTitleStyles: CreateRule<Pick<Props, 'withSpacing'>> =
  ({ withSpacing }) =>
  ({ theme }) => ({
    margin: 0,
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: theme.font.weight.bold,
    paddingTop: withSpacing ? theme.spacing.s5 : 0,
  });

const explanationSubTitleStyles: CreateRule<Pick<Props, 'withSpacing'>> =
  ({ withSpacing }) =>
  ({ theme }) => ({
    margin: 0,
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: withSpacing ? theme.font.weight.bold : 0,
  });

const descriptionStyles: CreateRule<Pick<Props, 'withSpacing'>> =
  ({ withSpacing }) =>
  ({ theme }) => ({
    fontSize: '16px',
    lineHeight: '20px',
    paddingBottom: withSpacing ? theme.spacing.s5 : 0,
    margin: 0,
  });

const explanationDescriptionStyles: Rule = () => ({
  padding: '10px 0',
});

const explanationStyles: Rule = {
  marginBottom: '15px',
};

const listStyles = {
  padding: '0 17px',
  margin: 0,
} as Styles;

export default ObjectiveTile;
