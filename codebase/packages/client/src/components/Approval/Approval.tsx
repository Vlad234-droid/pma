import React, { FC } from 'react';
import { useStyle, Rule, CreateRule, Button } from '@pma/dex-wrapper';
import { Trans } from 'components/Translation/Translation';
import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';

type Props = {
  text: string;
  isActive: boolean;
  onApprove: () => void;
  onDecline: () => void;
};

const Approval: FC<Props> = ({ text, isActive, onApprove, onDecline }) => {
  const { css } = useStyle();

  return (
    <>
      <TileWrapper>
        <div className={css(wrapperStyle({ disabled: !isActive }))}>
          <div className={css(titleStyle)}>{text}</div>
          <div className={css(buttonsWrapperStyle)}>
            <div>
              <Button
                isDisabled={!isActive}
                styles={[buttonStyle({ inverse: true }), !isActive ? { opacity: '0.6' } : {}]}
                onPress={onDecline}
              >
                <Icon graphic='cancel' iconStyles={{ paddingRight: '8px' }} />
                <Trans i18nKey='decline'>Decline</Trans>
              </Button>
            </div>
            <div className={css({ display: 'inline-block' })}>
              <Button isDisabled={!isActive} styles={[buttonStyle({ inverse: false })]} onPress={onApprove}>
                <Icon graphic='check' invertColors={true} iconStyles={{ paddingRight: '8px' }} />
                <Trans i18nKey='approve'>Approve</Trans>
              </Button>
            </div>
          </div>
        </div>
      </TileWrapper>
    </>
  );
};

export default Approval;

const wrapperStyle: CreateRule<{ disabled: boolean }> = ({ disabled }) => ({
  textAlign: 'center',
  padding: '24px',
  ...(disabled ? { opacity: '0.4' } : {}),
});

const titleStyle: Rule = ({ theme }) => ({
  display: 'block',
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0px',
  paddingBottom: '10px',
  fontWeight: theme.font.weight.bold,
});

const buttonsWrapperStyle: Rule = {
  justifyContent: 'center',
  display: 'flex',
};

const buttonStyle: CreateRule<{ inverse: boolean }> =
  ({ inverse }) =>
  ({ theme }) => ({
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: theme.font.weight.bold,
    margin: '0px 4px',
    ...(inverse
      ? {
          background: theme.colors.white,
          color: `${theme.colors.tescoBlue}`,
          border: `2px solid ${theme.colors.tescoBlue}`,
        }
      : {}),
  });
