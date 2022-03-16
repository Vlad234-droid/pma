import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { useBreakpoints, useStyle, Rule, CreateRule } from '@dex-ddl/core';
import { Icon as IconComponent } from 'components/Icon';
import { default as Accordion, ObjectiveAccordionProps } from '../Accordion';

export type Props = {
  manager: string;
  objectives?: ObjectiveAccordionProps['objectives'];
  onClose?: () => void;
};

export const ShareObjectivesModal: FC<Props> = ({ manager, onClose, objectives = [] }) => {
  const { css } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  const count = objectives.length;

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle({ mobileScreen }))}>
        <span className={css(arrowStyle)} onClick={() => onClose && onClose()}>
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <div>
          <div className={css(titleStyle)}>
            <Trans i18nKey='you_have_shared_objectives' count={count}>
              You have {{ count }} shared objectives
            </Trans>
          </div>
        </div>
        <div>
          <div className={css(managerNameStyle)}>
            <Trans i18nKey='from_person' values={{ person: manager }} defaults='From {{ person }}' />
          </div>
        </div>
        <div>
          <Accordion objectives={objectives} canShowStatus={false} isButtonsVisible={false} />
        </div>
      </div>
    </div>
  );
};

const containerStyle: Rule = {
  height: '100%',
};

const wrapperStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  height: '100%',
  overflow: 'auto',
  padding: mobileScreen ? '0 16px' : '0 40px',
});

const titleStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  return {
    fontSize: '24px',
    lineHeight: '28px',
    padding: '10px',
    fontWeight: 'bold',
    color: mobileScreen ? theme.colors.tescoBlue : theme.colors.base,
  };
};

const managerNameStyle: Rule = ({ theme }) => ({
  fontSize: '20px',
  lineHeight: '24px',
  padding: '10px',
  color: theme.colors.tescoBlue,
});

const arrowStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;

  return {
    position: 'fixed',
    top: '22px',
    left: mobileScreen ? '20px' : '40px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

export default ShareObjectivesModal;
