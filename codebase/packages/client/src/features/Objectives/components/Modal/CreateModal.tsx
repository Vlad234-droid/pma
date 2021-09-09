import React, { FC, HTMLProps } from 'react';
import { Icon, useStyle, Styles, useBreakpoints , Button } from '@dex-ddl/core';
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
          padding: mobileScreen ? '0 16px' : '0 40px',
        })}
      >
        <span
          className={css({
            position: 'fixed',
            top: '22px',
            left: mobileScreen ? '20px' : '40px',
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
          })}
        >
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <form>
          <div className={css({ padding: '0 0 20px' })}>
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
          <div className={css({ padding: '0 0 20px' })}>
            <Icon graphic='information' />
            <span style={{ fontSize: '14px', lineHeight: '18px', color: '#00539F', padding: '0 10px' }}>
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
          bottom: '0',
          left: 0,
          right: 0,
          borderTop: '1px solid #E5E5E5',
        } as Styles)}
      >
        <div
          className={css({
            padding: '36px 36px',
            display: 'flex',
            justifyContent: 'center',
          })}
        >
          <Button
            styles={[
              {
                background: 'white',
                border: `1px solid ${theme.colors.tescoBlue}`,
                fontSize: '16px',
                lineHeight: '20px',
                fontWeight: 'bold',
                color: `${theme.colors.tescoBlue}`,
                width: '50%',
                margin: '0px 4px',
              },
            ]}
            onPress={() => alert('1')}
          >
            Save as draft
          </Button>
          {/*<Button*/}
          {/*  styles={*/}
          {/*    {*/}
          {/*      background: `${theme.colors.tescoBlue}`,*/}
          {/*      fontSize: '16px',*/}
          {/*      lineHeight: '20px',*/}
          {/*      fontWeight: 'bold',*/}
          {/*      width: '50%',*/}
          {/*      margin: '0px 4px 1px 4px',*/}
          {/*    } as Styles*/}
          {/*  }*/}
          {/*  onPress={() => alert('2')}*/}
          {/*>*/}
          {/*  Next*/}
          {/*</Button>*/}
          <SubmitButton
            styles={[
              {
                background: `${theme.colors.tescoBlue}`,
                fontSize: '16px',
                lineHeight: '20px',
                fontWeight: 'bold',
                width: '50%',
                margin: '0px 4px 1px 4px',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
