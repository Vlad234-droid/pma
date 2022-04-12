import React, { useState } from 'react';
import { useStyle, Rule, CreateRule, Theme } from '@pma/dex-wrapper';
import { ArrowUp } from '../../assets/img/objectives';

const Details = ({ title, description }) => {
  const { css, theme } = useStyle();
  const [isVisibleDescription, setDescriptionVisibility] = useState(true);

  return (
    <div className={css(main)}>
      <div className={css(header({ theme }))} onClick={() => setDescriptionVisibility(!isVisibleDescription)}>
        <div>{title}</div>
        <div>
          <img className={isVisibleDescription ? css(arrUp) : css(arrDown)} alt='arrow' src={ArrowUp} />
        </div>
      </div>
      {isVisibleDescription && <div className={css(desc)}>{description}</div>}
    </div>
  );
};

const header: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: `${theme.colors.tescoBlue}`,
    fontSize: `${theme.font.fixed.f16}`,
    lineHeight: '20px',
    fontWeight: 'bold',
    padding: '20px 0 16px 0',
    width: '100%',
    userSelect: 'none',
  };
};

const arrDown = {
  transform: 'rotate(180deg)',
  webkitTransform: 'rotate(180deg)',
} as Rule;

const arrUp = {
  transform: 'rotate(0deg)',
  webkitTransform: 'rotate(0deg)',
} as Rule;

const desc: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  width: '100%',
  color: theme.colors.base,
  fontWeight: theme.font.weight.bold,
  paddingBottom: '24px',
  // @ts-ignore
  borderBottom: `2px solid ${theme.colors.lightGray}`,
});

const main: Rule = ({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'auto',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};

export default Details;
