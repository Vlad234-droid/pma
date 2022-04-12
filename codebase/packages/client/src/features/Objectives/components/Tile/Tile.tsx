import React, { FC } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import MarkdownRenderer from 'components/MarkdownRenderer';
import { Textarea } from 'components/Form';

import { TileWrapper } from 'components/Tile';

type Explanation = {
  title: string;
  description?: string;
  readonly?: boolean;
  key?: string;
};

type Props = {
  id: string;
  title?: string;
  subTitle?: string;
  description?: string;
  explanations: Explanation[];
  withSpacing?: boolean;
  updateReview?: (properties: any) => void;
};

const ObjectiveTile: FC<Props> = ({
  id,
  title,
  subTitle,
  description,
  explanations,
  withSpacing = true,
  updateReview,
}) => {
  return (
    <TileWrapper key={id} customStyle={tileWrapperStyles} boarder={true}>
      <div style={{ padding: '24px' }}>
        <ObjectiveTileHeader {...{ title, subTitle, description, withSpacing }} />
        <ObjectiveTileExplanations explanations={explanations} updateReview={updateReview} />
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

export const ObjectiveTileExplanations: FC<Pick<Props, 'explanations' | 'withSpacing' | 'updateReview'>> = ({
  explanations,
  withSpacing = false,
  updateReview,
}) => {
  const { css } = useStyle();
  const handleOnChange = (key) => (e) => {
    if (key && updateReview) {
      updateReview({ [key]: e.target.value });
    }
  };

  return (
    <>
      {explanations.map(({ title, description, readonly = true, key }, idx) => (
        <div className={css(explanationStyles)} key={idx}>
          <h4 className={css(explanationSubTitleStyles({ withSpacing }))}>
            <MarkdownRenderer source={title} />
          </h4>
          {readonly ? (
            <div className={css(listStyles)}>
              <div className={css(explanationDescriptionStyles)}>{description}</div>
            </div>
          ) : (
            <div className={css(inputsStyles)}>
              {/*todo not only textarea*/}
              <Textarea isValid={true} value={description} onChange={handleOnChange(key)} />
            </div>
          )}
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
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
});

const subTitleStyles: CreateRule<Pick<Props, 'withSpacing'>> =
  ({ withSpacing }) =>
  ({ theme }) => ({
    margin: 0,
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: '0px',
    fontWeight: theme.font.weight.bold,
    paddingTop: withSpacing ? theme.spacing.s5 : 0,
  });

const explanationSubTitleStyles: CreateRule<Pick<Props, 'withSpacing'>> =
  ({ withSpacing }) =>
  ({ theme }) => ({
    margin: 0,
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: '0px',
    fontWeight: withSpacing ? theme.font.weight.bold : 0,
  });

const descriptionStyles: CreateRule<Pick<Props, 'withSpacing'>> =
  ({ withSpacing }) =>
  ({ theme }) => ({
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: '0px',
    paddingBottom: withSpacing ? theme.spacing.s5 : 0,
    margin: 0,
  });

const explanationDescriptionStyles: Rule = () => ({
  padding: '10px 0',
});

const explanationStyles: Rule = {
  marginBottom: '15px',
};
const inputsStyles: Rule = { paddingTop: '10px' };

const listStyles = {
  padding: '0 17px',
  margin: 0,
} as Styles;

export default ObjectiveTile;
