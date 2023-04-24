import React, { FC, Fragment } from 'react';
import { Button, CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { useParams } from 'react-router-dom';
import { FieldValues, UseFormTrigger } from 'react-hook-form';

import { IconButton, Position } from 'components/IconButton';
import { Trans } from 'components/Translation';
import { Line } from 'components/Line';
import { Icon } from 'components/Icon';
import { Settings, usePerformanceStepperContext } from '../../context';
import { FormType } from '../../constants/type';
import { Status } from 'config/enum';

export const HEADER_WRAPPER = 'header-wrapper';
export const FIRST_STEP = 'first-step';
export const LAST_STEP = 'last-step';

type Props = {
  data: Array<Settings>;
  isGeneralValid: boolean;
  onSubmit: () => void;
  onDraft: () => void;
  canEdit: boolean;
  isValidForm: boolean;
  status: Status;
  trigger: UseFormTrigger<FieldValues>;
};

const Header: FC<Props> = ({ trigger, data, isGeneralValid, onSubmit, canEdit, isValidForm, onDraft, status }) => {
  const { handleNext, activeStepper } = usePerformanceStepperContext();
  const { performanceCycleUuid } = useParams<{ performanceCycleUuid: string }>();
  const { css } = useStyle();

  const isGeneral = activeStepper === FormType.GENERAL;

  const pendingIcon = (i) => {
    const isDone = isValidForm;
    return (
      <div className={css(actions)}>
        <IconButton
          graphic={'emptyCircle'}
          iconStyles={{ width: '47px', height: '47px' }}
          iconProps={{ color: isDone ? 'tescoBlue' : 'base' }}
        >
          <span className={css(count({ isDone }))}>{i + 1}</span>
        </IconButton>
      </div>
    );
  };
  const doneIcon = <Icon graphic={'roundTick'} key='icon' size={'40px'} color={'tescoBlue'} />;

  return (
    <div className={css(layer)} data-test-id={HEADER_WRAPPER}>
      <div className={css(header)}>
        <div className={css(detailsWrapper)}>
          {data.map(({ text }, index) => {
            return (
              <Fragment key={index}>
                {isGeneralValid && !index ? doneIcon : isValidForm && index ? doneIcon : pendingIcon(index)}
                <p key={text} className={css(headerTitle)}>
                  {text}
                </p>
                {!index && <Line styles={lineStyles} />}
              </Fragment>
            );
          })}
        </div>

        <div className={css(actions)}>
          {performanceCycleUuid !== 'new' && (
            <IconButton
              graphic={'emptyCircle'}
              iconStyles={{ width: '47px', height: '47px' }}
              isDisabled={!isValidForm || !canEdit}
            >
              <div className={css({ position: 'absolute' })}>
                <Icon data-test-id={'dots'} key='icon' graphic={'dots'} size={'24px'} />
              </div>
            </IconButton>
          )}

          {(!status || status === Status.DRAFT) && (
            <Button onPress={onDraft} styles={[buttonWhiteStyle]} isDisabled={!canEdit}>
              <Trans i18nKey='save_as_draft'>Save as draft</Trans>
            </Button>
          )}
          {canEdit && (
            <IconButton
              onPress={() => {
                const next = () => {
                  handleNext();
                  trigger();
                };
                isGeneral ? next() : onSubmit();
              }}
              graphic='arrowRight'
              data-test-id={LAST_STEP}
              customVariantRules={{
                default: submitButtonStyle({ isValid: isGeneral ? isGeneralValid : isValidForm }),
                disabled: submitButtonStyle({ isValid: isGeneral ? isGeneralValid : isValidForm }),
              }}
              iconStyles={iconStyledRule}
              iconPosition={Position.RIGHT}
              isDisabled={false}
            >
              <Trans i18nKey={isGeneral ? 'next' : 'publish'} />
            </IconButton>
          )}
          {!canEdit && (
            <IconButton
              data-test-id={FIRST_STEP}
              onPress={() => {
                handleNext();
                trigger();
              }}
              graphic='arrowRight'
              customVariantRules={{
                default: submitButtonStyle({ isValid: isGeneral }),
                disabled: submitButtonStyle({ isValid: isGeneral }),
              }}
              iconStyles={iconStyledRule}
              iconPosition={Position.RIGHT}
              isDisabled={false}
            >
              <Trans i18nKey={isGeneral ? 'next' : 'publish'} />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

const actions: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  position: 'relative',
};
const lineStyles: Rule = ({ theme }) => ({
  margin: '0px 24px',
  background: theme.colors.base,
  width: '64px',
});
const count: CreateRule<{ isDone }> =
  ({ isDone }) =>
  ({ theme }) => ({
    position: 'absolute',
    ...theme.font.fixed.f14,
    color: isDone ? theme.colors.tescoBlue : theme.colors.base,
  });

const header: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 47px',
  height: 'inherit',
};
const detailsWrapper: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};
const layer: Rule = ({ theme }) => ({
  background: theme.colors.white,
  width: 'calc(100% + 32px)',
  marginLeft: '-16px',
  height: '72px',
});
const headerTitle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f14,
  margin: '0px 0px 0px 4px',
  color: theme.colors.base,
});

const buttonWhiteStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  fontWeight: theme.font.weight.bold,
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

const submitButtonStyle: CreateRule<{ isValid: any }> =
  ({ isValid }) =>
  ({ theme }) => ({
    height: '40px',
    ...theme.font.fixed.f16,
    fontWeight: theme.font.weight.bold,
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: `${theme.colors.tescoBlue}`,
    color: `${theme.colors.white}`,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 20px',
    borderRadius: `${theme.spacing.s20}`,
    opacity: isValid ? '1' : '0.4',
    pointerEvents: isValid ? 'all' : 'none',
  });

const iconStyledRule: Rule = ({ theme }) =>
  ({
    '& > path': {
      fill: theme.colors.white,
    },
  } as Styles);
