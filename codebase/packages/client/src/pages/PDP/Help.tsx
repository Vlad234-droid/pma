import React from 'react';
import { CreateRule, Rule, theme, Theme, useStyle } from '@dex-ddl/core';
import { Close } from 'assets/img/objectives';
import DescriptionBlock from 'components/DescriptionBlock';
import { useNavigate } from 'react-router';

const PersonalDevelopmentHelp = (props) => {
  const { css, theme } = useStyle();
  const navigate = useNavigate();

  return (
    <div className={css(main)}>
      <div className={css(header({ theme }))}>
        <div
          className={css(arrow)}
          onClick={() => {
            navigate(-1);
          }}
        />
        <div>Personal Development Plan</div>
        <div>
          <img className={css(close)} alt='close' src={Close} onClick={() => navigate(-1)} />
        </div>
      </div>

      <DescriptionBlock>
          <div>Need help with your Personal Development Plan?</div>
          <div>
              Below we have listed some points to help you write your personal plan and achieve your goals.
          </div>
      </DescriptionBlock>
    </div>
  );
};

const close = {
  cursor: 'pointer',
} as Rule;

const descriptionText: CreateRule<{ theme: Theme; }> = (props) => {
  if (props == null) return {};
  const { theme } = props;
  return {
    fontSize: `${theme.font.fixed.f18}`,
    lineHeight: '22px',
    paddingBottom: '32px',
  };
};

const decsriptionHeader: CreateRule<{ theme: Theme; }> = (props) => {
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

const header: CreateRule<{ theme: Theme; }> = (props) => {
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

const main: Rule = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '0 20px',
  backgroundColor: `${theme.colors.tescoBlue}`,
  minHeight: '100vh',
};

export default PersonalDevelopmentHelp;