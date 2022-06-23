import React from 'react';
import { Status } from 'config/enum';
import { Rule, Theme, useStyle } from '@pma/dex-wrapper';
import { TFunction, Trans, useTranslation } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
import { Graphics, Icon } from 'components/Icon';

const getContent = (theme: Theme, t: TFunction, status: Status): [Graphics, string] => {
  switch (status) {
    case Status.APPROVED:
      return ['roundTick', t('approved', 'Approved')];
    case Status.WAITING_FOR_APPROVAL:
      return ['roundClock', t('waiting_for_approval', 'Waiting for approval')];
    case Status.DECLINED:
      return ['roundAlert', t('declined', 'Declined')];
    case Status.DRAFT:
    default:
      return ['roundPencil', t('draft', 'Draft')];
  }
};

export const Button = () => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const [graphic, label] = getContent(theme, t, Status.WAITING_FOR_APPROVAL);

  return (
    <div className={css(buttonStyles)}>
      <div className={css({ display: 'flex' })}>
        <span>
          <Icon graphic={graphic} invertColors iconStyles={iconLeftStyles} title={label} size={'30px'} />
        </span>
        <span>status text</span>
      </div>
      <div>
        <IconButton
          onPress={console.log}
          graphic='download'
          customVariantRules={{ default: iconButtonStyles }}
          iconStyles={{ ...iconStyles, transform: 'rotate(180deg)' }}
          iconPosition={Position.RIGHT}
        >
          <Trans i18nKey='upload'>Upload</Trans>
        </IconButton>
        <IconButton
          onPress={console.log}
          graphic='trash'
          customVariantRules={{ default: iconButtonStyles }}
          iconStyles={iconStyles}
          iconPosition={Position.RIGHT}
        >
          <Trans i18nKey='delete'>Delete</Trans>
        </IconButton>
        <IconButton
          onPress={console.log}
          graphic='edit'
          customVariantRules={{ default: iconButtonStyles }}
          iconStyles={iconStyles}
          iconPosition={Position.RIGHT}
        >
          <Trans i18nKey='edit'>Edit</Trans>
        </IconButton>
      </div>
    </div>
  );
};

const buttonStyles: Rule = {
  flexWrap: 'wrap',
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
};

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: '10px 10px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
});

const iconLeftStyles: Rule = { marginRight: '10px' };
const iconStyles: Rule = { marginLeft: '10px' };
