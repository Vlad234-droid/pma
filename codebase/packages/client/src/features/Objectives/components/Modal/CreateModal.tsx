import React, { FC, HTMLProps } from 'react';

import { Icon, Button, useStyle, useBreakpoints } from '@dex-ddl/core';

import { Icon as IconComponent } from 'components/Icon';
import { StepIndicatorBasic } from 'components/StepIndicator/StepIndicator';
import { Item, Input, Textarea } from 'components/Form';

import { SubmitButton } from './index';

export type CreateModalProps = {};

type Props = HTMLProps<HTMLInputElement> & CreateModalProps;

export const CreateModal: FC<Props> = () => {
  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return (
    <div
      className={css({
        height: '100%',
      })}
    >
      <div
        className={css({
          height: '100%',
          overflow: 'auto',
          padding: mobileScreen ? `0 ${theme.spacing.s4}` : `0 ${theme.spacing.s10}`,
        })}
      >
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
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <form>
          <div className={css({ padding: `0 0 ${theme.spacing.s5}` })}>
            <StepIndicatorBasic
              currentStatus={'pending'}
              currentStep={0}
              titles={['Set objectives', 'Mid-year review', 'End year review']}
            />
          </div>
          <Item label='Objective title'>
            <Input placeholder='Example: Build additional backlinks for Our Tesco.' />
          </Item>
          <Item label='Description'>
            <Textarea placeholder='Build 40 additional backlinks for Our Tesco by June. To do so I will connect with Ellie and Andrew from PR to develop an effective outreach strategy.' />
          </Item>
          <div className={css({ padding: `0 0 ${theme.spacing.s5}`, display: 'flex' })}>
            <Icon graphic='information' />
            <span
              className={css(theme.font.fixed.f14, {
                color: theme.colors.tescoBlue,
                padding: `${theme.spacing.s0} ${theme.spacing.s2}`,
              })}
            >
              Need help writing your objectives?
            </span>
          </div>
          <Item label='How will you MEET this objective?'>
            <Textarea
              rows={4}
              placeholder='Example:
1) Develop 60 additional backlinks for Our Tesco
2) Develop outreach strategy and action first step of the strategy successfully'
            />
          </Item>
          <Item label='How will you EXCEED this objective?'>
            <Textarea
              rows={4}
              placeholder='Example:
1) Develop 60 additional backlinks for Our Tesco
2) Develop outreach strategy and action first step of the strategy successfully'
            />
          </Item>
        </form>
      </div>
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
            padding: theme.spacing.s9,
            display: 'flex',
            justifyContent: 'center',
          })}
        >
          <Button
            styles={[
              theme.font.fixed.f16,
              {
                fontWeight: theme.font.weight.bold,
                width: '50%',
                margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                background: theme.colors.white,
                border: `${theme.border.width.b1} solid ${theme.colors.tescoBlue}`,
                color: `${theme.colors.tescoBlue}`,
              },
            ]}
            onPress={() => alert('1')}
          >
            Save as draft
          </Button>
          <SubmitButton
            styles={[
              theme.font.fixed.f16,
              {
                fontWeight: theme.font.weight.bold,
                width: '50%',
                margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
                background: `${theme.colors.tescoBlue}`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
