import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { useStyle, Rule, Button } from '@dex-ddl/core';

import { TileWrapper } from 'components/Tile';

type Review = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  reviews: Review[];
};

const Reviews: FC<Props> = ({ reviews }) => {
  const { css } = useStyle();

  return (
    <div>
      <div className={css(wrapperStyles)}>
        {reviews.map(({ id, title, description }) => (
          <TileWrapper key={id} customStyle={wrapperItemStyles}>
            <div className={css(leftStyles)}>
              <h3 className={css(titleStyles)}>{title}</h3>
              <p className={css(descriptionStyles)}>{description}</p>
            </div>
            <div className={css(rightStyles)}>
              <Button styles={[ButtonStyles]} mode='inverse' onPress={() => alert('Test')}>
                <Trans i18nKey='details'>Details</Trans>
              </Button>
            </div>
          </TileWrapper>
        ))}
      </div>
    </div>
  );
};

const wrapperStyles: Rule = {
  display: 'flex',
  gap: '8px',
  flexDirection: 'column',
};

const wrapperItemStyles: Rule = {
  display: 'flex',
  padding: '24px',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const ButtonStyles: Rule = ({ theme }) => ({
  border: `1px solid ${theme.colors.tescoBlue}`,
  fontSize: theme.font.fixed.f14.fontSize,
  height: '34px',
});

const leftStyles: Rule = {};
const rightStyles: Rule = {};

const titleStyles: Rule = ({ theme }) => {
  const mobileScreen = theme.breakpoints.small || theme.breakpoints.xSmall;
  return {
    color: theme.colors.link,
    fontSize: mobileScreen ? theme.font.fixed.f16.fontSize : theme.font.fixed.f18.fontSize,
    lineHeight: mobileScreen ? theme.font.fixed.f16.lineHeight : theme.font.fixed.f18.lineHeight,
    fontWeight: theme.font.weight.bold,
    paddingBottom: '10px',
    margin: 0,
  };
};

const descriptionStyles = ({ theme }) => ({
  ...theme.font.fixed.f14,
  margin: 0,
  ':not(:last-child)': {
    paddingBottom: '20px',
  },
});

export default Reviews;
