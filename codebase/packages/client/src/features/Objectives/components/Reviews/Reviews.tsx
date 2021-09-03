import React, { FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';

import { TileWrapper } from 'components/Tile';
import { Button } from 'components/Button';

type Review = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  reviews: Review[];
};

const Reviews: FC<Props> = ({ reviews }) => {
  const { css, theme } = useStyle();

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
              <Button
                styles={{
                  border: `1px solid ${theme.colors.tescoBlue}`,
                  fontSize: '14px',
                  height: '34px',
                }}
                mode='inverse'
                onPress={() => alert('Test')}
              >
                Details
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

const leftStyles: Rule = {};
const rightStyles: Rule = {};

const titleStyles: Rule = ({ theme }) => {
  const mobileScreen = theme.breakpoints.small || theme.breakpoints.xSmall;
  return {
    color: theme.colors.link,
    fontSize: mobileScreen ? '16px' : '18px',
    lineHeight: mobileScreen ? '20px' : '22px',
    fontWeight: theme.font.bold,
    paddingBottom: '10px',
    margin: 0,
  };
};

const descriptionStyles = {
  fontSize: '14px',
  lineHeight: '18px',
  margin: 0,
  ':not(:last-child)': {
    paddingBottom: '20px',
  },
};

export default Reviews;
