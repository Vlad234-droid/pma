import React, { FC, useCallback, useState, CSSProperties } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { Select } from 'components/Form';

export const InputWithDropdown: FC<{
  onChange?: () => void;
  children;
  visible?: boolean;
  dropDownStyles?: Rule | Styles | CSSProperties | {};
  options: Array<Record<'value' | 'label', string>>;
}> = ({ onChange, children, visible = true, options, dropDownStyles = {} }) => {
  const { css } = useStyle();
  const [active, setActive] = useState(options[0]?.value);

  const onHandleChange = useCallback(
    (value) => {
      setActive(value);
      if (onChange) onChange();
    },
    [active],
  );

  const renderProps = {
    ...(visible && { active }),
  };

  return (
    <div className={css(containerStyles({ visible, active }))}>
      {children(renderProps)}
      {visible && (
        <Select
          options={options}
          placeholder={'placeholder'}
          name={'options'}
          //@ts-ignore
          onChange={({ target: { value } }) => {
            onHandleChange(value);
          }}
          value={active}
          customStyles={dropDownStyles}
          wrapperStyles={wrapperStyles}
        />
      )}
    </div>
  );
};

const wrapperStyles: Rule = {
  position: 'relative',
  top: '0px',
  right: '0px',
  maxWidth: '180px',
  '& > button': {
    borderLeft: 'none !important',
  },
} as Styles;

const containerStyles: CreateRule<{ visible: boolean; active: string }> = ({ visible, active }) => ({
  display: visible ? 'flex' : 'block',
  marginTop: active ? '16px' : '32px',
  position: 'relative',
});
