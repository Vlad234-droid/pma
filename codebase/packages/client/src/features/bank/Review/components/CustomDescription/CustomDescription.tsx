import React from 'react';
import { Trans } from 'components/Translation';
import { useNavigate } from 'react-router-dom';
import { Rule, useStyle, Button } from '@pma/dex-wrapper';
import { buildPath } from 'features/general/Routes';
import { Page } from 'pages';

export const CustomDescription = () => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(buildPath(Page.PERSONAL_DEVELOPMENT_PLAN));
  };
  return (
    <>
      <div className={css(descriptionStyle)}>
        <Trans i18nKey={'ensure_capture_pdp'}>
          Please ensure you capture your development in Personal Development Plan
        </Trans>
      </div>
      <Button mode={'inverse'} onPress={handleRedirect} styles={[buttonStyle]}>
        <Trans i18nKey={'view_pdp'}>View PDP</Trans>
      </Button>
    </>
  );
};

const descriptionStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fluid.f18.lineHeight,
  letterSpacing: '0px',
  paddingTop: '10px',
});
const buttonStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fluid.f16.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  paddingTop: '10px',
});
