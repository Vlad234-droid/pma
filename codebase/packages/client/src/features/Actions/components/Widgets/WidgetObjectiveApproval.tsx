import React, { FC } from 'react';
import { useStyle, fontWeight, Button } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Icon } from 'components/Icon';
import { Trans } from 'components/Translation';

export type WidgetObjectiveApprovalProps = {
  isDisabled?: boolean;
};

export const WidgetObjectiveApproval: FC<WidgetObjectiveApprovalProps> = ({ isDisabled = false }) => {
  const { css, theme } = useStyle();
  return (
    <>
      <TileWrapper>
        <div className={css({ textAlign: 'center', padding: '24px' }, isDisabled ? { opacity: '0.4' } : {})}>
          <div
            className={css({
              display: 'block',
              fontSize: '20px',
              lineHeight: '24px',
              paddingBottom: '10px',
              fontWeight: fontWeight.bold,
            })}
          >
            Approve or decline colleague’s objectives
          </div>
          <div
            className={css({
              justifyContent: 'space-around',
              display: 'flex',
            })}
          >
            <div className={css({ display: 'inline-block' })}>
              <Button
                isDisabled={isDisabled}
                styles={[
                  {
                    background: theme.colors.white,
                    border: `1px solid ${theme.colors.tescoBlue}`,
                    fontSize: '16px',
                    lineHeight: '20px',
                    fontWeight: 'bold',
                    color: `${theme.colors.tescoBlue}`,
                    margin: '0px 4px',
                  },
                ]}
                onPress={console.log}
              >
                <Icon graphic='decline' iconStyles={{ paddingRight: '8px' }} />
                <Trans i18nKey='decline'>Decline</Trans>
              </Button>
            </div>
            <div className={css({ display: 'inline-block' })}>
              <Button
                isDisabled={isDisabled}
                styles={[
                  {
                    background: `${theme.colors.tescoBlue}`,
                    fontSize: '16px',
                    lineHeight: '20px',
                    fontWeight: 'bold',
                    margin: '0px 4px 1px 4px',
                  },
                ]}
                onPress={console.log}
              >
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
