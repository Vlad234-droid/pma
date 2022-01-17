import React from 'react';
import { CreateRule, Rule, Theme, useStyle } from '@dex-ddl/core';
import { Close } from 'assets/img/objectives';
import DescriptionBlock from 'components/DescriptionBlock';
import Details from 'components/Details';
import { useNavigate } from 'react-router';

const Popup = (props) => {
  const { css, theme } = useStyle();
  const { items } = props;
  const navigate = useNavigate();

  if (items.length < 1) return null;

  return (
    <div className={css(popup)}>
      <div className={css(header({ theme }))}>
        <div
          className={css(arrow)}
          onClick={() => {
            navigate(-1);
          }}
        />
        <div>Strategic drivers</div>
        <div>
          <img className={css(close)} alt='close' src={Close} onClick={() => navigate('/')} />
        </div>
      </div>

      <DescriptionBlock>
        <div className={css(decsriptionHeader({ theme }))}>Your organization has 6 drivers</div>

        <div className={css(descriptionText({ theme }))}>
          Organization drivers – are stategic goals that help all company-wide activities lead to one single direction.
        </div>
        {items.map((obj, idx) => {
          return <Details key={obj.uuid} title={`Strategic driver ${idx + 1}`} description={obj.title} />;
        })}
      </DescriptionBlock>
    </div>
  );
};

const close = {
  cursor: 'pointer',
} as Rule;

const descriptionText: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontSize: `${theme.font.fixed.f18}`,
    lineHeight: '22px',
    paddingBottom: '32px',
  };
};

const decsriptionHeader: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontSize: `${theme.font.fixed.f24}`,
    lineHeight: '28px',
    fontWeight: 'bold',
    paddingBottom: '8px',
  };
};

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

const header: CreateRule<{ theme: Theme }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: `${theme.font.fixed.f24}`,
    lineHeight: '28px',
    fontWeight: 'bold',
    color: `${theme.colors.white}`,
    width: '100%',
    padding: '22px 42px 22px 40px',
  };
};

const popup: Rule = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '0 20px',
};

export default Popup;
