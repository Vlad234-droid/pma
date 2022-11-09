import React, { FC } from 'react';
import { useStyle, Rule, Styles } from '@pma/dex-wrapper';
import { IconButton } from 'components/IconButton';
import { useTranslation } from 'components/Translation';

export const APPLIED_WRAPPER = 'applied-wrapper';
export const CLEAR_ITEM = 'clear-item';

type Props = {
  onClose: (item: string) => void;
  items: Array<string>;
};

const ViewItems: FC<Props> = ({ onClose, items = [] }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <div className={css({ marginBottom: '10px' })} data-test-id={APPLIED_WRAPPER}>
      <div className={css(appliedWrapper)}>
        <span>{t('filters_applied', 'Filters applied')}:</span>
        <div className={css(flexStyle)}>
          {items.map((item) => (
            <div key={item} className={css(appliedItems)}>
              <span className={css(filteredTitle)}>{item}</span>
              <IconButton
                data-test-id={CLEAR_ITEM}
                graphic='cancel'
                iconStyles={iconDeclineStyle}
                onPress={() => onClose(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const appliedWrapper: Rule = ({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      fontWeight: 'normal',
      fontSize: '18px',
      lineHeight: '22px',
      color: theme.colors.base,
    },
  } as Styles;
};

const appliedItems: Rule = ({ theme }) => {
  return {
    border: `2px solid ${theme.colors.link}`,
    borderRadius: '10px',
    padding: '6px 12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

const iconDeclineStyle: Rule = {
  width: '15px',
  height: '15px',
  marginLeft: '10px',
  cursor: 'pointer',
};

const flexStyle: Rule = {
  display: 'flex',
  gap: '10px',
  marginLeft: '12px',
};

const filteredTitle: Rule = ({ theme }) => {
  return {
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.colors.base,
  };
};

export default ViewItems;
