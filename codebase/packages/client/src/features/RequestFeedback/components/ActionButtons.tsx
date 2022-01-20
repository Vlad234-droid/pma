import React, { FC } from 'react';
import { Button, Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { IconButton, Position } from 'components/IconButton';
import { useNavigate } from 'react-router-dom';
import { Trans } from 'components/Translation';

type Props = {
  isValid: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

const ActionButtons: FC<Props> = ({ onSubmit, isValid }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const { css, theme } = useStyle();
  const navigate = useNavigate();
  return (
    <>
      <span
        className={css({
          position: 'fixed',
          top: theme.spacing.s5,
          left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
          textDecoration: 'none',
          border: 'none',
          cursor: 'pointer',
        })}
      >
        <IconButton
          graphic='arrowLeft'
          onPress={() => {
            navigate(-1);
          }}
          iconProps={{ invertColors: true }}
        />
      </span>
      <div
        className={css({
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          background: 'white',
        })}
      >
        <div
          className={css({
            position: 'relative',
            bottom: theme.spacing.s0,
            left: theme.spacing.s0,
            right: theme.spacing.s0,
            borderTop: `${theme.border.width.b1} solid ${theme.colors.backgroundDarkest}`,
          })}
        >
          <div
            className={css({
              padding: mobileScreen ? theme.spacing.s6 : theme.spacing.s8,
              display: 'flex',
              justifyContent: 'space-between',
            })}
          >
            <Button
              styles={[
                theme.font.fixed.f16,
                {
                  fontWeight: theme.font.weight.bold,
                  width: '49%',
                  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                  background: theme.colors.white,
                  border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
                  color: `${theme.colors.tescoBlue}`,
                },
              ]}
              onPress={() => navigate(-1)}
            >
              <Trans i18nKey='cancel'>Cancel</Trans>
            </Button>

            <IconButton
              isDisabled={!isValid}
              customVariantRules={{ default: iconBtnStyle, disabled: iconBtnStyleDisabled }}
              graphic='arrowRight'
              iconProps={{ invertColors: true }}
              iconPosition={Position.RIGHT}
              onPress={onSubmit}
            >
              Submit
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '0px 6px 0px 20px',
  display: 'flex',
  width: '49%',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
});

const iconBtnStyleDisabled: Rule = ({ theme }) => ({
  padding: '0px 6px 0px 20px',
  display: 'flex',
  width: '49%',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  pointerEvents: 'none',
  opacity: '0.4',
});

export default ActionButtons;
