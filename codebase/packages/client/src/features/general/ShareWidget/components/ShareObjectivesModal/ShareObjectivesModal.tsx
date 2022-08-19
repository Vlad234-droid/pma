import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { useStyle, Rule, CreateRule } from '@pma/dex-wrapper';
import { Icon as IconComponent } from 'components/Icon';
import Accordion, { ObjectiveAccordionProps } from 'features/general/Objectives/components/Accordion';

export type Props = {
  manager: string;
  objectives?: ObjectiveAccordionProps['objectives'];
  onClose?: () => void;
  description: string;
};

export const ShareObjectivesModal: FC<Props> = ({ manager, onClose, objectives = [], description }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  return (
    <div className={css(containerStyle)}>
      <div className={css(wrapperStyle({ mobileScreen }))}>
        <span className={css(arrowStyle({ mobileScreen }))} onClick={() => onClose && onClose()}>
          <IconComponent graphic='arrowLeft' invertColors={true} />
        </span>
        <div>
          <div className={css(titleStyle({ mobileScreen }))}>{description}</div>
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

const titleStyle: CreateRule<{ mobileScreen: boolean }> =
  ({ mobileScreen }) =>
  ({ theme }) => ({
    fontSize: theme.font.fixed.f24.fontSize,
    lineHeight: theme.font.fluid.f24.lineHeight,
    letterSpacing: '0px',
    fontWeight: theme.font.weight.bold,
    padding: '10px',
    color: mobileScreen ? theme.colors.tescoBlue : theme.colors.base,
  });

const managerNameStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f20.fontSize,
  lineHeight: theme.font.fluid.f20.lineHeight,
  padding: '10px',
  color: theme.colors.tescoBlue,
});

const arrowStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  position: 'fixed',
  top: '22px',
  left: mobileScreen ? '20px' : '40px',
  textDecoration: 'none',
  border: 'none',
  cursor: 'pointer',
});

export default ShareObjectivesModal;
