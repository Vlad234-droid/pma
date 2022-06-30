import React, { FC, useState, memo } from 'react';
import { Button, Rule, useStyle } from '@pma/dex-wrapper';
import { IconButton } from 'components/IconButton';
import { ModalComponent } from 'features/general/ObjectivesForm/components/ModalComponent';
import { useTranslation } from 'components/Translation';
import { ObjectivesForm } from 'features/bank/ObjectivesForm';
import { ReviewType } from 'config/enum';
import { useSelector } from 'react-redux';
import { filterReviewsByTypeSelector, getReviewSchema } from '@pma/store';
import { Objective } from '../../type';

export type CreateModalProps = {
  withIcon?: boolean;
};

type Props = CreateModalProps;

const CreateButton: FC<Props> = memo(({ withIcon = false }) => {
  const { t } = useTranslation();
  const { css } = useStyle();

  const [isOpen, setIsOpen] = useState(false);

  const objectives: Objective[] = useSelector(filterReviewsByTypeSelector(ReviewType.OBJECTIVE)) || [];
  const schema = useSelector(getReviewSchema(ReviewType.OBJECTIVE));
  const { markup = { max: 0, min: 0 } } = schema;
  const isAvailable = objectives.length < markup.max || false;

  const handleClick = () => setIsOpen(true);

  return (
    <>
      {isAvailable && (
        <div className={css({ display: 'flex', marginBottom: '20px' })}>
          {withIcon ? (
            <IconButton
              customVariantRules={{ default: iconBtnStyle }}
              onPress={handleClick}
              graphic='add'
              iconProps={{ invertColors: true }}
              iconStyles={iconStyle}
            >
              {t('create_priorities', 'Create priorities')}
            </IconButton>
          ) : (
            <Button styles={[buttonStyle]} onPress={handleClick}>
              {t('create_priorities', 'Create priorities')}
            </Button>
          )}
        </div>
      )}
      {isOpen && (
        <ModalComponent onClose={() => setIsOpen(false)} title={t('create_priorities', 'Create priorities')}>
          <ObjectivesForm onClose={() => setIsOpen(false)} />
        </ModalComponent>
      )}
    </>
  );
});

const iconBtnStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  padding: '0 16px',
  display: 'flex',
  height: '40px',
  paddingLeft: '12px',
  paddingRight: '12px',
  borderRadius: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  cursor: 'pointer',
});

const iconStyle: Rule = {
  marginRight: '10px',
};

const buttonStyle: Rule = ({ theme }) => ({
  border: `${theme.border.width.b2} solid ${theme.colors.white}`,
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
});

export default CreateButton;
