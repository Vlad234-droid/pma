import React, { useState } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';
import { ArrowUp } from '../../assets/img/objectives';

const ObjectiveDetails = ({ title, description }) => {
  const { css } = useStyle();
  const [isVisibleDescription, setDescriptionVisibility] = useState(false);

  return (
    <div className={css(main)}>
      <div className={css(header)} onClick={() => setDescriptionVisibility(!isVisibleDescription)}>
        <div>{title}</div>
        <div>
          <img className={isVisibleDescription ? css(arrDown) : ''} alt='arrow' src={ArrowUp} />
        </div>
      </div>
      {isVisibleDescription && <div className={css(desc)}>{description}</div>}
    </div>
  );
};

const arrDown = {
  transform: 'rotate(180deg)',
  webkitTransform: 'rotate(180deg)',
} as Rule;

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#00539F',
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 'bold',
  padding: '36px 0 16px 0',
  width: '100%',
  userSelect: 'none',
} as Rule;

const desc = {
  width: '100%',
  color: '#333333',
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 'bold',
  paddingBottom: '24px',
  borderBottom: '1px solid #E5E5E5',
} as Rule;

const main = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  overflow: 'auto',
} as Rule;

export default ObjectiveDetails;
