import React, { FC, useCallback, useState } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Radio } from 'components/Form';
import { initialState } from './utils';

export const Checker: FC<{
  onChange?: () => void;
  children;
  visible: boolean;
  options: Array<Record<'name' | 'text', string>>;
}> = ({ onChange, children, visible = true, options }) => {
  const { css } = useStyle();
  const [active, setActive] = useState(initialState);

  const onHandleChange = useCallback(
    ({ target: { id } }) => {
      setActive(id);
      if (onChange) onChange();
    },
    [active],
  );

  const renderProps = {
    ...(visible && { active }),
  };

  return (
    <>
      {visible &&
        options.map((item, i) => (
          <label key={i} htmlFor={item.name} className={css(flexStyle)}>
            <Radio name={item.name} checked={active === item.name} id={item.name} onChange={onHandleChange} />
            <span className={css(titleStyle)}>{item.text}</span>
          </label>
        ))}
      {children(renderProps)}
    </>
  );
};

const flexStyle: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  marginTop: '16px',
};

const titleStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  letterSpacing: '0px',
  padding: '0px 10px',
});
