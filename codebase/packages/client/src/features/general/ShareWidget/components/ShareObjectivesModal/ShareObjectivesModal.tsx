import React, { FC } from 'react';
import { Trans } from 'components/Translation';
import { useStyle, Rule, CreateRule } from '@pma/dex-wrapper';
import { Icon as IconComponent } from 'components/Icon';
import ObjectivesList, {
  ObjectivesListProps,
} from 'features/general/Objectives/components/ObjectivesList/ObjectivesList';
import { useSelector } from 'react-redux';
import { getAllSharedObjectives, getReviewSchema } from '@pma/store';
import { ReviewType } from 'config/enum';
import { useTenant } from 'features/general/Permission';
import { transformReviewsToObjectives } from 'features/general/Review';
import { Review } from 'config/types';

export type Props = {
  manager: string;
  onClose?: () => void;
  description: string;
};

export const ShareObjectivesModal: FC<Props> = ({ manager, onClose, description }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;

  const tenant = useTenant();
  const { components = [] } = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const sharedObjectives: Review[] = useSelector(getAllSharedObjectives);
  const formElements = components.filter((component) => component.type != 'text');
  const objectives: ObjectivesListProps['objectives'] = transformReviewsToObjectives(
    sharedObjectives,
    formElements,
    tenant,
  );

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
        <div>{objectives.length && <ObjectivesList objectives={objectives} />}</div>
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
