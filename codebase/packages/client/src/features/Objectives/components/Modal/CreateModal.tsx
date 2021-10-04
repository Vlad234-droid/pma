import React, { FC, HTMLProps } from 'react';
import { Trans, useTranslation } from 'components/Translation';

import { Icon, Button, useStyle, useBreakpoints } from '@dex-ddl/core';

// todo use Generic form in future. For now just not use it because of more flexibility
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Icon as IconComponent } from 'components/Icon';
import { StepIndicatorBasic } from 'components/StepIndicator/StepIndicator';
import { Input, Textarea, Item } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';

import { SubmitButton } from './index';
import { createObjectivesSchema } from './config';

export type CreateModalProps = {};

type Props = HTMLProps<HTMLInputElement> & CreateModalProps;

export const CreateModal: FC<Props> = () => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createObjectivesSchema),
  });
  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;
  const onSubmit = async (data) => {
    console.log('data', data);
    reset();
  };

  return (
    <div
      className={css({
        height: '100%',
        bottom: '80px',
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
              titles={[
                t('set_objectives', 'Set objectives'),
                t('mid_year_review', 'Mid-year review'),
                t('end_year_review', 'End year review'),
              ]}
            />
          </div>
          <GenericItemField
            name='objectiveTitle'
            methods={methods}
            label={t('objective_title', 'Objective title')}
            Wrapper={Item}
            Element={Input}
            placeholder={t('objective_title_placeholder', 'Example: Build additional backlinks for Our Tesco.')}
          />
          <GenericItemField
            name='objectiveDescription'
            methods={methods}
            label={t('description', 'Description')}
            Wrapper={Item}
            Element={Textarea}
            placeholder={t(
              'description_placeholder',
              'Build 40 additional backlinks for Our Tesco by June. To do so I will connect with Ellie and Andrew from PR to develop an effective outreach strategy.',
            )}
          />
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
          <GenericItemField
            name='meetObjective'
            methods={methods}
            label='How will you MEET this objective?'
            Wrapper={Item}
            Element={(props) => (
              <Textarea
                {...props}
                rows={4}
                placeholder='Example:
            1) Develop 60 additional backlinks for Our Tesco
            2) Develop outreach strategy and action first step of the strategy successfully'
              />
            )}
          />
          <GenericItemField
            name='exceedObjective'
            methods={methods}
            label='How will you EXCEED this objective?'
            Wrapper={Item}
            Element={(props) => (
              <Textarea
                {...props}
                rows={4}
                placeholder='Example:
1) Develop 60 additional backlinks for Our Tesco
2) Develop outreach strategy and action first step of the strategy successfully'
              />
            )}
          />
          <div
            className={css({
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
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
                  padding: mobileScreen ? theme.spacing.s7 : theme.spacing.s9,
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
                  <Trans i18nKey='save_as_draft'>Save as draft</Trans>
                </Button>
                <SubmitButton
                  isDisabled={!isValid}
                  onSave={handleSubmit(onSubmit)}
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
        </form>
      </div>
    </div>
  );
};
