import React from 'react';
import { Rule, useStyle } from '@dex-ddl/core';
import { Close } from 'assets/img/objectives';
import DescriptionBlock from 'components/DescriptionBlock';
import ObjectiveDetails from 'components/ObjectiveDetails/ObjectiveDetails';
import { useHistory } from 'react-router';

const Popup = (props) => {
  const { css } = useStyle();
  const { items } = props;
  const history = useHistory();

  if (items.length < 1) return null;

  return (
    <div className={css(popup)}>
      <div className={css(header)}>
        <div
          className={css(arrow)}
          onClick={() => {
            history.goBack();
          }}
        />
        <div>Organization objectives</div>
        <div>
          <img className={css(close)} alt='close' src={Close} onClick={() => history.push('/')} />
        </div>
      </div>

      <DescriptionBlock>
        <div className={css(decsriptionHeader)}>Your organization has 6 objectives</div>

        <div className={css(descriptionText)}>
          Organization objactives – are stategic goals that help all company-wide activities lead to one single
          direction.
        </div>
        {items.map((obj, idx) => {
          return <ObjectiveDetails key={obj.uuid} title={`Objective ${idx + 1}`} description={obj.title} />;
        })}
      </DescriptionBlock>
    </div>
  );
};

const close = {
  cursor: 'pointer',
} as Rule;

const descriptionText = {
  fontSize: '18px',
  lineHeight: '22px',
  paddingBottom: '32px',
} as Rule;

const decsriptionHeader = {
  fontSize: '24px',
  lineHeight: '28px',
  fontWeight: 'bold',
  paddingBottom: '8px',
} as Rule;

const arrow = {
  marginLeft: '13.75px',
  border: 'solid',
  borderWidth: '0 1px 1px 0',
  display: 'inline-block',
  padding: '6px',
  transform: 'rotate(137deg)',
  webkitTransform: 'rotate(137deg)',
  cursor: 'pointer',
} as Rule;

const header: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '24px',
  lineHeight: '28px',
  fontWeight: 'bold',
  color: '#ffffff',
  width: '100%',
  padding: '22px 42px 22px 40px',
};

const popup: Rule = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '50px',
};

export default Popup;
