import React, { useState } from 'react';
import { useStyle, Rule, CreateRule, Theme } from '@dex-ddl/core';
import { ArrowUp } from '../../assets/img/objectives';

const ObjectiveDetails = ({ title, description }) => {
  const { css, theme  } = useStyle();
  const [isVisibleDescription, setDescriptionVisibility] = useState(false);

  return (
    <div className={css(main)}>
      <div className={css(header({ theme }))} onClick={() => setDescriptionVisibility(!isVisibleDescription)}>
        <div>{title}</div>
        <div>
          <img className={isVisibleDescription ? css(arrDown) : ''} alt='arrow' src={ArrowUp} />
        </div>
      </div>
      {isVisibleDescription && <div className={css(desc({ theme }))}>{description}</div>}
    </div>
  );
};

const header: CreateRule<{ theme: Theme; }> = (props) => {
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
    padding: '36px 0 16px 0',
    width: '100%',
    userSelect: 'none',
  };
};

const arrDown = {
  transform: 'rotate(180deg)',
  webkitTransform: 'rotate(180deg)',
} as Rule;


const desc: CreateRule<{ theme: Theme; }> = (props) => {
  if (props == null) return {};
  const { theme } = props; 
  return {
    width: '100%',
    color: '#333333',
    fontSize: `${theme.font.fixed.f16}`,
    lineHeight: '20px',
    fontWeight: 'bold',
    paddingBottom: '24px',
    borderBottom: `1px solid ${theme.colors.backgroundDarkest}`,
  };
}

const main = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  overflow: 'auto',
} as Rule;

export default ObjectiveDetails;
